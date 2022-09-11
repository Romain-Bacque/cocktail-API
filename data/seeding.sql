BEGIN;

TRUNCATE TABLE "cocktail", "ingredient", "cocktail_has_ingredient", "unit" RESTART IDENTITY CASCADE;

INSERT INTO "unit" ("title") VALUES 
    ('u'),
    ('ts'),
    ('cl')
;

INSERT INTO "cocktail" ("name") VALUES 
    ('mojito'),
    ('caipirinha')
;

INSERT INTO "ingredient" ("name", "unit_id") VALUES 
    ('mint', 1),
    ('lemon', 1),
    ('sparkling water', 3), 
    ('ice', 1),
    ('caipirinha', 3),
    ('sugar', 2),
    ('cachaça', 3),
    ('rhum', 3),
    ('tequila', 3)
;

INSERT INTO "cocktail_has_ingredient" ("cocktail_id", "ingredient_id", "quantity") VALUES (
    1,
    1,
    10
),
(
    1,
    2,
    1
),
(
    1,
    3,
    2
),
(
    1,
    4,
    2
),
(
    1,
    4,
    0.5
),
(
    2,
    2,
    0.5
),
(
    2,
    5,
    2
),
(
    2,
    6,
    2
);

COMMIT;