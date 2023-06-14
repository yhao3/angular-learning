# 11. Fetching Route Parameters Reactively

我們來檢驗看看 [`user.component.ts`](../../routing-app/src/app/users/user/user.component.ts) 中使用的 `route.snapshot.params()` snapshot 是否有問題。

首先我們在 [`user.component.html`](../../routing-app/src/app/users/user/user.component.html) 中加入 `/users/10/Anna` 的超連結：

- [`user.component.html`](../../routing-app/src/app/users/user/user.component.html)

```html
...
<hr>
<a [routerLink]="['/users', 10, 'Anna']">Load Anna (10)</a>
```

我們先回到 `http://localhost:4200/users/1/max`，然後點擊這個 [`Load Anna (10)`](http://localhost:4200/users/10/Anna) 超連結。

當我們點擊這個超連結時，會發現雖然 URL 更新成 `http://localhost:4200/users/10/Anna` 了，但 `UserComponent` 並沒有更新！ 畫面仍然是原本 `/users/1/Max` 的資訊：

```
User with ID 1 loaded.
User name is max
```

但這其實不是 Bug，而是預設的行為。

因為我們「已經在 UserComponent 中了」，所以 Angular 會認為我們已經在這個元件中了，所以不會再重新實例化這個元件。 這可以使效能更好！

當然，你仍然希望能夠獲取更新的資料。

## What Problem does Snapshot Pose

在最初的初始化時使用 snapshot 是沒問題的，但是為了能夠對後續的變化做出反應，我們需要一個不同的方法。

`Router` 本身有一個 `params` 的屬性，該屬性被 `Observable` 包裹：

```ts
export declare class ActivatedRoute {
    ...
    /** An observable of the matrix parameters scoped to this route. */
    params: Observable<Params>;
    ...
}
```

> **Note**:
> `Observable` 是由某個第三方套件添加的功能，不是 Angular 所提供的，但在 Angular 中被廣泛使用，它讓你可以輕鬆處理非同步任務。

所以我們可以使用 `Observable` 提供的 `subscribe()` 方法來監聽 `Params` 物件的變化！

> **Note**:
> `Observable` 提供的 `subscribe()` 方法可以訂閱一些可能在未來發生的事件，然後在事件發生時執行一些程式碼，而不需要立即等待。

所以我們可以將 [`user.component.ts`](../../routing-app/src/app/users/user/user.component.ts) 改寫成：

- [`user.component.ts`](../../routing-app/src/app/users/user/user.component.ts)

```ts
...
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    this.route.params
      .subscribe(
        (params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

}
```

這樣就一切正常了！