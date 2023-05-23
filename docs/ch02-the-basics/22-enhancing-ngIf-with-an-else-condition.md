# 22. Enhancing ngIf with an else condition

在上一堂課中，我們瞭解了基本的 NG if 語法，這是你大部分時間都會使用的語法。

然而，還有一種替代方式。

有時你不只有 if 條件，還有 else 條件。

因此，在這裡我們可能想要說伺服器已建立

伺服器名稱是一個使用 NG if 的東西。

但我們也可以新增一個 else 區塊，表示「沒有建立伺服器」。

我們可以透過在這個元素上加入一個「本地參考」來實現這一點。

我們將在理解元件和資料繫結章節中深入探討「本地參考」的內容。

就目前來說，讓我們將其視為一個標記。

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
...
<ng-template #noServer>
  <p>No server was created!</p>
</ng-template>
```

所以我將它命名為 "`noServer`" 。

接著我們需要將 tag 更改為 `<ng-template>` 。

那是一個元件，一個 Angular 內建提供的指示器。

你可以用它來標記 dom 中的位置。

所以現在基本上是你想要輸出的文字。

現在有了 NG template 和帶有「本地參考」標記的標記

我們標記了模板中要有條件地顯示的特定位置。

現在要有條件地顯示它，我們只需將 NG if 改進，同時添加 else 和 "`noServer`"：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
...
<p *ngIf="serverCreated; else noServer">
  Server was created, server name is {{ serverName }}</p>
<ng-template #noServer>
  <p>No server was created!</p>
</ng-template>
```

這就是我們需要的全部語法。

如果我們保存這個，你會看到「沒有建立伺服器」，並且，只要我點擊這裡，它就會被替換為「伺服器已建立」。

所以這就是 NG if else，一個很好的小補充

在你有 else 條件的情況下使用。

當然，另一個選擇總是可以簡單地使用反向檢查的 NG if，所以會變成 "`!serverCreated`"：

```html
<p *ngIf="!serverCreated">
  No server was created!</p>
```

但這裡是另一個不錯的選擇。
