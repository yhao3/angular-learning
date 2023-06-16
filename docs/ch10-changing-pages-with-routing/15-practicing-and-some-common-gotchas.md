# 15. Practicing and Some Common Gotchas

## 1. 實作 `UsersComponent` 側邊欄的單個 `User` 點擊後，跳轉到 `UserComponent` Template

- [`users.component.html`](../../routing-app/src/app/users/users.component.html)

```html
      ...
      <a
        [routerLink]="['/users', user.id, user.name]"
        ...
        *ngFor="let user of users">
        {{ user.name }}
      </a>
      ...
```

## 2. 實作 `ServersComponent` 側邊欄的單個 `Server` 點擊後，跳轉到 `ServerComponent` Template

### 2.1 Registering `servers/:id` Route

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```ts
const appRoutes: Routes = [
  ...
  { path: 'servers/:id', component: ServerComponent }, // localhost:4200/servers/:id
  ...
];

...
export class AppModule { }
```

### Adding `routerLink` to `ServersComponent` Template

- [`servers.component.html`](../../routing-app/src/app/servers/servers.component.html)

```html
      ...
      <a
        [routerLink]="['/servers', server.id]"
        ...
        *ngFor="let server of servers">
        {{ server.name }}
      </a>
      ...
    <!-- <app-server></app-server> -->
    ...
```

> **Note**:
> 這裡記得把 `<app-server></app-server>` 註解掉，不然會出現錯誤。 原因是因為我們一進入 `Servers` 頁面時，就會先載入 `ServerComponent`，但是這時候 `ServerComponent` 還沒有接收到 `id` 的值，所以會出現錯誤！

> **Info**:
> 下一節我們將會說明如何嵌套 `servers/:id` 路由到 `servers` 路由中。（在路由中嵌套路由）

### 2.2 Implementing `ServerComponent`

- [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts)

```ts
...
import { ActivatedRoute } from '@angular/router';

...
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(...,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }

}
```

> **Note**:
> 這裡記得要加上 `+`，不然會出現錯誤。 原因是因為 `params['id']` 是 `string`，但是 `getServer()` 的參數是 `number`。
> ```typescript
> var a = '1'; // "1"
> var b = +a;  //  1