# 13. Property Binding

在開始之前，我們先將 [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts) 中 inline template 改回 external template：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
@Component({
  ...
  templateUrl: './servers.component.html',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  ...
})
export class ServersComponent {

}
```

現在我們來看一下屬性綁定。 首先，有一個重要的資訊，有很多情況下您可以使用屬性綁定或字串插值，我一會兒會展示這是什麼意思。

讓我們轉到我們的 [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html) ，我們在這裡管理所有伺服器。 我希望允許使用者新增新的伺服器，至少很快我想這樣做。所以我們需要一個按鈕，上面寫著「Add server」，我為這個按鈕添加一些 CSS 類別，如 `button` 和 `button primary` ，讓這個按鈕看起來漂亮。 這只是使用普通的 Bootstrap CSS 類別，與 Angular 無關。

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<button class="btn btn-primary">Add Server</button>
```

現在，這個按鈕沒有任何意義，因為它什麼都不會做。 我們還沒有學會如何對按鈕點擊做出反應。

因此我要在我的 TypeScript 程式碼中新增一個屬性，我將它命名為 "`allowNewServer`" ，並將其設置為 `false` 。所以現在這個屬性保存了一個 boolean 值，`true` 或 `false` ：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
...
export class ServersComponent {
  allowNewServer = false;

}
```

我設置為 `false` ，因為我不想允許使用者創建新的伺服器。 您可以想像這個屬性可能以某種方式動態派生出來。我們很快會使用一些動態資料。

所以在這個 HTML 檔案中，我現在想要禁用這個按鈕。 您可能知道，可以使用 `disabled` 屬性進行禁用，就像這樣：

```html
<button
  class="btn btn-primary"
  disabled>Add Server</button>
  ...
```

但這是寫死在 HTML 中的。 現在也許 `allowNewServer` 這段程式碼會有所變動，也許它並不一直設為 `false` ，我們必須把它變成動態的。

我可以展示這一點，但現在在構造函式中，這只是一個在此元件由 Angular 創建時執行的方法。 我在這裡呼叫了一個普通的 JavaScript `setTimeout()` function。在這裡，我定義了在多長時間或多少毫秒後應該發生某事。

所以在 `2000` 毫秒後（2 秒），我想執行一個函式。 在這裡，我使用了 ES6 的箭頭函式語法。 這個語法可能看起來有點奇怪，它幾乎和 function 一樣，只是在處理 `this` 關鍵字時有些不同：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  allowNewServer = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
}
```

但最後，在這裡你傳遞了參數，在這裡你有函式的內容。 更重要的是，在這裡我可以設置 `allowNewServer` 的值。 現在在一般的語法中這是行不通的，因為這樣會引用其他東西，可以將其設為 `true` 。

所以 2 秒後，這將切換為 `true` 。由於我們寫死了這一點，當然這並不會影響我們的按鈕。它保持禁用狀態。

所以我想將它綁定到 `allowNewServer` 。 現在為了使這個禁用功能動態化，我們可以通過將其置於方括號 `[ ]` 中來進行綁定。 方括號 `[ ]` 表示我們使用「屬性綁定」，我們希望動態綁定某些屬性，例如 HTML 的 `disabled` 屬性。

最終，一般的 HTML 只是在底層的 DOM 元素上設置特定的屬性。 您可能知道，您使用的每個 HTML 元素都會被瀏覽器解析，並轉換為文檔物件模型上的元素。 這與 Angular 完全無關，因此在這個 DOM 中有一個元素。

這個元素有一些屬性，其中很多都不能通過 HTML 元素的屬性來設置。其中一個屬性就是 `disabled` 屬性，您可以通過 `disabled` 屬性來設置它。 但在這裡，我們不再使用 `disabled` 屬性。 通過方括號，我們直接將其綁定到這個 DOM 的 `disabled` 屬性。

現在我們可以將其設置為一個對於這個屬性解析為布林值的表達式，所以現在我可以簡單地傳遞 `allowNewServer` ，並加上驚嘆號，確保只有在這是 `false` 的時候才禁用這個：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<button
  class="btn btn-primary"
  [disabled]="!allowNewServer">Add Server</button>
  ...
```

現在，如果我們回到應用程式，您會看到它是禁用的，但是兩秒後，讓我重新載入這個，它變成啟用狀態。

因為現在我們將這個禁用屬性綁定到我們自己的 TypeScript 屬性。 方便的是，這就是 Angular 的功能所在，它使您可以輕鬆地與 DOM 進行交互，在運行時更改某些內容，就像我們在這裡做的一樣。 這就是屬性綁定的運作方式。

現在，正如我所提到的，在除了綁定 HTML 元素屬性之外，您還可以綁定到指令的屬性，這是我們還沒有學到的東西，以及您自己的組件的屬性。 稍後我也會向您展示。這就是屬性綁定，現在我們來看一下在哪些情況下可以使用字串插值而不是屬性綁定。
