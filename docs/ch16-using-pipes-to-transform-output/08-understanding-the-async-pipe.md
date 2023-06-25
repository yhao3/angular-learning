# 08. Understanding the `async` Pipe

## Understanding the `async` Pipe

Async Pipe 在 Angular 的 Pipes 中是獨一無二的，它可以簡化處理非同步資料的方式。 為了示範它的功能，讓我們引入一個新的屬性叫做 `appStatus` ：

- [`app.component.ts`](../../pipes-app/src/app/app.component.ts)

```diff
...
export class AppComponent {

+ appStatus = new Promise((resolve, reject) => {
+   setTimeout(() => {
+     resolve('stable');
+   }, 2000);
+ });
  ...
}
```

為了驗證 `appStatus` 的值，我們可以使用字串插值將它輸出出來：

- [`app.component.html`](../../pipes-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus">
      <hr>
      <button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
      <hr>
+     <h2>App Status: {{ appStatus }}</h2>
+     <hr>
      ...
    </div>
  </div>
</div>
```

然而，如果我們現在嘗試這樣做，你會看到輸出為 `App Status: [object Promise]`。 這是正常的，因為 `appStatus` 目前是一個 `Promise` 物件，而 Angular 不會監視物件的轉換，它將這個 `Promise` 視為一個已完成的物件，所以輸出為 `[object Promise]`。

## Leveraging the Async Pipe

為了解決這個問題並正確處理非同步資料，我們可以利用內建的 `async` Pipe。 這個 Pipe 簡化了資料的轉換並確保所需的輸出顯示出來。 我們知道這個 `Promise` 在 2 秒後會解析成字串，我們想要輸出這個字串。

要使用 `async` Pipe，我們在字串插值後面加上管道符號（`|`），然後加上關鍵字 `async`。 `async` Pipe 會自動處理轉換：

- [`app.component.html`](../../pipes-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus">
      <hr>
      <button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
      <hr>
-     <h2>App Status: {{ appStatus }}</h2>
+     <h2>App Status: {{ appStatus | async }}</h2>
      <hr>
      ...
    </div>
  </div>
</div>
```

讓我們重新載入應用程式並觀察變化。一開始，`appStatus` 並沒有顯示任何內容，但兩秒後，出現了「穩定」的值。這種行為是由 `async` Pipe 實現的，它識別出 `appStatus` 是一個 Promise，並自動處理訂閱，在 Promise 解析後更新視圖。

## Conclusion

藉著介紹了 `async` Pipe，我們結束了關於 Angular Pipes 的討論。 你現在應該對於使用 Pipes、建立自訂的 Pipes，以及使用 `async` Pipe 處理非同步資料感到自在了。

請記住，Pipes 是增強你的 Angular 應用程式功能和呈現的強大工具。 熟練使用它們將大大有助於你的開發流程。