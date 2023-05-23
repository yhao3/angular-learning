# 21. Using ngIf to output data conditionally

目前為止，除了作為指示器的元件（components），我們尚未使用任何指示器（directives）。

現在假設我們想要做的一件事是，我們只想在畫面上顯示「伺服器已建立」的文字。

不需要顯示「沒有建立伺服器（No Server was created!）」的文字。

所以，如果我們能「有條件地」顯示這個訊息就好了。

為此，我們需要一些幫助。

我們可以使用 Angular 內建的 NG if 指示器。

準確地說，它的工作方式就像是 if 陳述句！

我們先將 `<p>{{ serverName }}</p>` 與 `<p>{{ serverCreationStatus }}</p>` 程式碼註解掉：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
...
<!-- <p>{{ serverName }}</p> -->
...
<!-- <p>{{ serverCreationStatus }}</p> -->
...
```

但現在我會新增一行程式碼，我只是簡單地顯示伺服器已建立：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
...
<p>Server was created, server name is {{ serverName }}</p>
...
```

現在有了這個，它仍然可以運作。

問題是現在每次我們改變這個伺服器名稱時都會看到文字「隨著每個按鍵觸發」而改變，這不是我想要的。

相反地，我希望一按下「新增伺服器」按鈕時才立即輸出文字。

所以我可以在 `<p>` 標籤中加入一個指示器：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
...
<p *ngIf="">Server was created, server name is {{ serverName }}</p>
...
```

而且正如我所說，通常指示器是透過使用「屬性選擇器」來加入的。

而幾乎所有內建的指示器都使用 NG if。

而 NG if 是通過添加一個星號 `*` 來加入的。

這很重要，NG if 星號是必需的，因為 NG if 是一個結構指示器！

這意味著它會改變我們 DOM 的結構。

它要麼添加這個元素，要麼不添加。

這只是 Angular 的一些額外資訊。

所以在 NG if 後方的雙引號中，我們可以添加一些「條件」。

對於 NG if，這個「條件」可以是任何表達式，條件會返回 `true` 或 `false` ，決定是否應該添加這個元素或不添加。

所以在 TypeScript 程式碼中，我們可以添加一個 `serverCreated` 屬性，將其初始值設置為 `false` ，並在按下按鈕時將其設置為 `true` ：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  serverCreated = false;
  ...
  onCreateServer() {
    this.serverCreated = true;
    ...
  }
}
```

現在有了這個，我們可以回到我們的 html 模板

並將 NG if 綁定到 `serverCreated` 屬性上：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
...
<p *ngIf="serverCreated">Server was created, server name is {{ serverName }}</p>
...
```

同樣地，這也可以呼叫一個返回 `true` 或 `false` 的方法

現在，如果我們儲存更動，並重新訪問 `localhost:4200`，你會看到這裡沒有文字。

但如果我將它命名為點擊「新增」按鈕。

現在文字會被添加到畫面。

有趣的是，如果我重新載入應用程式，如果我點擊這個按鈕，一個新的 DOM 元素就會被加入這裡。

但重要的是，它真的被添加或從 DOM 中移除。

這就是 NG if。

## Summary

- NG if 的開頭是一個星號 `*`

- NG if 是一個結構指示器

- NG if 會改變 DOM 的結構