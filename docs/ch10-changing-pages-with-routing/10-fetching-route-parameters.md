# 10. Fetching Route Parameters

- [`app.module.ts`](../../routing-app/src/app/app.module.ts)

```ts
...
const appRoutes: Routes = [
  ...
  { path: 'users/:id/:name', component: UserComponent }, // localhost:4200/users/:id/:name
  ...
];
...
export class AppModule { }
```

- [`user.component.ts`](../../routing-app/src/app/users/user/user.component.ts)

```ts
...
import { ActivatedRoute } from '@angular/router';

...
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
  }

}
```

> **Info**:
> The `ActivatedRoute` object we injected will give us access to the `id` passed in the URL => Selected User ID.


- [`user.component.html`](../../routing-app/src/app/users/user/user.component.html)

```html
<p>User with ID {{ user.id }} loaded.</p>
<p>User name is {{ user.name }}</p>
```

如此一來我們就可以通過傳入 `id` 與 `name` 參數，例如 [`localhost:4200/users/1/Max`](http://localhost:4200/users/1/Max)、[`localhost:4200/users/2/John`](http://localhost:4200/users/2/John) 來訪問 `UserComponent` 並顯示對應資訊了。