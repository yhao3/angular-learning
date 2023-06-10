# 02. Managing Recipes in a Recipe Service

## Move Recipes Array to Recipe Service

- [`recipe-list.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```typescript
...
export class RecipeListComponent {

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

//  recipes: Recipe[] = [
//    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wi  edia/commons/1/15/Recipe_logo.jpeg'),
//    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wi  edia/commons/1/15/Recipe_logo.jpeg')
//  ];
  recipes: Recipe[];
  ...
}
```

- [`recipe.service.ts`](../../course-project-1/src/app/recipes/recipe.service.ts)

```typescript
import { Recipe } from './recipe.model';

export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  getRecipes() {
    // slice() returns a copy of the array
    return this.recipes.slice();
  }
}
```

1. Move `recipes` array from `recipe-list.component.ts` to `recipe.service.ts`
2. Make `recipes` array private
3. Create `getRecipes()` method to return a "copy" of `recipes` array (using `slice()` method)

## Provide the Recipe Service in the Recipes Component

- [`app.module.ts`](../../course-project-1/src/app/recipes/recipes.component.ts)

```typescript
...
import { RecipeService } from './recipe.service';

@Component({
  ...
  providers: [RecipeService]
})
export class RecipesComponent { ... }
```

## Use the Recipe Service to Get Recipes

- [`recipe-list.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```typescript
import { ..., OnInit, ... } from '@angular/core';
...
import { RecipeService } from '../recipe.service';

...
export class RecipeListComponent implements OnInit {
  ...
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  ...
}
```