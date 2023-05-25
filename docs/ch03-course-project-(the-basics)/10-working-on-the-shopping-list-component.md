# 10. Working on the ShoppingListComponent

我們暫時完成了所有的食譜 component 。

現在，讓我們來處理 `shopping-list`。

在 `shopping-list` component ，我們已經在模板 HTML 檔案中添加了一些內容。

現在，我們將在這裡添加一個 `<ul>` 無序列表，並為其添加一些 Bootstrap 的 CSS ：

- [`shopping-list.component.html`](../../course-project-1/src/app/shopping-list/shopping-list.component.html)

```html
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a
        class="list-group-item"
        style="cursor: pointer">
      </a>
    </ul>
  </div>
</div>
```

現在，要在這裡顯示一些內容，我們需要一個食材的陣列。

所以我現在要做的是在 [`shopping-list.component`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts) 中添加 `ingredients` 屬性，這將是一個空陣列：

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```ts
...
export class ShoppingListComponent {
  ingredients = [];
}
```

但是現在，就像食譜一樣，我們將在整個應用程式中頻繁使用 `ingredients` ，在食譜部分也是如此。

所以讓我們在下一堂課中創建一個 `Ingredient` 模型。