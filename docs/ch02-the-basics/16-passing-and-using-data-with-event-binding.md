# 16. Passing and Using Data with Event Binding

在上一堂課中，我們學習了事件綁定。

現在，在著重介紹「雙向綁定」之前，還有一件關於「事件綁定」你需要知道的重要事情。

假設在這個按鈕之前，我們還有一個標籤 "伺服器名稱"，更重要的是，我們有一個輸入框，我們給 `<input>` 標籤一個引導類別 "`form-control`"：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<label>Server name</label>
<input 
  type="text" 
  class="form-control">
<button
  class="btn btn-primary"
  [disabled]="!allowNewServer"
  (click)="onCreateServer()">Add Server</button>
  ...
```

在這裡，我想讓使用者輸入要建立的伺服器名稱。

因此，我們可以監聽 "`input`" 事件：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<label>Server name</label>
<input
  type="text"
  class="form-control"
  (input)="___">
  ...
```

這是由輸入框元素提供的一個常見的 DOM 事件，當使用者輸入文字時就會觸發。

在這裡，我們可以執行 "`onUpdateServerName()`" 方法，因為它會在每次按鍵按下時觸發：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<label>Server name</label>
<input
  type="text"
  class="form-control"
  (input)="onUpdateServerName()">
  ...
```

接著我們到 [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts) 中實作這個方法：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  onUpdateServerName( ... ) { ... }
}
```

現在，我想要輸出使用者目前輸入的內容，我們可以透過在 [servers.component.html](../../my-first-app/src/app/servers/servers.component.html) 中傳遞 "`$event`" 參數到 `onUpdateServerName()` 方法中來實作：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<label>Server name</label>
<input
  type="text"
  class="form-control"
  (input)="onUpdateServerName($event)">
  ...
```

"`$event`" 是一個非常重要的「保留變數名稱」，當在模板中使用事件綁定時可以使用這個名稱來存取事件資料。

因此，在這對雙引號之間，"`$event`" 將單純地成為該事件所傳遞的資料。

"`input`" 和 "`click`" 是 DOM 預設提供的事件，你可以說它們都會提供一些資料。

點擊事件會提供一個物件，例如其中包含我們點擊的座標。

而 "`input`" 事件也會提供一些資料，關於該事件的一些相關訊息。

現在，我們可以透過將 "`$event`" 作為參數傳遞到我們要呼叫的 `onUpdateServerName()` 方法中，或者在執行的程式碼中的雙引號之間使用 "`$event`" 來捕獲這些資料。

> **Note**: 
> 請記住，"`$event`" 是一個需要注意的保留字，可以讓我們存取事件資料。

現在，我們將它傳遞給 "`onUpdateServerName()`"。

在這裡，我們知道我們將收到這個事件，目前的型別是 "`any`"。

現在，讓我們簡單地將它輸出到控制台，這樣我們可以在這個偵錯記錄中看到它：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  onUpdateServerName(event: any) {
    console.log(event);
  }
}
```

開啟瀏覽器訪問 `localhost:4200`，現在在輸入框輸入 `test...` 文字，注意右邊的控制台。

有幾個輸出被寫入 console，如果我們看一下這個事件，我們會得到一些資訊：

- `InputEvent` object

```javascript
InputEvent {isTrusted: true, data: 'x', isComposing: false, inputType: 'insertText', dataTransfer: null, …}
```

例如， `target` 。

`target` 簡單來說就是該事件發生的 HTML 元素。

在這裡，由於這是一個輸入框元素，如果我們向下滾動，我們也可以看到 "`value`" key 的值為 "`test`"，這就是使用者輸入的內容：

```javascript
InputEvent {
    …, 
    target: input.form-control
        ...
        value: 'test...'
        ...
}
```

現在，在我們的 [servers.component.ts](../../my-first-app/src/app/servers/servers.component.ts) 中，我們可以設定一個 "`serverName`" 屬性，預設為空字串。

然後，在 "`onUpdateServerName`" 中，我們可以將它設定為 `this.serverName`：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  serverName = '';
  ...
  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }
}
```

但此時 IDE 可能會出現警告，因為在 TypeScript 中，我們無法明確地告訴它 `event.target` 的型別，所以我們需要在它前面加上 `HTMLInputElement` 這個型別：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  serverName = '';
  ...
  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

這只是為了告訴 TypeScript 我們知道該事件的 HTML 元素類型將是 `HTMLInputElement`。

我們使用 `< >` 語法進行顯式地轉換。

因此，我們將這個值指派給我們的 "`serverName`"。

現在，我們可以在 HTML 檔案中進行輸出，我們可以使用字串插值將伺服器名稱輸出到輸入框下方：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<label>Server name</label>
<input
  type="text"
  class="form-control"
  (input)="onUpdateServerName($event)">
<p>{{ serverName }}</p>
...
```

大功告成！

這就是你可以使用 "`$event`" 物件來獲取事件資料的方法。

接著，我們繼續進入「雙向資料綁定」，以完成目前這個範例應用程式剩下的部分。