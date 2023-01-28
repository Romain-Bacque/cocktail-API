-- Deploy cocktail:1.functions to pg

BEGIN;

-- cocktail

CREATE FUNCTION get_cocktails_details() RETURNS SETOF packed AS $$

    SELECT "cocktail_details"."id", "cocktail_details"."name", array_agg(
		json_build_object(
				'ingredient', ingredient,
                'quantity', quantity
            )) AS "details"
	FROM "cocktail_details"
	GROUP BY "cocktail_details"."id", "cocktail_details"."name";
		
$$ LANGUAGE SQL;


CREATE FUNCTION get_cocktail_details(INT) RETURNS SETOF packed AS $$

    SELECT "cocktail_details"."id", "cocktail_details"."name", array_agg(
            json_build_object(
                    'ingredient', ingredient,
                    'quantity', quantity
                )) AS "details"
        FROM "cocktail_details"
        WHERE "cocktail_details"."id" = $1
        GROUP BY "cocktail_details"."id", "cocktail_details"."name";
		
$$ LANGUAGE SQL STRICT;


CREATE OR REPLACE FUNCTION insert_cocktail(json) RETURNS SETOF packed AS $$

DECLARE id_cocktail INT;

BEGIN

    INSERT INTO "cocktail" ("name") VALUES ( $1 ->> 'name'::text ) 
    RETURNING ("cocktail"."id") into id_cocktail;

    INSERT INTO "cocktail_has_ingredient" ("cocktail_id", "ingredient_id", "quantity")
        SELECT id_cocktail, recipe.ingredient_id, recipe.quantity
            FROM (
                SELECT * FROM json_to_recordset( ( $1 ->> 'details' )::json ) as recipe("ingredient_id" INT, "quantity" INT)
            ) as recipe;

    RETURN QUERY
    SELECT * FROM get_cocktails_details();    
END;

$$ LANGUAGE PLPGSQL STRICT;


CREATE OR REPLACE FUNCTION update_cocktail(json) RETURNS SETOF packed AS $$

DECLARE cocktailId INT;

BEGIN

    SELECT "id" FROM "cocktail" WHERE "id" = ($1 ->> 'id')::int INTO cocktailId;

    IF cocktailId IS NULL THEN
        RETURN;
    ELSE
        UPDATE "cocktail" SET "name" = ($1 ->> 'name')::text WHERE "id" = cocktailId;

        DELETE FROM "cocktail_has_ingredient"
        WHERE "cocktail_has_ingredient"."cocktail_id" = cocktailId;

        INSERT INTO "cocktail_has_ingredient" ("cocktail_id", "ingredient_id", "quantity")
        SELECT cocktailId, recipe.ingredient_id, recipe.quantity
        FROM (
            SELECT * FROM json_to_recordset( ( $1 ->> 'details' )::json ) as recipe("ingredient_id" INT, "quantity" INT)
        ) as recipe;

        RETURN QUERY
        SELECT * FROM get_cocktails_details();
    END IF;

END;

$$ LANGUAGE PLPGSQL STRICT;


-- ingredient

CREATE FUNCTION get_ingredients_details () RETURNS SETOF packed2 AS $$

SELECT i.id, name, title FROM ingredient i
JOIN unit u
ON i.unit_id = u.id

$$ LANGUAGE SQL;


CREATE FUNCTION get_ingredient_details (INT) RETURNS SETOF packed2 AS $$

SELECT i.id, name, title FROM ingredient i
JOIN unit u
ON i.unit_id = u.id
WHERE i.id = $1;

$$ LANGUAGE SQL;


CREATE FUNCTION insert_ingredient (JSON) RETURNS SETOF packed2 AS $$

DECLARE id_unit INT;

BEGIN

INSERT INTO "ingredient" ("name", "unit_id")
SELECT i.name, (
SELECT u."id" as "unit_id"
FROM "unit" u
WHERE u."title" = i."unit"
)
FROM json_to_record($1) AS i(name TEXT, unit TEXT)
RETURNING "unit_id" into id_unit;

RETURN QUERY
SELECT * FROM get_ingredient_details(id_unit);

END;

$$ LANGUAGE PLPGSQL STRICT;

COMMIT;
