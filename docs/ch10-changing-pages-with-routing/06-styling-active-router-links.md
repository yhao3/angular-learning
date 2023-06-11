# 06. Styling Active Router Links

目前我們的 [`app.component.html`](../../routing-app/src/app/app.component.html) 中的分頁，總是顯示 `Home` 為 active ，並沒有動態切換：

- [`app.component.html`](../../routing-app/src/app/app.component.html)

```html
        ...
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="/servers">Servers</a></li>
        <li role="presentation"><a [routerLink]="['/users']">Users</a></li>
        ...
```

而 Angular 提供了一個 `routerLinkActive` 指令，可以讓我們在當前路由時，自動加上一個 CSS class ，例如這裡我們需要的就是 `active` 這個 class ：

- [`app.component.html`](../../routing-app/src/app/app.component.html)

```html
        ...
        <li role="presentation" routerLinkActive="active"><a routerLink="/">Home</a></li>
        <li role="presentation" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="['/users']">Users</a></li>
        ...
```

然而，現在還有一個問題是，當我們點擊 `Servers` 或 `Users` 時，它們都會動態變成 active ，但是 `Home` 並不會取消 active 。

這是因為 `Home` 的路徑是 `/` ，`/` 是所有路由的前綴，所以它永遠都會是 active 的。

因此我們需要在 `Home` 加上一個參數 `routerLinkActiveOptions` ，並且設定為 `exact: true` 。 如此一來就只有當路由完全符合時，才會加上 `active` 這個 class ：

- [`app.component.html`](../../routing-app/src/app/app.component.html)

```html
        ...
        <li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/">Home</a></li>
        <li role="presentation" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="['/users']">Users</a></li>
        ...
```