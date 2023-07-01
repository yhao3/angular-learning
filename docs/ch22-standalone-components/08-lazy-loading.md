# 08. Lazy Loading

在本小節中，我們將學習如何在 Angular 中將元件遷移為獨立元件並進行必要的調整。讓我們從 About 元件開始。

## Migrating the About Component

要將 About 元件轉換為獨立元件，我們可以新增 `standalone` 旗標並將其設置為 `true`。這表示該元件是獨立的，並不依賴於任何其他指令或獨立元件。如果有相依性，我們需要將它們添加到 `imports` 陣列中。

- [`about.component.ts`](../../routing-standalone-app/src/app/about/about.component.ts)

```diff
import { Component } from '@angular/core';

@Component({
+ standalone: true,
  templateUrl: './about.component.html'
})
export class AboutComponent {}
```

一旦 About 元件轉換為獨立元件，我們需要在 `app-routing.module` 引用它。我們將 About 元件指定為我們要載入的路由目標：

- [`app-routing.module.ts`](../../routing-standalone-app/src/app/app-routing.module.ts)

```ts
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (mod) => mod.DashboardRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

即使使用獨立元件，應用程式仍然會正常運作。您可以像之前一樣前往 About 頁面。

## Lazy Loading Standalone Components

使用獨立元件，您可以選擇使用不同的語法來進行延遲載入。通過在路由配置中添加 `loadComponent` 鍵，您可以啟用元件的延遲載入。這種方法允許您只在需要時下載元件程式碼。

要為獨立元件實現延遲載入，您可以使用 `loadComponent` 並提供一個返回 `import` 語句結果的函數。在函數內部，您指定要延遲載入的元件。該元件從延遲載入的模組中提取。

- [`app-routing.module.ts`](../../routing-standalone-app/src/app/app-routing.module.ts)

```diff
- import { AboutComponent } from './about/about.component';
...
const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
-   component: AboutComponent,
+   loadComponent: () => import('./about/about.component').then(
+     (mod) => mod.AboutComponent
+   ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (mod) => mod.DashboardRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

這種新的語法簡化了延遲載入獨立元件的過程。您不再需要創建額外的路由模組並使用 `loadChildren` 來延遲載入單個元件。相反，您可以直接使用 `loadComponent` 語法指定要載入的元件。

## Multiple Standalone Components with Lazy Loading

要將多個元件遷移為獨立元件，我們可以簡化程式碼並消除包裹性的路由模塊的需求。按照以下步驟進行操作：

### 1. 通過為元件添加 `standalone` 標記，將元件轉換為獨立元件

- [`dashboard.component.ts`](../../routing-standalone-app/src/app/dashboard/dashboard.component.ts)
   
```diff
import { Component } from '@angular/core';

@Component({
+ standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
```

- [`today.component.ts`](../../routing-standalone-app/src/app/dashboard/today/today.component.ts)

```diff
import { Component } from '@angular/core';

@Component({
+ standalone: true,
  templateUrl: './today.component.html',
})
export class TodayComponent {}
```

### 2. 刪除所有相關 NgModules

現在我們可以把 `dashboard.module.ts` 和 `dashboard-routing.module.ts` 刪除。

```shell
rm src/app/dashboard/dashboard.module.ts
rm src/app/dashboard/dashboard-routing.module.ts
```

### 3. 在元件的目錄中創建一個新文件，例如 `routes.ts`，用於統一管理元件的路由配置

```shell
touch src/app/dashboard/routes.ts
```

- [`routes.ts`](../../routing-standalone-app/src/app/dashboard/routes.ts)

```typescript
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TodayComponent } from './today/today.component';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'today',
    component: TodayComponent,
  },
];
```

### 4. 更新 `app-routing.module` ，使用 `DASHBOARD_ROUTES` 常量代替包裹性的路由模塊

- [`app-routing.module.ts`](../../routing-standalone-app/src/app/app-routing.module.ts)

```diff
...
const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(
      (mod) => mod.AboutComponent
    ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
-     import('./dashboard/dashboard-routing.module').then(
-       (mod) => mod.DashboardRoutingModule
-     ),
+     import('./dashboard/routes').then(
+       (mod) => mod.DASHBOARD_ROUTES
+     ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

通過將多個元件轉換為獨立元件並使用 `DASHBOARD_ROUTES` 常量，我們簡化了程式碼，並消除了額外的路由模塊的需求。

## Adding `RouterModule` to Standalone

當在獨立元件中使用路由功能或指令（如 `routerLink`）時，我們需要導入 `RouterModule` 以使這些功能可用。要將 `RouterModule` 添加到獨立元件中。

例如因為我們在 [`dashboard.component.html`](../../routing-standalone-app/src/app/dashboard/dashboard.component.html) 中使用了 `routerLink` 指令，所以我們需要將 `RouterModule` 導入到 `dashboard.component.ts` 中：

- [`dashboard.component.ts`](../../routing-standalone-app/src/app/dashboard/dashboard.component.ts)

```diff
import { Component } from '@angular/core';
+ import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
+ imports: [RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
```

通過將 `RouterModule` 添加到獨立元件中，我們可以在元件內部使用路由功能和指令。

通過進行這些調整，我們可以成功地將元件遷移為獨立元件，增強獨立元件的延遲加載功能，簡化程式碼，並在不需要包裹性的路由模塊的情況下使用獨立元件。