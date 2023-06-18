# 20. Outsourcing the Route Configuration

本章節我們將會把 [`app.module.ts`](../../routing-app/src/app/app.module.ts) 中的路由相關設定搬移到 `app-routing.module.ts` 中。

## 0. Creating `app-routing.module.ts` File

```shell
cd src/app
touch app-routing.module.ts
```

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```typescript
export class AppRoutingModule { }
```

## 1. Declaring `appRoutes` Constant

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```typescript
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // localhost:4200
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }, // localhost:4200/users/:id/:name
  ] },
  { path: 'servers', component: ServersComponent, children: [
    { path: ':id', component: ServerComponent }, // localhost:4200/servers/:id
    { path: ':id/edit', component: EditServerComponent }, // localhost:4200/servers/:id/edit
  ] },
  { path: 'not-found', component: PageNotFoundComponent }, // localhost:4200/not-found,
  { path: '**', redirectTo: '/not-found' }
];

export class AppRoutingModule { }
```

## 2. Using `RouterModule.forRoot()` Method to Register `appRoutes` Routes

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```typescript
...
import { RouterModule, ... } from '@angular/router';
...
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
```

## ⚠️ 3. Exporting `AppRoutingModule` Class

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```typescript
...
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## ⚠️ 4. Importing `AppRoutingModule` Class in `AppModule` Class

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```typescript
...
import { AppRoutingModule } from './app-routing.module';
...
@NgModule({
  imports: [
    ...
    AppRoutingModule
  ],
  ...
})
export class AppModule { }
```