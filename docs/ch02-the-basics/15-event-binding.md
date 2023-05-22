# 15. Event Binding

在上一堂課中，我們學到了很多關於如何使用屬性綁定和字串插值在模板中輸出資料的知識。

現在，讓我們來處理 Event 事件。

例如，我們在 [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html) 有一個按鈕，在 2 秒後這個按鈕會被啟用。

因此，如果我們能在按下按鈕時做些什麼就很好了。

現在我將展示給你如何實際地添加一個新的伺服器，如何在這裡為我們的伺服器選擇器或伺服器 component 添加一個新的複製品。

目前，我想要做的是輸出一些內容。

我會刪除上一小節示範的這段 `<p [innerText]="allowNewServer"></p>` 程式碼。

而在這裡，我想要輸出一個屬性的值。

我將在 [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts) 中添加一個 `serverCreationStatus` 屬性。

並將其預設值設置為 "No server was created!"。

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  serverCreationStatus = 'No server was created!';
  ...
}
```

現在，這個屬性可以使用字串插值輸出：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<p>{{ serverCreationStatus }}</p>
```

而我剛剛告訴你我不想繼續只是單純輸出資料。

我們想要監聽事件。

所以我會在 [servers.component.ts](../../my-first-app/src/app/servers/servers.component.ts) 中添加一個 `onCreateServer` 方法。

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  onCreateServer() {
    this.serverCreationStatus = 'Server was created!';
  }
}
```

> **Note**: 
> 務必以 "`on`" 開頭，以明確表示這將在模板內部觸發。 雖然這並非強制規定，但這樣做會更容易理解是誰調用了這個方法。

基本上，使用者將會透過某些操作來調用這個方法。 這就是我想要用這種方式表示的含意。

而在這個方法內部，我將把 `serverCreationStatus` 設置為 `Server was created!`。

所缺少的一塊，當然，是呼叫這個方法。

現在，事件綁定就派上用場了。

我們想要監聽 [servers.component.html](../../my-first-app/src/app/servers/servers.component.html) 中的點擊按鈕事件。

通常情況下，你可以在 HTML 元素上使用 `onclick` 屬性，來執行一些 JavaScript 程式碼。

然而，我們在 Angular 中不會這樣使用。

在這裡，我們有一種語法，Angular 提供了事件綁定。

它使用 `( )` 圓括號，就像屬性綁定使用 `[ ]` 方括號一樣。

圓括號表示我們正在使用事件綁定。

在這裡，我們需要指定事件的名稱放在圓括號內。 例如：`click`。

你可以基本上綁定在該 HTML 屬性上提供的所有事件上。

如果你有 `onclick`、`onmouseenter`，你可以綁定到 `click` 和 `mouseenter`，省略掉開頭的 `on`。

所以我們綁定到了 `click` 事件上。

現在，在引號之間，我們放入希望在此事件發生時執行的程式碼。

通常情況下，你會在這裡呼叫一個方法（即 callback function）：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<button
  class="btn btn-primary"
  [disabled]="!allowNewServer"
  (click)="onCreateServer()">Add Server</button>
  ...
```

我們指向要執行的方法，也就是 `onCreateServer()`，並加上圓括號。

這個方法現在將在我們點擊按鈕時執行。

附帶一提，你不一定要在這裡執行一個方法。

你也可以直接在引號之間放入要執行的程式碼。

通常情況下，這並不是很好，因為如果發生某個事件時你想要執行更多程式碼，但如果你只是想將某個 boolean 屬性設置為 `true`，你當然可以在模板中這樣做。

不過，一般來說，你不應該在模板中放太多邏輯。

現在我們綁定了 `click` 事件，並在事件發生時執行 `onCreateServer` 方法。

這就是事件綁定的簡單運作方式。

使用 `( )` 圓括號，事件名稱放在圓括號中，然後在 `" "` 引號之間放入你希望在事件發生時執行的程式碼。