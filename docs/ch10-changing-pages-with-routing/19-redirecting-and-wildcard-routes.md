# 19. Redirecting and Wildcard Routes

## Handling 404 Error

如果我們訪問 [`localhost:4200/something`](http://localhost:4200/something) 這個不存在的路由，我們會進到空白畫面並在 console 中看到以下的錯誤訊息：

```
ERROR Error: Uncaught (in promise): Error: NG04002: Cannot match any routes. URL Segment: 'something'
```

所以當使用者訪問不存在的路由時，我們應該要將使用者「重新導向（Redirect）」至一個 `404 Page Not Found` 頁面。

### Creating Page Not Found Component

首先我們要建立一個 `PageNotFoundComponent`：

```shell
cd routing-app
ng g c page-not-found --skip-tests
```

並且把 [`page-not-found.component.html`](../../routing-app/src/app/page-not-found/page-not-found.component.html) 的內容改成：

- [`page-not-found.component.html`](../../routing-app/src/app/page-not-found/page-not-found.component.shtml)

```html
<h3>Page was not found!</h3>
```

### Registering `not-found` Route

接著我們要在 [`app-routing.module.ts`](../../routing-app/src/app/app.module.ts) 中註冊 `not-found` 路由，並綁定到 `PageNotFoundComponent` 元件：

- [`app-routing.module.ts`](../../routing-app/src/app/app.module.ts)

```typescript
...
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  ...
  { path: 'not-found', component: PageNotFoundComponent }, // localhost:4200/not-found
];
...
export class AppModule { }
```

### Redirecting all 404 Routes to `not-found` Route

最後我們要在 [`app-routing.module.ts`](../../routing-app/src/app/app.module.ts) 中註冊 `**` 路由，並「重導向（Redirect）」到 `not-found` 路由：

- [`app-routing.module.ts`](../../routing-app/src/app/app.module.ts)

```typescript
...
const appRoutes: Routes = [
  ...
  { path: 'not-found', component: PageNotFoundComponent }, // localhost:4200/not-found,
  { path: '**', redirectTo: '/not-found' }
];
...
export class AppModule { }
```

> **Warning**:
> 這裡有一個關鍵是務必將 `**` 路由放在最後面，因為路由會從上往下依序比對，如果 `**` 路由放在前面，那麼所有的路由都會被導向到 `not-found` 路由。

### Testing

現在我們重新整理瀏覽器，並訪問 [`localhost:4200/something`](http://localhost:4200/something)，我們就會被重新導向到 [`localhost:4200/not-found`](http://localhost:4200/not-found) 並看到 `Page was not found!` 的訊息！

## How Redirection Path Matching Works

注意，預設情況下，Angular 會使用前綴進行路徑匹配。 這意味著以下路由將會永遠將你重新導向至 `/somewhere-else`：

```typescript
{ path: '', redirectTo: '/somewhere-else' }
```

實際上，Angular 會給出錯誤，因為這是一個常見的問題，為什麼呢？

由於預設的匹配策略是「前綴」，Angular 會檢查你在 URL 中輸入的路徑是否以路由中指定的路徑開頭。 當然，每個路徑都以 `''` 開頭！

> **Warning**:
> 這不是空格，是「空字串」。

要修正這種行為，你需要將匹配策略更改為「完全匹配」：

```typescript
{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
```

現在，只有在完整路徑為 `''` 時（例如，在這個範例中，如果你的路徑中沒有其他內容），才會被重新導向。