# 04. Navigating with Router Links

## Using `href` Attribute is the Bad Practice

- [`app.component.html`](../../routing-app/src/app/app.component.html)

```html
      ...
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a href="/">Home</a></li>
        <li role="presentation"><a href="/servers">Servers</a></li>
        <li role="presentation"><a href="/users">Users</a></li>
      </ul>
      ...
```

使用 `<a>` 標籤的 `href` 屬性實作的問題是點擊連結時，應用程式都會重新整理。

這是預設行為，因為每次點擊連結時，都會向伺服器發送新的請求，並獲取一個新的頁面。

由於這個頁面仍然是我們的 Angular 應用程式，

並且註冊了路由，它能夠提供正確的路由。

但這並不是最佳的行為，因為這導致應用程式在每次導航時重新啟動。

這導致整個應用程式的狀態丟失，並且不符合使用者的期望。

那麼應該如何實現導航呢？

## Using the `routerLink` Directive is the Best Practice

Angular 提供了一個特殊的指令給我們，它被稱為 "`routerLink`"：

- [`app.component.html`](../../routing-app/src/app/app.component.html)

```html
      ...
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="/servers">Servers</a></li>
        <li role="presentation"><a routerLink="/users">Users</a></li>
      </ul>
      ...
```

而我們使用 `routerLink` 的方式是透過屬性綁定，

所以你可以將它包裹在方括號中。

當然，你現在不能只是在這裡傳入 `/users` ，因為這現在將搜尋一個具有該名稱的屬性，這甚至是 JavaScript 中無效的名稱。

所以現在您必須傳入一個字串，並使用單引號括住：

```html
<a [routerLink]="['/users']">
```

或者更好的方式是使用陣列，這樣可以更細緻地控制 `routerLink` ：

```html
<a [routerLink]="['/users', 'something']">
```

稍後我會回來解釋這種方式何時特別有用，它允許您非常輕鬆地構建更複雜的路徑。

> **Note**:
> 只是 `something` 沒有斜線，這裡的 `/` 斜線使其成為絕對路徑，之後會解釋這一點。

因此，通過這樣，我們使用 `routerLink` 設定了我們的三個連結。

這就是我們可以使用 `routerLink` 進行導航的方式，而這實際上就是我們應該導航的方式，因為它提供了更好的用戶體驗。

它不會重新啟動我們的應用程式，因此它保留了應用程式狀態，並且比一直重新載入頁面快得多。