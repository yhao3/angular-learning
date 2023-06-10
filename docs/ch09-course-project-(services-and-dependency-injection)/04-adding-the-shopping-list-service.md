# 04. Adding the Shopping List Service

## Move Ingredients Array to the Shopping List Service

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```typescript
...
export class ShoppingListComponent {
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10)
  // ];
  ingredients: Ingredient[];
  ...
}
```

- [`shopping-list.service.ts`](../../course-project-1/src/app/shopping-list/shopping-list.service.ts)

```typescript
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
}
```

1. Move `ingredients` array from `shopping-list.component.ts` to `shopping-list.service.ts`
2. Make `ingredients` array private
3. Create `getIngredients()` method to return a "copy" of `ingredients` array (using `slice()` method)

## Provide the Shopping List Service in the `AppModule`

因為我們之後也需要在 `Recipe` 相關的元件中使用 `ShoppingListService` ，所以我們需要在 `AppModule` 中提供 `ShoppingListService` ：

- [`app.module.ts`](../../course-project-1/src/app/app.module.ts)

```typescript
...
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  ...
  providers: [ShoppingListService],
  ...
})
export class AppModule { }
```

## Use the Shopping List Service to Get Ingredients

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```typescript
import { ..., OnInit } from '@angular/core';
...
import { ShoppingListService } from './shopping-list.service';

...
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  ...
}
```

## Add `addIngredient()` Method to the Shopping List Service

接著我們還希望將新增食材的邏輯也移到 `ShoppingListService` 中：

- [`shopping-list.service.ts`](../../course-project-1/src/app/shopping-list/shopping-list.service.ts)

```typescript
...
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    ...
  ];
  ...
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
```

## Update Shopping Edit Component

- [`shopping-edit.component.ts`](../../course-project-1/src/app/shopping-list/shopping-edit/shopping-edit.component.ts)

```typescript
...
export class ShoppingEditComponent {
  ...
  // @Output()
  // ingredientAdded = new EventEmitter<Ingredient>();


  onAddItem() {
    ...
    // this.ingredientAdded.emit(newIngredient);
  }
}
```

## Update Shopping List Component

- [`shopping-list.component.html`](../../course-project-1/src/app/shopping-list/shopping-list.component.html)

```html
    ...
    <!-- <app-shopping-edit (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit> -->
    <app-shopping-edit></app-shopping-edit>
    ...
```

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```typescript
...
export class ShoppingListComponent implements OnInit {
  ...
  // onIngredientAdded(newIngredient: Ingredient) {
  //   this.ingredients.push(newIngredient);
  // }
}
```

## Update Shopping Edit Component

- [`shopping-edit.component.ts`](../../course-project-1/src/app/shopping-list/shopping-edit/shopping-edit.component.ts)

```typescript
...
import { ShoppingListService } from '../shopping-list.service';

...
export class ShoppingEditComponent {
  ...
  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.shoppingListService.addIngredient(newIngredient);
  }
}
```

如此一來，我們就初步完成了 `ShoppingListService` 的實作。

但是，我們還有一個問題，就是當我們在 `ShoppingEditComponent` 中新增食材時，`ShoppingListComponent` 並不會自動更新，我們會在下一節 [05. Using Services for Pushing Data from A to B](../ch09-course-project-(services-and-dependency-injection)/05-using-services-for-pushing-data-from-a-to-b.md) 中解決這個問題。