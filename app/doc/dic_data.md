## table cocktail

| Champ | Type | Spécificités                             | Description                      |
|-------|------|------------------------------------------|----------------------------------|
| id    | INT  | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'un cocktail |
| name  | TEXT | NOT NULL UNIQUE                          | nom du cocktail                  |

## table ingredient

| Champ   | Type | Spécificités                             | Description                          |
|---------|------|------------------------------------------|--------------------------------------|
| id      | INT  | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'un ingredient     |
| name    | TEXT | NOT NULL UNIQUE                          | nom du cocktail                      |
| unit_id | INT  | FOREIGN KEY                              | identifiant de l'unité d'un cocktail |

## table cocktail_has_ingredient

| Champ         | Type    | Spécificités        | Description                            |
|---------------|---------|---------------------|----------------------------------------|
| cocktail_id   | INT     | FOREIGN             | identifiant unique d'un cocktail       |
| ingredient_id | INT     | FOREIGN             | identifiant unique d'un ingrédient     |
| quantity      | NUMERIC | NOT NULL DEFAULT(0) | quantité d'ingrédient pour un cocktail |

## table unit

| Champ | Type | Spécificités                             | Description                    |
|-------|------|------------------------------------------|--------------------------------|
| id    | INT  | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'une unité |
| title | TEXT | NOT NULL UNIQUE                          | titre d'une unité              |