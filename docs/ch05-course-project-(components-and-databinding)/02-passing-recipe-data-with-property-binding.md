# 02. Passing Recipe Data with Property Binding

所以在上一節中，我們添加了導航欄。

現在，我想處理這個食譜列表。

現在，如果我們看一下 `recipe-list` component ，我們會看到單個列表項的程式碼就在這裡：

- [`recipe-list.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
    ...
    <a
      href="#"
      class="list-group-item clearfix"
      *ngFor="let recipe of recipes">
      <div class="pull-left">
        <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
        <p class="list-group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
        <img
          [src]="recipe.imagePath"
          alt="{{ recipe.name }}"
          class="img-responsive"
          style="max-height: 50px;">
      </span>
    </a>
    ...
```

我們確實有一個單獨的 `recipe-item` component ，但目前它沒有任何模板，因為我們不得不將這個程式碼外包並暫時放入這個 `recipe-list` component 中，否則我們將無法顯示我們的食譜資料。

現在我們知道如何將資料傳遞給 component ，所以我們可以剪下這裡的所有程式碼，並將它貼到 `recipe-item` component 模板中：

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```html
<a
  href="#"
  class="list-group-item clearfix"
  *ngFor="let recipe of recipes">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img
      [src]="recipe.imagePath"
      alt="{{ recipe.name }}"
      class="img-responsive"
      style="max-height: 50px;">
  </span>
</a>
```

現在，目標當然是在這裡獲取 NG for 迴圈，將其從 `recipe-item` 內部移出並移回到 `recipe-item` 上，然後將每次迭代的個別 `recipe-item` （每個食譜）傳遞給該 component ，以便我們仍然可以在這裡輸出食譜名稱等。

首先，我會在這裡剪下 NG for 迴圈：

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```html
<a
  href="#"
  class="list-group-item clearfix">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img
      [src]="recipe.imagePath"
      alt="{{ recipe.name }}"
      class="img-responsive"
      style="max-height: 50px;">
  </span>
</a>
```

然後回到 `recipe-list` component ，將其添加到 `app-recipe-item` 中，這樣每個食譜都會複製整個 component ：

- [`recipe-list.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
    ...
    <app-recipe-item
      *ngFor="let recipeElement of recipes"></app-recipe-item>
      ...
```

現在，問題當然是我們無法再在 [`recipe-item`]((../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)) component 內部訪問食譜了。

所以我們應該在 `recipe-item` component 中添加一個食譜屬性：

- [`recipe-item.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.ts)

```ts
import { ..., Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

...
export class RecipeItemComponent {

  @Input()
  recipe: Recipe;
}
```

這個 `recipe` 屬性將是 `Recipe` 這個 Model 類型的。

而且因為我們將從外部綁定它，所以我們需要在這裡添加一個 `@input` 標記。

`@input` 允許我們從外部綁定這個 component 的屬性。

最後，我想從我的 `recipe-list` component 進行綁定。

也就是當 `recipe-list` 在遍歷自己的 `recipes` 陣列屬性時，將每個 `recipeElement` 傳遞給 `recipe-item` component ：

- [`recipe-list.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
    ...
    <app-recipe-item
      *ngFor="let recipeElement of recipes"
      [recipe]="recipeElement"></app-recipe-item>
      ...
```

大功告成！ 