# 09. Passing Parameters to Routes

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```ts
...
import { UserComponent } from './users/user/user.component';
...
const appRoutes: Routes = [
  ...
  { path: 'users/:id', component: UserComponent }, // localhost:4200/users/:id
  ...
];
...
export class AppModule { }
```

如此一來我們就可以通過傳入 `id` 參數，例如 [`localhost:4200/users/1`](http://localhost:4200/users/1)、[`localhost:4200/users/2`](http://localhost:4200/users/2) 來訪問 `UserComponent` 了。