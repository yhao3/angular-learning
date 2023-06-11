# 08. Using Relative Paths in Programmatic Navigation

## Add a Reload Button in Servers Page

- [`servers.component.html`](../../routing-app/src/app/servers/servers.component.html)

```html
    ...
    <button class="btn btn-primary" (clcik)="onReload()">Reload Page</button>
    ...
```

## Use Absolute Path in Programmatic Navigation

- [`servers.component.ts`](../../routing-app/src/app/servers/servers.component.ts)

```ts
...
import { Router } from '@angular/router';

...
export class ServersComponent implements OnInit {
  ...
  constructor(private serversService: ServersService,
              private router: Router) { }
  ...
  onReload() {
    this.router.navigate(['/servers']);
  }
}
```

如果我們這樣做，我們可以嘗試切換到 `/servers` 頁面並點擊 ` Reload Page ` 按鈕。 我們會發現什麼都不會發生，我們也不會得到錯誤，因為我們已經在這個頁面上。

但從技術上講，它仍然重新加載了頁面，但請記住它**從未發送過請求**！

## Use Relative Path in Programmatic Navigation

而如果我們使用相對路徑，例如我們將開頭的 `/` 移除：

- [`servers.component.ts`](../../routing-app/src/app/servers/servers.component.ts)

```ts
...
import { Router } from '@angular/router';
...
export class ServersComponent implements OnInit {
  ...
  constructor(private serversService: ServersService,
              private router: Router) { }
  ...
  onReload() {
    this.router.navigate(['servers']);
  }
}
```

此時我們仍然不會得到錯誤，但是你可能會覺得很奇怪，為何之前使用 `routerLink` 時會因為沒有註冊 `/servers/servers` 而出錯，但是這裡卻沒有問題？

那是因為 `routerLink` 會知道當前位置是什麼（根據元件或模板），但是 `navigate()` 方法並不會這麼做！！

因此為了告訴 Angular 我們的當前位置，我們還必須向 `navigate()` 方法傳遞第 2 個參數，它是一個 JavaScript 物件。

其中的 `relativeTo` 屬性，我們可以注入一個 `ActivatedRoute` 服務，它代表了我們當前活躍的路徑：

- [`servers.component.ts`](../../routing-app/src/app/servers/servers.component.ts)

```ts
...
import { ActivatedRoute, Router } from '@angular/router';
...
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }
  ...
  onReload() {
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
```

如此一來，我們就發生了跟之前一樣的錯誤，因為我們沒有註冊 `/servers/servers` 這個路由。