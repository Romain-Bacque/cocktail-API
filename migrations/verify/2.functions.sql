-- Verify cocktail:1.functions on pg

BEGIN;

SELECT "id", "name", "details" FROM get_cocktails_details();

SELECT "id", "name", "details" FROM get_cocktail_details(1);

SELECT "id", "name", "details" from insert_cocktail('{
    "name": "test1",
    "details": [
        {
            "ingredient_id": "1",
            "quantity": "2"
        }
    ]
}');

SELECT "id", "name", "details" from update_cocktail('{
    "id": "1",
    "name": "test2",
    "details": [
        {
            "ingredient_id": "1",
            "quantity": "2"
        }
    ]
}');

SELECT "id", "name", "unit" FROM get_ingredients_details();

SELECT "id", "name", "unit" FROM insert_ingredient('{"name": "test3", "unitId": "1"}');

ROLLBACK;
