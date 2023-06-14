# 13. Passing Query Parameters and Fragments

你還可以對 URL 進行更多的擴充。

- 其中一個擴充是查詢參數，它們由問號（`?`）分隔，並且可以包含多個由和號分隔的參數。
- 另一個擴充是片段，由井號（`#`）標示，用於在應用程式中導航到特定區域。

以下我們將會藉由 `EditServerComponent` 示範類似 [`.../servers/1/edit?allowEdit=1#loading`](http://localhost:4200/servers/1/edit?allowEdit=1#loading) 這樣的 URL。

## Configurations

### Registering EditServerComponent Route

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```ts
const appRoutes: Routes = [
  ...
  { path: 'servers/:id/edit', component: EditServerComponent }, // localhost:4200/servers/:id/edit
];
...
export class AppModule { }
```

## How to Pass Query Parameters and Fragments In the Template

這裡以點擊 `http://localhost:4200/servers` 頁面左側的 Server Name 連結為例，我們希望點擊後能夠導航到 `http://localhost:4200/servers/5/edit?allowEdit=1#loading` 這樣的 URL：

- [`servers.component.html`](../../routing-app/src/app/servers/servers.component.html)

```html
      ...
      <a
        [routerLink]="['/servers', 5, 'edit']"
        [queryParams]="{allowEdit: '1'}"
        fragment="loading"
        ...>
        {{ server.name }}
      </a>
      ...
```

## How to Pass Query Parameters and Fragments Programmatically

這裡我們以 `http://localhost:4200/` 中新增 `Load server 1` 按鈕為例，我們希望點擊後能夠導航到 `http://localhost:4200/servers/1/edit?allowEdit=1#loading` 這樣的 URL：

### Add `Load Server 1` Button

- [`home.component.html`](../../routing-app/src/app/home/home.component.html)

```html
...
<button class="btn btn-primary" (click)="onLoadServers(1)">Load Server 1</button>
```

### Declare `onLoadServers(id: number)` Method

- [`home.component.ts`](../../routing-app/src/app/home/home.component.ts)

```ts
...
export class HomeComponent implements OnInit {
  ...
  onLoadServers(id: number) {
    this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '1' }, fragment: 'loading'});
  }
  ...
}
```