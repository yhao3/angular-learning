---
tags: ['child routes', 'router-outlet']
---

# 05. Adding Child Routing

## Adding Child Routes in the Recipe Module

### 1. Adding Recipe Start Component

首先我們先建立一個 `RecipeStartComponent` 作為 Recipe 的起始頁面：

```shell
ng g c recipes/recipe-start --skip-tests
```

```
CREATE src/app/recipes/recipe-start/recipe-start.component.css (0 bytes)
CREATE src/app/recipes/recipe-start/recipe-start.component.html (27 bytes)
CREATE src/app/recipes/recipe-start/recipe-start.component.ts (225 bytes)
UPDATE src/app/app.module.ts (1494 bytes)
```

接著我們將 [`recipe-start.component.html`](../../course-project-1/src/app/recipes/recipe-start/recipe-start.component.html) 的程式碼改寫如下：

- [`recipe-start.component.html`](../../course-project-1/src/app/recipes/recipe-start/recipe-start.component.html)

```html
<h3>Please select a Recipe!</h3>
```

### 2. Registering Child Routes

- [`app-routing.module.ts`](../../course-project-1/src/app/app-routing.module.ts)

```diff
...
+ import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
+ import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
  ...
- { path: 'recipes', component: RecipesComponent },
+ { path: 'recipes', component: RecipesComponent, children: [
+   { path: '', component: RecipeStartComponent },
+   { path: ':id', component: RecipeDetailComponent }
+ ] },
  ...
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
```

### 3. Adding `router-outlet` to the Recipes Component

- [`recipes.component.html`](../../course-project-1/src/app/recipes/recipes.component.html)

```diff
<div class="row">
  <div class="col-md-5">
    <app-recipe-list></app-recipe-list>
  </div>
  <div class="col-md-7">
-   <app-recipe-detail
-     *ngIf="selectedRecipe; else infoText"
-     [recipe]="selectedRecipe"></app-recipe-detail>
-   <ng-template #infoText>
-     <p>Please select a Recipe!</p>
-   </ng-template>
+   <router-outlet></router-outlet>
  </div>
</div>
```

但現在我們會發現，當我們點選 Recipe List 上面的 Recipe 時，是無法正常運作的。 我們會在下一小節 [06. Configuring Route Parameters](./06-configuring-route-parameters.md) 中處理這個問題。