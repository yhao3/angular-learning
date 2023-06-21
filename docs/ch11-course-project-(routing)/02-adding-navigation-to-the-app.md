# 02. Adding Navigation to the App

## Refectoring the `HeaderComponent`

之前我們是使用事件綁定的方式來處理 `HeaderComponent` 的 Navigation Bar，但現在我們要改用 Router 來處理，因此我們要將 `HeaderComponent` 模板的程式碼改寫如下：

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```diff
<nav class="navbar navbar-default">
  <div class="container-fluid">
    ...
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
-       <li><a href="#" (click)="onSelect('recipe')" >Recipes</a></li>
-       <li><a href="#" (click)="onSelect('shopping-list')" >Shopping List</a></li>
+       <li><a routerLink="recipes" >Recipes</a></li>
+       <li><a routerLink="shopping-list" >Shopping List</a></li>
      </ul>
      ...
    </div>
  </div>
</nav>
```

對於 [`header.component.ts`](../../course-project-1/src/app/header/header.component.ts) 來說，我們不再需要 `@Output` 與 `EventEmitter`，因此我們可以將它們移除：

- [`header.component.ts`](../../course-project-1/src/app/header/header.component.ts)

```diff
- import { Component, EventEmitter, Output } from '@angular/core';
+ import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

- @Output()
- featureSelected = new EventEmitter<string>();
-
- onSelect(feature: string) {
-   this.featureSelected.emit(feature);
- }
}
```