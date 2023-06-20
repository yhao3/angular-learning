# 25. Implementing Edit Server Component Update Button

在講解 `canReactivate` 之前，我們先實作 `servers/{id}/edit` 這個 `edit-server` 元件中點擊 `Update Server` 後返回 `servers/{id}` 列表頁面的功能，並且維護一個 `changeSaved` 狀態，當按下儲存按鈕時將其設為 `true` ：

- [`edit-server.component.ts`](../../routing-app/src/app/servers/edit-server/edit-server.component.ts)

```ts
...
import { ActivatedRoute, Router } from '@angular/router';

...
export class EditServerComponent implements OnInit {
  ...
  changeSaved = false;                                         // (1)

  constructor(...
              private router: Router) { }                      // (3)
  ...
  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;                                   // (2)
    this.router.navigate(['../'], {relativeTo: this.route});   // (4)
  }

}
```

> 1. Add a `changeSaved` property and initialize it to `false`.
> 2. Set `changeSaved` to `true` when the `onUpdateServer()` method is called.
> 3. Inject the `Router` into the `EditServerComponent`.
> 4. Navigate to the parent route (`servers/{id}`) when the `onUpdateServer()` method is called.