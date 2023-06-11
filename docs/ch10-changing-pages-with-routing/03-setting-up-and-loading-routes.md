# 03. Setting Up and Loading Routes

## Configuring Routes in the App Module

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```typescript
...
import { Routes, RouterModule } from '@angular/router';
...

const appRoutes: Routes = [                                                // (1)
  { path: '', component: HomeComponent }, // localhost:4200
  { path: 'users', component: UsersComponent }, // localhost:4200/users
  { path: 'servers', component: ServersComponent }, // localhost:4200/servers
];

@NgModule({
  ...
  imports: [
    ...
    RouterModule.forRoot(appRoutes)                                        // (2)
  ],
  ...
})
export class AppModule { }
```

> 1. `appRoutes` is an array of routes. Each route is an object with two properties: `path` and `component`.
> 2. `RouterModule.forRoot(appRoutes)` tells Angular to register the routes defined in `appRoutes` array.

## Adding `<router-outlet>` to the App Template

- [`app.component.html`](../../routing-app/src/app/app.component.html)

```html
  ...
  <!-- <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <app-home></app-home>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <app-users></app-users>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <app-servers></app-servers>
    </div>
  </div> -->
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
  ...
```

## Result

- Navigate to [`localhost:4200/`](http://localhost:4200/) to see the `HomeComponent`
- Navigate to [`localhost:4200/users`](http://localhost:4200/users) to see the `UsersComponent`
- Navigate to [`localhost:4200/servers`](http://localhost:4200/servers) to see the `ServersComponent`.