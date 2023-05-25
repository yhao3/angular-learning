# 12. Creating and Outputting the Shopping List

讓我們使用我們新建立的食材模型。

就像食譜一樣，我們現在可以為我們的食材陣列定義類型，這將是一個食材陣列的類型。 當然，為此我們必須導入食材：

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```ts
import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [ ];
}
```

有了這個，我們現在可以創建食材：

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```ts
import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
}
```

這就是我們現在的購物清單。

現在我們想要在 `shopping-list` component 中輸出它。

所以我們這裡有一個 `<a>` 標籤，代表一筆食材。

所以我將在這個錨點標籤上加上 `ngFor` ，來遍歷所有的食材：

- [`shopping-list.component.html`](../../course-project-1/src/app/shopping-list/shopping-list.component.html)

```html
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a
        class="list-group-item"
        style="cursor: pointer"
        *ngFor="let ingredient of ingredients"
      >
        ...
      </a>
    </ul>
  </div>
</div>
```

現在我們可以在 `<a>` 標籤中輸出食材資料：

- [`shopping-list.component.html`](../../course-project-1/src/app/shopping-list/shopping-list.component.html)

```html
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a
        class="list-group-item"
        style="cursor: pointer"
        *ngFor="let ingredient of ingredients"
      >
        {{ ingredient.name }} ({{ ingredient.amount }})
      </a>
    </ul>
  </div>
</div>
```

有了這個，如果我們現在保存這個，我們已經在底部看到我們的購物清單。

接下來我要實作的最後一個缺失的部分是這個購物清單的「編輯」部分，它應該顯示一個輸入欄位，然後允許我們實際編輯我們的食材。