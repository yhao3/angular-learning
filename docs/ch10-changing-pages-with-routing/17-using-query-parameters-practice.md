# 17. Using Query Parameters - Practice

## Adding a Edit Server Button

- [`server.component.html`](../../routing-app/src/app/servers/server/server.component.html)

```html
...
<button class="btn btn-primary" (click)="onEdit()">Edit Server</button>
```

## Declaring the `onEdit()` Method

- [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts)

```ts
...
import { ActivatedRoute, Router } from '@angular/router';

...
export class ServerComponent implements OnInit {
  ...
  constructor(...
              private router: Router) { }
  ...
  onEdit() {
    // 1. Absolute path
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    // 2. Relative path
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
```

> **Note**:
> 回顧 [`08. Using Relative Paths in Programmatic Navigation`](./08-using-relative-paths-in-programmatic-navigation.md)，我們可以使用「絕對路徑」或「相對路徑」來導航到目標頁面。

## Adding some Bussiness Logic

接下來我們想要讓請求參數 `allowEdit` 能夠在 `servers/:id/edit` 頁面中被使用，我們可以在 `servers/:id/edit` 頁面中加入一些商業邏輯。

### Making the `allowEdit` Parameter Dynamically

在那之前，為了方便看出差異，我們先將 Server ID 為 `3` 的 `allowEdit` 值設為 `1` （可修改），其餘的 Server 的 `allowEdit` 設為 `0` （不可修改）：

- [`servers.component.html`](../../routing-app/src/app/servers/servers.component.html)

```html
      ...
      <a
        ...
        [queryParams]="{allowEdit: server.id === 3 ? '1' : '0'}"
        ...
```

### Using the `allowEdit` Query Parameter

- [`edit-server.component.ts`](../../routing-app/src/app/servers/edit-server/edit-server.component.ts)

```ts
...
export class EditServerComponent implements OnInit {
  ...
  allowEdit = false;                                    // (1)
  ...
  ngOnInit() {
    ...
    this.route.queryParams
      .subscribe(
        (queryParams) => {                              // (2)
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    ...
    const id = +this.route.snapshot.params['id'];       // (3)
    this.server = this.serversService.getServer(id);    // (4)
    ...
  }

}
```

> 1. Decalre a `allowEdit` property and set it to `false` by default.
> 2. Subscribe to the `queryParams` observable and set the `allowEdit` property to `true` if the `allowEdit` query parameter is `1`, otherwise set it to `false`
> 3. Get the `id` parameter from the URL (Remember that add `+` before `this.route.snapshot.params['id']` to convert string to a number)
> 4. Get the server by `id`

### Adding Not Allowed to Edit Message

- [`edit-server.component.html`](../../routing-app/src/app/servers/edit-server/edit-server.component.html)

```html
<h4 *ngIf="!allowEdit">You are not allowed to edit!</h4>
<div *ngIf="allowEdit">
  ...
</div>
```

## Troubleshooting

> **Warning**:
> 但目前有個問題是我們在 `servers/:id` 頁面中的 `allowEdit` 請求參數，一但進入 `servers/:id/edit` 頁面時，這個請求參數就會消失。 這導致目前 Server ID 為 `3` 的 `allowEdit` 值雖然在 `servers/3?allowEdit=1` 頁面被設為 `1` （可修改），但在 `servers/3/edit` 頁面中卻消失變成 `null` 導致它還是無法被修改。
> 關於這個問題我們會在下一節 [`18. Configuring the Handling of Query Parameters`](../18-configuring-the-handling-of-query-parameters.md) 來解決。
