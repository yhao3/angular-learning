# 07. Passing Ingredients from Recipes to the Shopping List (via a Service)

現在我們要實作 ` To Shopping List ` 按鈕，讓使用者可以將食譜中的食材加入到購物清單中。

## Listening for the Click event in the Recipe Detail Template

首先我們要在 `recipe-detail.component.html` 中對 ` To Shopping List ` 按鈕監聽 `click` 事件，並呼叫 `onAddToShoppingList()` 方法。

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```html
        ...
        <li><a (click)="onAddToShoppingList()" style="cursor: pointer;">To Shopping List</a></li>
        ...
```

## Declaring the `onAddToShoppingList()` Method in the Recipe Detail Component

接著我們要在 `recipe-detail.component.ts` 中實作 `onAddToShoppingList()` 方法，並在方法中呼叫 `recipeService.addIngredientsToShoppingList()` 方法。 因此在這之前我們需要先注入 `RecipeService` 服務：

- [`recipe-detail.component.ts`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.ts)

```typescript
...
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input()
  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
```

## Adding the `addIngredientsToShoppingList()` Method to the Recipe Service

接著我們要在 `recipe.service.ts` 中實作 `addIngredientsToShoppingList()` 方法，並在方法中呼叫 `ShoppingListService.addIngredients()` 方法。 因此在這之前我們需要先注入 `ShoppingListService` 服務。

值得注意的是，因為現在我們要在「**服務中注入服務**」，所以務必在「被注入的服務」（即 `RecipeService` 服務）中加上 `@Injectable()` 裝飾器：

- [`recipe.service.ts`](../../course-project-1/src/app/recipes/recipe.service.ts)

```typescript
import { ..., Injectable } from '@angular/core';
...
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()                                                          // (1)
export class RecipeService {
  recipes: Recipe[] = [
    ...
  ];
  ...
  constructor(private shoppingListService: ShoppingListService) { }    // (2)
  ...
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);              // (3)
  }
}
```

> 1. Add `@Injectable()` decorator to the service that is being injected.
> 2. Inject the `ShoppingListService` into the `RecipeService`.
> 3. Call the `ShoppingListService`'s `addIngredients()` method.

## Adding the `addIngredients()` Method to the Shopping List Service

- [`shopping-list.service.ts`](../../course-project-1/src/app/shopping-list/shopping-list.service.ts)

```typescript
...
export class ShoppingListService {
  ...
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
```