-- Verify cocktail:1.init on pg

BEGIN;

SELECT "id", "name", "created_at", "updated_at" FROM public."cocktail";
SELECT "id", "name", "unit_id", "created_at", "updated_at" FROM public."ingredient";
SELECT "cocktail_id", "ingredient_id", "created_at", "updated_at" FROM public."cocktail_has_ingredient";
SELECT "id", "title", "created_at", "updated_at" FROM public."unit";

ROLLBACK;
