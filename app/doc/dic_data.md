## table cocktail

| Champ      | Type        | Spécificités                             | Description                                 |
| ---------- | ----------- | ---------------------------------------- | ------------------------------------------- |
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'un cocktail            |
| name       | TEXT        | NOT NULL UNIQUE                          | nom du cocktail                             |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW                     | date de creation d'un cocktail              |
| updated_at | TIMESTAMPTZ |                                          | date de dernière modification d'un cocktail |

## table ingredient

| Champ      | Type        | Spécificités                             | Description                                   |
| ---------- | ----------- | ---------------------------------------- | --------------------------------------------- |
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'un ingredient            |
| name       | TEXT        | NOT NULL UNIQUE                          | nom de l'ingredient                           |
| unit_id    | INT         | FOREIGN KEY                              | identifiant de l'unité d'un ingredient        |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW                     | date de creation d'un ingredient              |
| updated_at | TIMESTAMPTZ |                                          | date de dernière modification d'un ingredient |

## table cocktail_has_ingredient

| Champ         | Type    | Spécificités        | Description                            |
| ------------- | ------- | ------------------- | -------------------------------------- |
| cocktail_id   | INT     | FOREIGN             | identifiant unique d'un cocktail       |
| ingredient_id | INT     | FOREIGN             | identifiant unique d'un ingrédient     |
| quantity      | NUMERIC | NOT NULL DEFAULT(0) | quantité d'ingrédient pour un cocktail |

## table unit

| Champ      | Type        | Spécificités                             | Description                             |
| ---------- | ----------- | ---------------------------------------- | --------------------------------------- |
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'une unité          |
| title      | TEXT        | NOT NULL UNIQUE                          | titre d'une unité                       |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW                     | date de creation d'un unit              |
| updated_at | TIMESTAMPTZ |                                          | date de dernière modification d'un unit |
