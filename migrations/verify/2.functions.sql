-- Verify cocktail:1.functions on pg

BEGIN;

SELECT "id", "name", "details" FROM get_cocktails_details();

SELECT "id", "name", "details" FROM get_cocktail_details(1);

SELECT "cocktail_id", "ingredient_id", "created_at", "updated_at" from insert_cocktail('{
    "name": "test1",
    "details": [
        {
            "ingredient_id": "1",
            "quantity": "2"
        }
    ]
}');

SELECT "cocktail_id", "ingredient_id", "created_at", "updated_at" from update_cocktail('{
    "id": "1",
    "name": "test2",
    "details": [
        {
            "ingredient_id": "1",
            "quantity": "2"
        }
    ]
}');

SELECT "name", "unit" FROM get_ingredients_details();

SELECT "name", "unit" FROM insert_ingredient('{"name": "test3", "unit": "u"}');

ROLLBACK;
