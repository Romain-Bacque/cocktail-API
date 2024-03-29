## table cocktail

| Champ      | Type        | Spécificités                             | Description                                                   |
| ---------- | ----------- | ---------------------------------------- | ------------------------------------------------------------- |
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'un cocktail                              |
| name       | TEXT        | NOT NULL UNIQUE                          | nom du cocktail                                               |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW                     | date de création d'un enregistrement de la table              |
| updated_at | TIMESTAMPTZ |                                          | date de dernière modification d'un enregistrement de la table |

## table ingredient

| Champ      | Type        | Spécificités                             | Description                                                   |
| ---------- | ----------- | ---------------------------------------- | ------------------------------------------------------------- |
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'un ingrédient                            |
| name       | TEXT        | NOT NULL UNIQUE                          | nom de l'ingrédient                                           |
| unit_id    | INT         | FOREIGN KEY                              | identifiant de l'unité d'un ingrédient                        |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW                     | date de création d'un enregistrement de la table              |
| updated_at | TIMESTAMPTZ |                                          | date de dernière modification d'un enregistrement de la table |

## table cocktail_has_ingredient

| Champ         | Type        | Spécificités         | Description                                                   |
| ------------- | ----------- | -------------------- | ------------------------------------------------------------- |
| cocktail_id   | INT         | FOREIGN KEY          | identifiant unique d'un cocktail                              |
| ingredient_id | INT         | FOREIGN KEY          | identifiant unique d'un ingrédient                            |
| quantity      | NUMERIC     | NOT NULL DEFAULT(0)  | quantité d'ingrédient pour un cocktail                        |
| created_at    | TIMESTAMPTZ | NOT NULL DEFAULT NOW | date de création d'un enregistrement de la table              |
| updated_at    | TIMESTAMPTZ |                      | date de dernière modification d'un enregistrement de la table |

## table unit

| Champ      | Type        | Spécificités                             | Description                                                    |
| ---------- | ----------- | ---------------------------------------- | -------------------------------------------------------------- |
| id         | INT         | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant unique d'une unité                                 |
| title      | TEXT        | NOT NULL UNIQUE                          | titre d'une unité                                              |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW                     | date de création d'une enregistrement de la table              |
| updated_at | TIMESTAMPTZ |                                          | date de dernière modification d'une enregistrement de la table |
