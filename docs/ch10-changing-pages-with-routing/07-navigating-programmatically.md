# 07. Navigating Programmatically

如果我們想以程式方式加載一個路由呢？

實務上可能會有這樣的需求，例如要導向的 URL 可能需要經過複雜的計算，或是需要從伺服器取得資料後才能決定。

而這裡我們透過簡單的範例來示範如何以程式方式導向一個路由。

假設在首頁，我們想要點擊一個 ` Load Servers ` 按鈕，然後導航到 `Servers` 頁面。 我們可以在 `home.component.html` 中加入一個按鈕，並且綁定一個 `click` 事件，並且呼叫一個 `onLoadServers()` 方法：

- [`home.component.html`](../../routing-app/src/app/home/home.component.html)

```html
...
<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button>
```

至於 `onLoadServers()` 方法，我們可以使用 `Router` 服務的 `navigate()` 方法來實作：

- [`home.component.ts`](../../routing-app/src/app/home/home.component.ts)

```ts
...
import { Router } from '@angular/router';         // (1)

...
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }         // (2)
  ...
  onLoadServers() {
    // maybe some complex calculation
    this.router.navigate(['/servers']);           // (3)
  }
}
```

> 1. Import `Router` from `@angular/router`
> 2. Inject `Router` into the constructor
> 3. Call `this.router.navigate()` to navigate to the `/servers`