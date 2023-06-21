# 01. Setting Up Routes

## Creating `app-routing.module.ts`

```shell
cd src/app
touch app-routing.module.ts
```

- [`app-routing.module.ts`](../../course-project-1/src/app/app-routing.module.ts)

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },       // (1)
  { path: 'recipes', component: RecipesComponent },
  { path : 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
```

> 1.  注意這裡我們必須將 `pathMatch` 設定為 `'full'`，否則 Angular 會將空字串視為所有路由的前綴，導致無法正確導向 `/recipes` 路由而出現以下錯誤：
> 
>     ```
>     ERROR Error: NG04014: Invalid configuration of route '{path: "", r e   directTo: "/recipes"}': please provide 'pathMatch'. The defau lt va   lue of 'pathMatch' is 'prefix', but often the intent is to  use 'f   ull'.
>     ```

## Importing the `AppRoutingModule` in the `AppModule`

- [`app.module.ts`](../../course-project-1/src/app/app.module.ts)

```diff
...
+ import { AppRoutingModule } from './app-routing.module';

@NgModule({
  ...
  imports: [
    BrowserModule,
    FormsModule,
+   AppRoutingModule
  ],
  ...
})
export class AppModule { }
```

## Using `<router-outlet>` in the Templates

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```diff
<app-header (featureSelected)="onNavigate($event)"></app-header>
<div class="container">
  <div class="row">
    <div class="col-md-12">
-     <app-recipes *ngIf="loadedFeature === 'recipe'"></app-recipes>
-     <app-shopping-list *ngIf="loadedFeature === 'shopping-list'"></app-shopping-list>
+     <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

## Testing

如此一來當我們訪問 [`/recipes`](http://localhost:4200/recipes) 時，就會顯示 `RecipesComponent` 的內容，而當我們訪問 [`/shopping-list`](http://localhost:4200/shopping-list) 時，就會顯示 `ShoppingListComponent` 的內容。

但目前我們畫面上的 Navigation Bar 還沒有任何反應，我們會在下一小節來處理這個問題。