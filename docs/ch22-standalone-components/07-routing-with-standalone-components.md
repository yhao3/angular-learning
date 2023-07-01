# 07. Routing with Standalone Components

## Demo Application

- [`routing-standalone-app`](../../routing-standalone-app/)

該專案包含了我們迄今為止所使用的所有元件，並將它們轉換為獨立元件。此外，這個專案還包含一些新的元件：

1. `AboutComponent`：呈現一個簡單的「關於」頁面。
2. `DashboardComponent`：呈現一個虛擬的儀表板頁面，並包含一個路由連結，可以導航到另一個虛擬頁面 `TodayComponent`。

## Lazy Loading with Routing

在更新的專案中，`DashboardComponent` 和 `TodayComponent` 擁有自己的模組，特別聲明了 `DashboardComponent` 和 `DashboardRoutingModule`。`DashboardRoutingModule` 負責在 `DashboardComponent` 和 `TodayComponent` 之間進行導航。為了使這些模組可以進行延遲加載，它們使用了 `forChild()` 方法。

`app-routing.module` 是這個起始專案中的另一個新文件。它定義了一些路由：

1. 預設路由指向 `WelcomeComponent`。
2. "about" 路由指向 `AboutComponent`。
3. "dashboard" 路由使用延遲加載方式載入 `DashboardRoutingModule`。

這樣設計的目的是，只有在 `app-routing.module` 需要時，才會載入 `DashboardRoutingModule` 及其模組。

## Making AppComponent Aware of the RouterModule

`AppComponent` 是一個獨立元件，它需要知道 `RouterModule` 才能理解 `router-outlet` 和 `routerLink` 指令。為了實現這一點，我們需要在 `AppComponent` 中引入 `RouterModule`，將其加入 `imports` 陣列，並在文件頂部添加引入語句。

- [`app.component.ts`](../../routing-standalone-app/src/app/app.component.ts)

```diff
import { Component } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
+ import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
- imports: [WelcomeComponent],
+ imports: [WelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
```

## Making Angular Aware of the Routes

在 `main.ts` 中，我們還需要讓 Angular 知道我們的路由模組。為此，我們使用了 `@angular/core` 提供的 `importProvidersfrom()` 函數。我們從 `app-routing.module` 文件中引入 `AppRoutingModule`，並將其指針傳遞給 `importProvidersfrom()` 函數。這使我們的獨立路由元件知道了路由，同時也讓整個Angular應用程序知道了路由：

- [`main.ts`](../../routing-standalone-app/src/main.ts)

```diff
- import { enableProdMode } from '@angular/core';
+ import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { AnalyticsService } from './app/shared/analytics.service';
import { environment } from './environments/environment';
+ import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // AnalyticsService,
+   importProvidersFrom(AppRoutingModule)
  ],
});
```

## Lazy Loading and Navigation

在實施了必要的更改後，我們現在可以導航到不同的頁面：歡迎頁面、關於頁面和儀表板頁面。如果重新載入應用程序並在瀏覽器的開發工具中打開網絡選項卡，我們可以觀察到儀表板頁面是延遲加載的。`DashboardComponent` 的程式碼只在需要時才下載，這要歸功於延遲加載的功能。

## Conclusion

在 Angular 中使用獨立元件和路由可以有效組織我們的應用程序。通過連接路由設定並利用延遲加載，我們可以實現結構良好且具有響應性的應用程序。無論你選擇將模組與獨立元件相結合，還是使用單獨的路由模組，Angular 都提供了在構建複雜應用程序時的靈活性。