BEGIN;

DROP TABLE IF EXISTS "cocktail", "ingredient", "cocktail_has_ingredient", "unit";

CREATE TABLE IF NOT EXISTS "cocktail" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "ingredient" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "unit_id" INT,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "cocktail_has_ingredient" (
    "cocktail_id" INT REFERENCES "cocktail"("id") ON DELETE CASCADE,
    "ingredient_id" INT REFERENCES "ingredient"("id") ON DELETE CASCADE,
    "quantity" NUMERIC NOT NULL DEFAULT(0),
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "unit" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

ALTER TABLE IF EXISTS "ingredient"
    ADD FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE;


-- custom type
CREATE TYPE packed AS (
    id INT,
    name TEXT,
    details json[]
);

CREATE TYPE packed2 AS (
    id INT,
	name TEXT,
	unit TEXT
);	

-- view
CREATE VIEW cocktail_details AS (
    SELECT cocktail.id,
        cocktail.name AS name,
        ingredient.name AS ingredient,
        cocktail_has_ingredient.quantity || unit.title AS quantity
        FROM cocktail
            JOIN cocktail_has_ingredient ON cocktail_has_ingredient.cocktail_id = cocktail.id
            JOIN ingredient ON cocktail_has_ingredient.ingredient_id = ingredient.id
            JOIN unit ON ingredient.unit_id = unit.id
);

END;
