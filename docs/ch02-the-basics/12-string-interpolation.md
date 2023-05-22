# 10. String Interpolation

讓我們深入瞭解一下 String Interpolation 字串插值。

在這個 `server` component 中，我不想像這樣在 HTML 程式碼中輸出。

- [`server.component.html`](../../my-first-app/src/app/server/server.component.html)

```html
<p>The Server Component</p>
```

我不想在這裡硬編碼輸出。

這可能是現實的，我們的 `server` component 包含關於特定伺服器的信息。

所以，在 [`server.component.html`](../../my-first-app/src/app/server/server.component.html) 檔案中，我們想要輸出「伺服器 ID」，然後是「伺服器狀態」像是「offline」，所以，我們這裡有兩個動態欄位：

```
Server with ID ___ is ___.
```

現在，從 TypeScript 程式碼中派生它們是有意義的。

在真實的應用程式中，可能是從您對某個後端的 http 請求中派生的，或者是某些計算。

現在，我將先在 [`server.component.ts`](../../my-first-app/src/app/server/server.component.ts) 檔案中將它們寫死：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';
}
```

1. 我們有一個 "`serverId`" 並給它賦值為 `10` 。
2. 還有一個 "`serverStatus`" 它是一個字串 `offline` 。

現在，我想在模板中輸出這兩個屬性。

為了建立這種關聯，我們需要更新資料綁定。

這完全是關於您的 TypeScript 程式碼和模板之間的通信。

所以，字串插值是一個典型的使用案例，或這個任務的典型解決方案。

在佔位符的位置，我使用了雙大括號 `{{ ... }}` 。

這是字串插值的語法。

在這些雙大括號之間，您現在可以編寫一個 TypeScript 表達式。

所以，最簡單的表達式就是

簡單地引用一個屬性，比如 "`serverId`"：

- [`server.component.html`](../../my-first-app/src/app/server/server.component.html)

```html
<p>Server with ID {{ serverId }} is {{ serverStatus }}.</p>
```

這是一個常見的用例，您只在此處輸出屬性，或者屬性的值。

然而，這不是唯一的用例。

例如，這裡開頭的 `Server` ，您也可以簡單地在其中硬編碼一個字串：

- [`server.component.html`](../../my-first-app/src/app/server/server.component.html)

```html
<p>{{ 'Server' }} with ID {{ serverId }} is {{ serverStatus }}.</p>
```

字串插值語法的唯一條件，就是填入任何可以在最終解析為字串的表達式。

所以，不管您在大括號之間放了什麼，最終它都必須返回一個字串。 您也可以在這裡調用一個返回字串的方法。

唯一的其他限制是您不能在這裡編寫多行表達式。

您不能在這裡添加 "`if`" 或 "`for`" 控制結構。

不過，您可以使用三元運算式。

這就是您可以做的。

最後，我們也替換最後一個佔位符。

在這裡，我再次只是引用一個屬性，即 "`serverStatus`" 。

現在，這就是字串插值的用法，您可以看到我們有一個表達式，它本身就是一個字串，然後還有兩個其他的表達式，它們只是指向屬性。

而且，您也可以在這裡調用一個方法，它返回一個字串。

現在有趣的是， "`serverId`" 不是一個字串，而是一個數字。

而且，我剛剛說過，字串插值最終必須解析為一個字串，必須得到一個字串。

所以，讓我們看看這是否有效。

如果我們保存這個並且仍在運行 `ng serve` ，讓我們也將 "`app-server`" 

改回 "`app-servers`" 以使其再次運作。

我們看到確實看到 `Server with ID 10 is offline`。

我們看到它出現兩次，因為我們重複了這個 component 兩次，每個 component 當然都有相同的內容，但我們看到字串插值正在工作，特別是對於我們的數字也是有效的。

這運作得很好，因為一個數字可以輕易轉換為一個字串。

所以是的，最終您必須得到一個字串，或者一些可以轉換為字串的東西，才能正確無誤。

這就是您如何使用字串插值。

現在，為了真正完成這個例子，讓我們假設伺服器狀態是以某種方式在一個 `getServerStatus()` 方法中返回的：

- [`server.component.ts`](../../my-first-app/src/app/server/server.component.ts)

```ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';

  getServerStatus() {
    return this.serverStatus;
  }
}
```

這是您在 TypeScript 中定義方法的方式。

所以，您可能會從其他語言中注意到這種方法定義方式。

在這裡，我們只是 "`return this.serverStatus`" 。

所以，我們返回這個屬性。

當然，我們也可以直接訪問它，就像我們已經做過的那樣，但只是為了演示您可以調用一個方法。

- [`server.component.html`](../../my-first-app/src/app/server/server.component.html)

```html
<p>{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}.</p>
```

`getServerStatus()` 當然會導致相同的輸出，因為這個方法所做的只是在最後為我們返回一個字串，或者一些可以轉換為字串的東西。

這就是字串插值的運作方式。
