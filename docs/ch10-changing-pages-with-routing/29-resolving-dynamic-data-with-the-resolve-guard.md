# 29. Resolving Dynamic Data with the Resolve Guard

現在我們希望能在進入某個路由前，就先取得一些資料，等資料取得後再進入該路由，這時候就可以使用 Resolve Guard 來達成。

回顧一下，目前我們在 [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts) 渲染 `servers/{id}` 路由時，是透過 `ActivatedRoute` 訂閱「路徑參數」的變化，藉此取得該 ID 的伺服器資料。

- [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts)

```typescript
  ...
  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }
  ...
```

現在假設我們希望在 `servers` 伺服器列表頁面點擊某個 ID 的伺服器之前，就能夠預載該 ID 伺服器的資料，這時候就可以使用 Resolve Guard 來實作。

## 1. Creating a Server Resolver Service

```shell
cd src/app/servers/server
touch server-resolver.service.ts
```
- [`server-resolver.service.ts`](../../routing-app/src/app/servers/server/server-resolver.service.ts)

```typescript
export class ServerResolver {}
```

### 1.1 Implementing the `Resolve` Interface

- [`server-resolver.service.ts`](../../routing-app/src/app/servers/server/server-resolver.service.ts)

```typescript
import { Resolve } from '@angular/router';

export class ServerResolver implements Resolve<> {

}
```

### 1.2 Creating a `Server` Model

其中 `Resolve` 是一個泛型介面，我們可以在 `<>` 中指定要「預載」的資料型別，這裡我們希望回傳的是 `Server` 型別。 因此我們可以先將 `Server` 類別抽出來，放在 [`server.model.ts`](../../routing-app/src/app/servers/server/server.model.ts) 中：

- [`server.model.ts`](../../routing-app/src/app/servers/server/server.model.ts)

```typescript
export class Server {
  public id: number;
  public name: string;
  public status: string;

  constructor(id: number, name: string, status: string) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
```

接著我們就可以將 `Resolve` 的泛型指定為 `Server`：

- [`server-resolver.service.ts`](../../routing-app/src/app/servers/server/server-resolver.service.ts)

```typescript
import { Resolve } from '@angular/router';
import { Server } from './server.model';

export class ServerResolver implements Resolve<Server> {

}
```

### 1.3 Implementing the `resolve()` Method

接著我們就可以實作 `Resolve` 介面中的 `resolve()` 方法，這個方法會在路由進入前被呼叫，並且會回傳一個 `Observable` 或 `Promise` ，當這個 `Observable` 或 `Promise` 回傳時，路由才會進入。

而該方法的實作，我們可以注入 `ServersService` 並呼叫 `getServer()` 方法，並且將路徑參數中的 `id` 傳入：

- [`server-resolver.service.ts`](../../routing-app/src/app/servers/server/server-resolver.service.ts)

```diff
...
+ import { ServersService } from '../servers.service';

export class ServerResolver implements Resolve<Server> {

+  constructor(private serversService: ServersService) { }

+  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | +Observable<Server> | Promise<Server> {
+    return this.serversService.getServer(+route.params['id']);
+  }

}
```

## 2. Registering the Resolver

### 2.1 Making the `ServerResolver` Injectable

要註冊 `ServerResolver` 之前，我們務必要先將其標記為 `@Injectable()` ：

- [`server-resolver.service.ts`](../../routing-app/src/app/servers/server/server-resolver.service.ts)

```diff
...
+ import { Injectable } from '@angular/core';

+ @Injectable()
export class ServerResolver implements Resolve<Server> {
  ...
}
```

### 2.2 Registering the Resolver

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```diff
...
+ import { ServerResolver } from './servers/server/server-resolver.service';

@NgModule({
  ...
- providers: [ServersService, AuthService, AuthGuard, CanEditServerComponentDeactivateGuard, CanDeactivateGuard],
+ providers: [ServersService, AuthService, AuthGuard, CanEditServerComponentDeactivateGuard, CanDeactivateGuard, ServerResolver],
  ...
})
export class AppModule { }
```

## 3. Using the Resolver

接著我們在路由設定檔 [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts) 中，將 `servers/:id` 路由的 `resolve` 屬性指定為 `ServerResolver` 。

其中 `resolve` 屬性的值是一個物件，該物件的「屬性名稱」會被當作是注入的變數名稱，而屬性值則會被當作是注入的服務類別，因此我們可以將 `resolve` 屬性指定為：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
+ import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  ...
  { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
-   { path: ':id', component: ServerComponent },
+   { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
  ] },
  ...
];

...
export class AppRoutingModule { }
```

## 4. Accessing the Resolved Data in the `Server` Component

最後我們可以在 [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts) 中，透過 `ActivatedRoute` 的 `data` 屬性來取得 `ServerResolver` return 的預載 `server` 資料：

- [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts)

```diff
...
- import { ActivatedRoute, Router } from '@angular/router';
+ import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
-   this.route.params
-     .subscribe(
-       (params) => {
-         this.server = this.serversService.getServer(+params['id']);
-       }
-     );
+   this.route.data
+     .subscribe(
+       (data: Data) => {
+         this.server = data['server'];   // (1)
+       }
+     );
  }
  ...
}
```

> 1. 注意這裡的 `server` 是在 [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts) 中 `resolve` 屬性中指定的名稱 `resolve: {server: ServerResolver}` 。

回到瀏覽器，重新整理頁面，可以看到現在我們在點擊 `servers/{id}` 路由時，我們仍然可以正常取得該 ID 的伺服器資料，不同的是現在我們在進入該路由前，就已經預載了該 ID 的伺服器資料，因此在進入路由後，就不會再有延遲的情況發生了。