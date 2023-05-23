# 18. Combining all forms of databinding

所以現在我們已經涵蓋了所有 4 種資料綁定的形式，讓我們完成我們示範的應用程式吧。

我們已經得到了伺服器名稱，而且由於這裡使用了雙向資料綁定，在我們輸入時，它會即時更新。

我會將 [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html) 檔案中的 `<p>{{ serverName }}</p>` 伺服器名稱註解掉，因為我們不再需要它。

相反地，我希望在我們點擊這個「新增伺服器」按鈕後顯示伺服器名稱。

所以一旦我們創建了伺服器，我們不僅應該說「伺服器已創建！」，而是像這樣：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
export class ServersComponent {
  ...
  serverName = 'Test server';
  ...
  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }
  ...
}
```

所以，通過這樣做，我們已經相當深入地了解了 Angular 的基礎知識。

我們使用了 component ，我們大致知道它們是如何工作的。

我們知道如何從 TypeScript 程式碼與我們的模板進行通信，並且在另一個方向上也是如此。

現在還有一個基本功能我們必須介紹，這樣才能真正能夠建立一些小應用程式，然後我們才能深入研究各個構建塊。

所以在進一步瞭解指令之前，讓我們先來看看這個下一個功能，但在那之前，我們先練習資料綁定。