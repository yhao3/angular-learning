# 05. Using Services for Pushing Data from A to B

我們現在還有一個問題是當我們在 `ShoppingEditComponent` 中新增食材時，`ShoppingListComponent` 並不會自動更新，這是因為我們在 `ShoppingListComponent` 中的 `ingredients` 是一個陣列的「複製品」，所以當我們在 `ShoppingEditComponent` 中新增食材時，`ShoppingListComponent` 中的 `ingredients` 並不會被更新。

解決方式有很多種，在這裡我們會使用我們熟悉的事件發射器來解決這個問題。

簡單來說就是：

1. 我們必須在 `ShoppingListService` 中建立一個「食材被更新」的事件發射器，並且在 `addIngredient()` 中將這個事件發射出去
2. 然後在 `ShoppingListComponent` 中訂閱這個事件，當事件被觸發時，我們就可以更新 `ShoppingListComponent` 中的 `ingredients`

詳細實作如下：

- [`shopping-list.service.ts`](../../course-project-1/src/app/shopping-list/shopping-list.service.ts)

```typescript
import { EventEmitter } from '@angular/core';
...
export class ShoppingListService {
  ...
  ingredientsChanged = new EventEmitter<Ingredient[]>();      // (1)
  ...
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());   // (2)
  }
}
```

> 1. Create an event emitter for ingredients changed
> 2. Emit the event when ingredients are changed

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```typescript
...
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
}
```
