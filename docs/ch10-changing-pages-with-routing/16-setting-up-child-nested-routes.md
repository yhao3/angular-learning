# 16. Setting Up Child (Nested) Routes

## Updating routes registration

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```ts
const appRoutes: Routes = [
  ...
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }, // localhost:4200/users/:id/:name
  ] },
  { path: 'servers', component: ServersComponent, children: [
    { path: ':id', component: ServerComponent }, // localhost:4200/servers/:id
    { path: ':id/edit', component: EditServerComponent }, // localhost:4200/servers/:id/edit
  ] }
];
...
export class AppModule { }
```

> **Note**:
> `children` 陣列中的路由 `path` 記得把與父路由相同的路由前綴刪除，不然會出現 `Cannot match any routes` 錯誤！

## Using `<router-outlet>` in Template

- [`servers.component.html`](../../routing-app/src/app/servers/servers.component.html)

```html
    ...
    <!-- <button class="btn btn-primary" (clcik)="onReload()">Reload Page</button>
    <app-edit-server></app-edit-server>
    <hr> -->
    <!-- <app-server></app-server> -->
    <router-outlet></router-outlet>
    ...
```

- [`users.component.html`](../../routing-app/src/app/users/users.component.html)

```html
    ...
    <!-- <app-user></app-user> -->
    <router-outlet></router-outlet>
    ...
```