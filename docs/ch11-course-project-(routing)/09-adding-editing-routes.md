# 09. Adding Editing Routes

## Creating the Recipe Edit Component

```shell
ng g c recipes/recipe-edit --skip-tests
```

```
CREATE src/app/recipes/recipe-edit/recipe-edit.component.css (0 bytes)
CREATE src/app/recipes/recipe-edit/recipe-edit.component.html (26 bytes)
CREATE src/app/recipes/recipe-edit/recipe-edit.component.ts (221 bytes)
UPDATE src/app/app.module.ts (1602 bytes)
```

## Registering Routes

現在我們要註冊 2 個綁定到 `RecipeEditComponent` 的路由，分別是「新增食譜」和「編輯某筆 ID 食譜」的路由：

- [`app-routing.module.ts`](../../course-project-1/src/app/app-routing.module.ts)

```diff
...
+ import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  ...
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: ':id', component: RecipeDetailComponent },
+   { path: 'new', component: RecipeEditComponent},
+   { path: ':id/edit', component: RecipeEditComponent}
  ] },
  ...
];
...
export class AppRoutingModule {

}
```

現在 `recipes/:id/edit` 路由可以正常運作，但是 `recipes/new` 會出現錯誤，因為 `"new"` 字串會被當作 `recipes/:id` 路由的 `id` 值：

正確的做法應該是把 `new` 路由放在 `recipes/:id` 路由的「上面」，這樣 `recipes/:id` 路由就不會把 `"new"` 字串當作 `id` 值了！

- [`app-routing.module.ts`](../../course-project-1/src/app/app-routing.module.ts)

```diff
...
const appRoutes: Routes = [
  ...
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
+   { path: 'new', component: RecipeEditComponent},
    { path: ':id', component: RecipeDetailComponent },
-   { path: 'new', component: RecipeEditComponent},
    { path: ':id/edit', component: RecipeEditComponent}
    ] },
    ...
];
...
export class AppRoutingModule {

}
```

如此一來 `recipes/new` 就可以正常運作了！