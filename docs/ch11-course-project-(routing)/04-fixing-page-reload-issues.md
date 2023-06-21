---
tags: []
---

# 04. Fixing Page Reload Issues

## Fixing Page Reload Issues In the Recipe Item Component

現在當我們點擊單筆食譜這種 `a` 標籤時，都會發生 reload page 的問題，我們只需要刪除 `href="#"` 即可。

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```diff
<a
- href="#"
  class="list-group-item clearfix"
  (click)="onSelected()">
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

## Adding the `cursor: pointer;` CSS Property

另外我們還可以加上 CSS 讓滑鼠游標在 `a` 標籤上面時，從箭頭（）會變成一個小手（👆🏻）的圖示：

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```diff
<a
+ style="cursor: pointer;"
  class="list-group-item clearfix"
  (click)="onSelected()">
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

## Fixing the Other Page Reload Issues

剩下其他會 reload page 的地方，我們也可以用同樣的方式來處理：

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```diff
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a href="#" class="navbar-brand">Recipe Book</a>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
-       <li routerLinkActive="active"><a routerLink="recipes" >Recipes</a></li>
+       <li routerLinkActive="active"><a routerLink="shopping-list" >Shopping List</a></li>
      </ul>
      <ul class="nav navbarnav navbar-right">
        <li class="dropdown" appDropdown>
          <a href="#" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
          <a style="cursor: pointer;" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
          <ul class="dropdown-menu">
-           <li><a href="#">Save Data</a></li>
-           <li><a href="#">Fetch Data</a></li>
+           <li><a style="cursor: pointer;">Save Data</a></li>
+           <li><a style="cursor: pointer;">Fetch Data</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```diff
...
<div class="row">
  <div class="col-xs-12">
    <div
      class="btn-group"
      appDropdown>
      <button
        type="button"
        class="btn btn-primary dropdown-toggle"
        data-toggle="dropdown">
        Manage Recipe
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a (click)="onAddToShoppingList()" style="cursor: pointer;">To Shopping List</a></li>
-       <li><a href="#">Edit Recipe</a></li>
-       <li><a href="#">Delete Recipe</a></li>
+       <li><a style="cursor: pointer;">Edit Recipe</a></li>
+       <li><a style="cursor: pointer;">Delete Recipe</a></li>
      </ul>
    </div>
  </div>
</div>
...
```