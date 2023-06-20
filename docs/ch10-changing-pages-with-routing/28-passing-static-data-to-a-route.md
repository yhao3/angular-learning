# 28. Passing Static Data to a Route

## Creating Error Page Component

```shell
ng g c error-page --skip-tests
```

接著我們在 [`error-page.component.ts`](../../routing-app/src/app/error-page/error-page.component.ts) 中加入一個 `errorMessage` 屬性：

- [`error-page.component.ts`](../../routing-app/src/app/error-page/error-page.component.ts)

```ts
...
export class ErrorPageComponent implements OnInit {

+ errorMessage: string;
  ...
}
```

並 [`error-page.component.html`](../../routing-app/src/app/error-page/error-page.component.html) 中綁定該屬性：

- [`error-page.component.html`](../../routing-app/src/app/error-page/error-page.component.html)

```html
<h3>{{ errorMessage }}</h3>
```

## Registering `not-found` Route with Error Page Component

接著我們在 [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts) 中將 `not-found` 路由綁定的元件改為 `ErrorPageComponent` ：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
- import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
...
+ import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  ...
- { path: 'not-found', component: PageNotFoundComponent },
+ { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: '/not-found' }
];

...
export class AppRoutingModule { }
```

## Passing Static Data to a Route

接著我們在 [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts) 中將 `not-found` 路由的 `data` 屬性設定為一個 `{message: 'Page not found! (New)'}` 物件：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
const appRoutes: Routes = [
  ...
- { path: 'not-found', component: ErrorPageComponent },
+ { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found! (New)'} },
  { path: '**', redirectTo: '/not-found' }
];

...
export class AppRoutingModule { }
```

如此一來我們就可以在 `ErrorPageComponent` 元件中注入 `ActivatedRoute` 服務來訂閱 `data` 屬性，藉此為 `errorMessage` 屬性賦值：

- [`error-page.component.ts`](../../routing-app/src/app/error-page/error-page.component.ts)

```diff
...
+ import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage: string;

- constructor() { }
+ constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
+   this.route.data.subscribe(
+     (data: {message: string}) => {
+       this.errorMessage = data.message;
+     }
+   );
  }

}
```
