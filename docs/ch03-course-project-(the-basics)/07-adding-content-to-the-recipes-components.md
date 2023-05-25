# 07. Adding Content to the Recipes Components

我們已經添加了我們的 `Recipe` 模型。

現在讓我們使用它。

回到 `recipe-list` 元件。

在這裡，我已經添加了我的 `recipes` 陣列，既然我們創建了模型，我們也可以為此定義類型。

因此，將為這個屬性定義為 `Recipe` 模型：

- [`recipe-list-component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```ts
...
import { Recipe } from '../recipe.model';
...
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
}
```

並且為了告訴 TypeScript 這個類型從哪裡來，我們需要 import `Recipe` 模型。

現在可以開始使用這個模型，現在我們可以在這裡管理我們的 `recipes` 陣列。

讓我們從一個食譜開始，一所以在這個陣列中，我將創建 2 個新的食譜，我可以使用 `new` 關鍵字創建一個新的物件：

- [`recipe-list-component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```ts
...
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];
}
```

當然，目前我們無法看到任何內容。

所以為了看到它，我們應該實際上應該在 `recipe-list` 元件的「模板」中輸出我的食譜專案。

我們只需要使用迴圈遍歷所有元素，但在那之前，我們先加入一些 CSS ：

- [`recipe-list-component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item></app-recipe-item>
  </div>
</div>
```

現在我們先寫死一個食譜元素：

- [`recipe-list-component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr>
<div class="row">
  <div class="col-xs-12">
    <a
      href="#"
      class="list-group-item clearfix">
      <div class="pull-left">
        <h4 class="list-group-item-heading">Test Recipe Name</h4>
        <p class="list-group-item-text">Test Description</p>
      </div>
      <span class="pull-right">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg"
          alt=""
          class="img-responsive"
          style="max-height: 50px;">
      </span>
    </a>
    <app-recipe-item></app-recipe-item>
    </div>
</div>
```

而單個食譜元素應該是可點擊的，所以它將是一個 `<a>` 標籤。

在這裡，我將指定另一個類別，它將是 `list-group-item` ，使其看起來像一個 bootstrap 的列表元素，同時添加 `clearfix` 。 否則，它可能看起來有問題。 其餘的 CSS 就不贅述了。

這就是我們的食譜清單元件現在的樣子。

它會將一個寫死的食譜元素，我們可以稍後添加真實的食譜物件。

其中以下底線部分將會是動態的資料：

- [`recipe-list-component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
...
<div class="row">
  <div class="col-xs-12">
    <a 
      href="#" 
      class="list-group-item clearfix">
      <div class="pull-left">
        <h4 class="list-group-item-heading">_________</h4>
        <p class="list-group-item-text">_________</p>
      </div>
      <span class="pull-right">
        <img
          src="_________"
          alt="_________" 
          class="img-responsive" 
          style="max-height: 50px;">
      </span>
    </a>
    <app-recipe-item></app-recipe-item>
    </div>
</div>
```

現在我們可以保存並重新載入我們的應用程式

看看它的外觀。