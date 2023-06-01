# 04. Allowing the User to Add Ingredients to the Shopping List

本小節的目標是讓購物清單輸入欄位能夠運作，這樣我們就能新增商品到購物清單中。

稍後學習到表單時，我們會改寫這部分，但現在使用本地參考（local references）和 `@ViewChild` 來練習是個很好的機會。

## 0. Add `FormsModule` to the `AppModule`

目前當我們按下 `Add` 按鈕時，網頁會重新載入，這是 `submit` 的預設行為。 因此我們必須阻止這個預設行為，一種方式是將 `type` 屬性設為 `button`，但因為稍後實作某些功能會需要 `submit` ，因此我們必須使用 `FormsModule` 來解決這個問題。

有了 `FormsModule` ， Angular 會知道如何以不同的方式處理表單，只收集輸入值，而不會重新載入頁面：

- [`app.module.ts`](../../course-project-1/src/app/app.module.ts)

```ts
...
import { FormsModule } from '@angular/forms';
...
@NgModule({
  ...
  imports: [
    ...
    FormsModule
  ],
  ...
})
export class AppModule { }
```

## 1. Add Local Reference to the `input` Element

- [`shopping-edit.component.html`](../../course-project-1/src/app/shopping-list/shopping-edit/shopping-edit.component.html)

```html
          ...
          <input 
            type="text" 
            id="name" 
            class="form-control"
            #nameInput>
          ...
          <input 
            type="number" 
            id="amount" 
            class="form-control"
            #amountInput>
          ...
```

## 2. Listen to the `click` Event of the `Add` Button

- [`shopping-edit.component.html`](../../course-project-1/src/app/shopping-list/shopping-edit/shopping-edit.component.html)

```html
          ...
          <button class="btn btn-success" type="submit" (click)="onAddItem()">Add</button>
          ...
```

## 3. Implement the `onAddItem()` Method 

### 3.1 Create a new `Ingredient` Object with Local References

- [`shopping-edit.component.ts`](../../course-project-1/src/app/shopping-list/shopping-edit/shopping-edit.component.ts)

```ts
import { ..., ElementRef, ..., ViewChild } from '@angular/core';
...
export class ShoppingEditComponent {

  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef;

  @ViewChild('amountInput', { static: false })
  amountInputRef: ElementRef;

  onAddItem() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
  }
}
```

### 3.2 Emit the `ingredientAdded` Event to the `shopping-list` Component

- [`shopping-edit.component.ts`](../../course-project-1/src/app/shopping-list/shopping-edit/shopping-edit.component.ts)

```ts
import { ..., EventEmitter, ..., Output } from '@angular/core';
...
export class ShoppingEditComponent {

  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef;

  @ViewChild('amountInput', { static: false })
  amountInputRef: ElementRef;

  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.ingredientAdded.emit(newIngredient);
  }
}
```

## 4. Listen to the `ingredientAdded` Event in the `shopping-list` Component

- [`shopping-list.component.html`](../../course-project-1/src/app/shopping-list/shopping-list.component.html)

```html
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit>
    ...
```

## 5. Implement the `onIngredientAdded()` Method

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```ts
...
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    ...
  ];

  onIngredientAdded(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
  }
}
```