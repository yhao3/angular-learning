# 06. Adding Ingredients to Recipes

現在每個食譜都有一些食材，因此本小節將會實作出在食譜中顯示食材的功能。

## Update Recipe Model

- [`recipe.model.ts`](../../course-project-1/src/app/recipes/recipe.model.ts)

```typescript
import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  ...
  public ingredients: Ingredient[];

  constructor(..., ingredients: Ingredient[]){
    ...
    this.ingredients = ingredients;
  }
}
```

## Update Recipe Service

- [`recipe.service.ts`](../../course-project-1/src/app/recipes/recipe.service.ts)

```typescript
...
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Cheeseburger.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];
  ...
}
```

## Update Recipe Detail Template

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```html
  ...
  <div class="col-xs-12">
    <!-- Ingredients -->
    <ul class="list-group">
      <li
        class="list-group-item"
        *ngFor="let ingredient of recipe.ingredients">
        {{ ingredient.name }} - {{ ingredient.amount }}
      </li>
    </ul>
  </div>
  ...
```