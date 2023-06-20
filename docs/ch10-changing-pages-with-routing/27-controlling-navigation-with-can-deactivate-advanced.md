# 27. Controlling Navigation with `canDeactivate` (Advanced)

在完成了上一小節 [26. Controlling Navigation with `canDeactivate` (Basic)](./26-controlling-navigation-with-can-deactivate-basic.md) 的基礎實作之後，我們現在來思考一些問題：

- 如果我們的應用程式中有很多個元件都需要實作 `canDeactivate` 守衛，那麼我們是不是就得為每個元件都創建一個守衛服務呢？
- 有沒有更好的方式可以讓我們只創建一個守衛服務，就可以讓所有元件都能使用呢？

答案是有的，本小節將會介紹一種更進階的實作方式，讓我們只需要創建一個守衛服務，就可以讓所有元件共用。

## 1. Creating `ProtectedComponent` Interface

回想一下，我們在上一小節中創建了一個 `CanEditServerComponentDeactivateGuard` 守衛服務，並且讓它實作了 `CanDeactivate<EditServerComponent>` 介面：

- [`can-edit-server-component-deactivate-guard.service.ts`](../../routing-app/src/app/servers/edit-server/can-edit-server-component-deactivate-guard.service.ts)

```ts
...
export class CanEditServerComponentDeactivateGuard implements CanDeactivate<EditServerComponent> { ... }
```

那現在既然要讓所有元件都能共用該 `CanDeactivateGuard` 守衛，我們何嘗不把 `CanDeactivate<T>` 介面的型別參數 `T` 指定為一個「介面」呢？

如此一來「實作該介面的所有元件」，都將被該守衛保護！

所以我們現在就來創建一個 `ProtectedComponent` 介面：

```shell
cd src/app
touch protected-component.ts
```

- [`protected-component.ts`](../../routing-app/src/app/protected-component.ts)

```ts
export interface ProtectedComponent {

}
```

## 2. Creating `CanDeactivateGuard` Service

接著我們就來創建一個通用的 `CanDeactivateGuard` 守衛服務，並且讓它實作 `CanDeactivate<T>` 介面，並把 `T` 指定為 `ProtectedComponent` 介面：

```shell
cd src/app
touch can-deactivate-guard.service.ts
```

- [`can-deactivate-guard.service.ts`](../../routing-app/src/app/can-deactivate-guard.service.ts)

```ts
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ProtectedComponent } from './protected-component';
import { Observable } from 'rxjs';

export class CanDeactivateGuard implements CanDeactivate<ProtectedComponent> {

  canDeactivate(component: ProtectedComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // TODO
  }
}
```

現在問題來了，我們該如何實作 `canDeactivate()` 方法呢？

關鍵的問題點是，每個元件「是否可以離開」的邏輯都不一樣，所以我們該如何在 `CanDeactivateGuard` 守衛服務中實作一個通用的 `canDeactivate()` 方法呢？

大可不必！

我們只需要將 `canDeactivate()` 方法的實作邏輯「委託」給該元件自己就好了！ 也就是直接呼叫該元件的 `canDeactivate()` 方法，並且將 `canDeactivate()` 方法的返回值直接返回給 `CanDeactivateGuard` 守衛服務就好了：

- [`can-deactivate-guard.service.ts`](../../routing-app/src/app/can-deactivate-guard.service.ts)

```ts
...

export class CanDeactivateGuard implements CanDeactivate<ProtectedComponent> {

  canDeactivate(component: ProtectedComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}
```

所以我們需要在 `ProtectedComponent` 介面中定義一個 `canDeactivate()` 方法，如此一來所有實作了 `ProtectedComponent` 介面的元件就都必須實作 `canDeactivate()` 方法：

- [`protected-component.ts`](../../routing-app/src/app/protected-component.ts)

```diff
+ import { Observable } from 'rxjs';

export interface ProtectedComponent {
+ canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}
```

## 4. Implement `ProtectedComponent` Interface

接著我們就讓 `EditServerComponent` 實作 `ProtectedComponent` 介面，並將原本 [`can-edit-server-component-deactivate-guard.service.ts`](../../routing-app/src/app/servers/edit-server/can-edit-server-component-deactivate-guard.service.ts) 中的邏輯搬到 `EditServerComponent` 中：

- [`edit-server.component.ts`](../../routing-app/src/app/servers/edit-server/edit-server.component.ts)

```diff
...
+ import { ProtectedComponent } from 'src/app/protected-component';
+ import { Observable } from 'rxjs';
...
+ export class EditServerComponent implements OnInit, ProtectedComponent {
- export class EditServerComponent implements OnInit {
  ...
+ canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
+   if (!this.allowEdit) {
+     return true;
+   }
+   if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) || !this.changeSaved) {
+     return confirm('Do you want to discard the changes?');
+   }
+ }
}
```

## 5. Register `CanDeactivateGuard` Service

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```diff
...
+ import { CanDeactivateGuard } from './can-deactivate-guard.service';

@NgModule({
  ...
+ providers: [ServersService, AuthService, AuthGuard, CanEditServerComponentDeactivateGuard, CanDeactivateGuard],
- providers: [ServersService, AuthService, AuthGuard, CanEditServerComponentDeactivateGuard],
  ...
})
export class AppModule { }
```

## 6. Replace `CanEditServerComponentDeactivateGuard` with `CanDeactivateGuard`

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
- import { CanEditServerComponentDeactivateGuard } from './servers/edit-server/can-edit-server-component-deactivate-guard.service';
+ import { CanDeactivateGuard } from './can-deactivate-guard.service';

const appRoutes: Routes = [
  ...
  { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
    { path: ':id', component: ServerComponent }, // localhost:4200/servers/:id
-   { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanEditServerComponentDeactivateGuard] },
+   { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
  ] },
  ...
];

...
export class AppRoutingModule { }
```

## Summary

大功告成！ 如此一來我們就可以讓所有實作了 `ProtectedComponent` 介面的元件都能共用 `CanDeactivateGuard` 守衛服務了！

將來若有其他元件也需要實作 `canDeactivate()` 方法，我們只需要讓該元件實作 `ProtectedComponent` 介面，並且實作 `canDeactivate()` 方法就可以了！