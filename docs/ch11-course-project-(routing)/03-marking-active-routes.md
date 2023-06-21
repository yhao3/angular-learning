---
tags: [`routerLinkActive`]
---

# 03. Marking Active Routes

現在我們要在 Navigation Bar 上面加上一個功能，就是當我們在某個頁面時，該頁面的 Navigation Bar 上面的連結會有不同的樣式，這樣使用者就可以知道他們現在在哪個頁面。

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```diff
<nav class="navbar navbar-default">
  <div class="container-fluid">
    ...
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
-       <li><a routerLink="recipes" >Recipes</a></li>
-       <li><a routerLink="shopping-list" >Shopping List</a></li>
+       <li routerLinkActive="active"><a routerLink="recipes" >Recipes</a></li>
+       <li routerLinkActive="active"><a routerLink="shopping-list" >Shopping List</a></li>
      </ul>
      ...
    </div>
  </div>
</nav>
```

> **Warning**:
> 注意 `routerLinkActive` 是加在 `<li>` 標籤上面，而不是 `<a>` 標籤上面！