-- Revert cocktail:1.functions from pg

BEGIN;

DROP FUNCTION IF EXISTS get_cocktails_details();
DROP FUNCTION IF EXISTS get_cocktail_details(INT);
DROP FUNCTION IF EXISTS insert_cocktail(JSON);
DROP FUNCTION IF EXISTS update_cocktail(JSON);
DROP FUNCTION IF EXISTS get_ingredients_details();
DROP FUNCTION IF EXISTS get_ingredient_details(INT);
DROP FUNCTION IF EXISTS insert_ingredient(JSON);

COMMIT;
