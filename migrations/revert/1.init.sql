-- Revert cocktail:1.init from pg

BEGIN;

DROP TABLE IF EXISTS "cocktail", "ingredient", "cocktail_has_ingredient", "unit" CASCADE;

DROP TYPE packed;
DROP TYPE packed2;

COMMIT;
