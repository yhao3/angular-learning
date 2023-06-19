# 23. Protecting Child (Nested) Routes with `canActivateChild`

## Avoiding Using `canActivate` in Every Child Route

如果我們只想要保護 Servers 元件下的「子路由」，而非保護整個 Servers 元件，我們當然可以在每個「子路由」中都使用 `canActivate` 來指定 Auth Guard：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
const appRoutes: Routes = [
  ...
+ { path: 'servers', component: ServersComponent, children: [
- { path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
+   { path: ':id', canActivate: [AuthGuard], component: ServerComponent },
-   { path: ':id', component: ServerComponent },
+   { path: ':id/edit', canActivate: [AuthGuard], component: EditServerComponent },
-   { path: ':id/edit', component: EditServerComponent },
  ] },
  ...
];

...
export class AppRoutingModule { }
```

但這樣會讓程式碼變得冗長，而且如果我們今天又在 Servers 元件下新增了一個子路由，我們又得再為該子路由指定 `canActivate`。

## Using `canActivateChild` to Protect Child Routes

幸運的是，Angular 路由器提供了一個內建功能，稱為 `CanActivateChild` ，允許我們在載入「子路由」之前運行程式碼。 這個功能使我們能夠以更簡潔高效的方式實現必要的檢查。

### 1. Implementing the `canActivateChild` Method

首先我們必須實現 `CanActivateChild` 介面及其 `canActivateChild` 方法。 至於實作邏輯因為與 `canActivate` 相同，所以我們可以直接呼叫 `canActivate` 方法：

- [`auth-guard.service.ts`](../../routing-app/src/app/auth-guard.service.ts)

```ts
...
import { ..., CanActivateChild, ... } from '@angular/router';
...

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}
  ...
  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
```

### 2. Protecting the Servers Route with the Auth Guard

接著我們可以將原本的 `canActivate` 改為用 `canActivateChild` 來指定 Auth Guard，藉此只保護 Servers 元件下的「子路由」（不包含 Servers 元件本身）：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...

const appRoutes: Routes = [
  ...
+ { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
- { path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
    ...
  ] },
  ...
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

