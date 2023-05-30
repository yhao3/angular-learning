# 11. Projecting Content into Components with ng-content

目前我們學會了如何傳遞資料、如何取得我們 DOM 中的元素、如何使用本地引用。

因此我們的應用程式現在更具動態性。

我們擁有更多工具來在應用程式中的不同 component 之間進行交互。

現在還有另一種方式可以傳遞資料。

這是我們在 `server-element` 元件中要學習的最後一種方式。

首先看到 [`server-element.component.html`](../../cmp-databinding//src/app/server-element/server-element.component.html) 中有一些程式碼：

- [`server-element.component.html`](../../cmp-databinding//src/app/server-element/server-element.component.html)

```html
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

但有時候你可能希望將其中這種複雜的 HTML 程式碼從「外部」傳遞到 component 中：

```html
...
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
...
```

所以想像一下，你不想在這裡設置它：

```html
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">

  </div>
</div>
```

相反，你可以將其剪下貼到 [`app.component.html`](../../cmp-databinding/src/app/app.component.html) 中 `app-server-element` component 的開始和結束標籤之間：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
      ...
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement">
        <p>
          <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
          <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
        </p>
      </app-server-element>
      ...
```

然後我們只需要將 `element` 替換為 `serverElement` ：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
      ...
      <app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement">
        <p>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
      </app-server-element>
      ...
```

我們應該期望它能正常工作，對吧？ 但如果我們保存並重新加載，然後新增一個新的服務器，我們不會得到錯誤。

但是內容也不會顯示，這是預設行為。

你在自己 component 的開始和結束標籤之間放置的任何內容預設情況下都會丟失。

它將從 DOM 中被刪除。

Angular 不會處理它，但你可以改變這個預設行為！

有一個特殊的 NG content 指令，儘管它看起來像一個 component `<ng-content></ng-content>`，但它並沒有自己的 HTML 模板。

你可以在 [`server-element.component.html`](../../cmp-databinding//src/app/server-element/server-element.component.html) 模板想要渲染內容的地方使用它：

- [`server-element.component.html`](../../cmp-databinding//src/app/server-element/server-element.component.html)

```html
<div
  class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
```

強調一下，NG content 是一個指令，可以在 Angular 的元件中使用。它充當一個鉤子，用於將位於開始和結束標籤之間的內容插入到元件中。

通過這個簡單的修改，保存並重新載入後，你應該會看到一個不同的效果。當我們添加了 NG content 指令並點擊添加服務器時，你會發現內容已經恢復了。

儘管看起來與之前相同，但實際上已經發生了完全不同的事情。

現在，我們通過 NG content 鉤子將內容添加到元件中。

我們將它放置在開始和結束標籤之間，這樣它就會被投射到元件中，也就是服務器元件中。

這是一個非常好用的功能，特別是在構建可重複使用的小元件時。例如，假設你正在建立一個選項卡元件，每個選項卡都需要不同來源的內容，而你不想通過屬性綁定來傳遞內容，這時 NG content 就是一個很好的替代方案。

然而，如果內容是複雜的 HTML，屬性綁定可能不是最佳解決方案，因為 Angular 會轉義 HTML 內容，以防止跨站腳本攻擊。

當然，你可以找到繞過這一點的方法，但事實上，NG content 是一個非常方便的工具，以你想要的方式顯示內容。