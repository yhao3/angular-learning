# 22. Protecting Routes with `canActivate`

## Creating Auth Service

我們還需要能夠登入登出，所以首先我們需要一個 Auth Service。

```shell
cd src/app
vi auth.service.ts
```

- [`auth.service.ts`](../../routing-app/src/app/auth.service.ts)

```ts
export class AuthService {

  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        // Once 1000 ms have passed, resolve the promise with the value of this.loggedIn.
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 1000);
      }
    );

    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
```

## Creating Auth Guard Service

接著我們需要一個 Auth Guard Service 來保護我們的路由。

### 1. Creating `auth-guard.service.ts` File

```shell
cd src/app
vi auth-guard.service.ts
```

- [`auth-guard.service.ts`](../../routing-app/src/app/auth-guard.service.ts)

```ts
export class AuthGuard { }
```

### 2. Implementing the `CanActivate` Interface

- [`auth-guard.service.ts`](../../routing-app/src/app/auth-guard.service.ts)

```ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // TODO
  }
}
```


### 3. Making the Auth Guard Service Injectable

由於我們待會需要注入 Auth Service，所以我們需要將 Auth Guard Service 設定為 Injectable。

- [`auth-guard.service.ts`](../../routing-app/src/app/auth-guard.service.ts)

```ts
import { Injectable } from '@angular/core';
...

@Injectable()
export class AuthGuard implements CanActivate {
  ...
}
```

### 4. Injecting the Auth Service into the Auth Guard Service

- [`auth-guard.service.ts`](../../routing-app/src/app/auth-guard.service.ts)

```ts
...
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}
  ...
}
```

別忘記在 [`app.module.ts`](../../routing-app/src/app/app.module.ts) 中將 Auth Service 即 AuthGuard Service 都加入到 `providers` 中：

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```diff
...
+ import { AuthService } from './auth.service';
+ import { AuthGuard } from './auth-guard.service';

@NgModule({
  ...
+ providers: [ServersService, AuthService, AuthGuard],
- providers: [ServersService],
  ...
})
export class AppModule { }
```


### 5. Implementing the `canActivate` Method

- [`auth-guard.service.ts`](../../routing-app/src/app/auth-guard.service.ts)

```ts
...
import { ..., Router, ... } from '@angular/router';
...

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            // option 1: Navigate away to the root of the application after 1000 ms.
            this.router.navigate(['/']);
            // option 2: Do nothing.
            // return false;
          }
        }
      );
  }
}
```

## Protecting the Servers Route with the Auth Guard

要保護路由，我們需要在 [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts) 中的路由定義中使用 `canActivate` 來指定 Auth Guard。

假設我們想要保護 `/servers` 路由，我們可以這樣做：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
+ import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  ...
+ { path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
- { path: 'servers', component: ServersComponent, children: [

    ...
  ] },
  ...
];
...
```
