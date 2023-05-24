# 24. Outputing Lists with ngFor

現在讓我們來看看目前最後一個內建指令。

雖然我們可以點擊「新增伺服器」按鈕，但事實上，我們並沒有將伺服器新增到這個清單中，對吧？

這個清單不會增長。

這個清單完全是靜態的。

我們可以使用 `ngFor` 指令來改變這一點。

讓我們來看看它是如何工作的。

在我們的伺服器元件 [`server.component.ts`](../../my-first-app/src/app/servers/servers.component.html) 中，我們目前是手動兩次添加 `app-server` 元件：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<app-server></app-server>
<app-server></app-server>
```

有個更好的方式是擁有一個伺服器的陣列以實現動態新增。

所以在這個伺服器元件的 TypeScript 檔案中，我會新增一個新的屬性 `servers` ，它是一個陣列：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  servers = ['Testserver 1', 'Testserver 2'];
  ...
}
```

因此當我們在這裡新增一個新的伺服器時，我希望實際上能夠存取這個伺服器的陣列並將新的伺服器加入其中：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  onCreateServer() {
    ...
    this.servers.push(this.serverName);
    ...
  }
  ...
}
```

現在我有了一個伺服器的陣列。

那如果我們可以根據陣列中的每個元素動態複製 `app-server` 元件，那就太好了。

我們可以在 `app-server` 元件上使用 `ngFor` ，ngFor 的基本語法如下：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<app-server *ngFor="let server of servers"></app-server>
```

我們使用 `let` 來定義一個臨時變數在迴圈內，任意給它一個名稱，例如 server，然後是 `of servers` 。

這裡的 `servers` 就是我們在 TypeScript 檔案中定義的屬性！

它將遍歷這個 `servers` 陣列屬性中的所有元素，並將每個個別的元素指派給這個動態的 `server` 變數。

所以這就像是，您可能從普通的 JavaScript 程式碼中熟悉的迴圈。

這個 `server` 變數現在可以在模板中使用，但老實說，在這裡我們並不真正需要它。

在下一個核心章節中，我們將學習如何將資料傳遞給我們自己的元件以在那裡輸出它。

所以目前我們不需要它。

但我們應該能夠看到一件事，如果我保存然後返回我們的應用程式，如果我添加更多的伺服器，你會看到我們的清單增長了！

當然，每個個別伺服器的內容仍然是靜態的，因為我們無法將伺服器名稱等資料傳遞給該元件。

這是我們將在下一個章節中學習的事情，所以讓我們在下一個章節中深入研究這個。