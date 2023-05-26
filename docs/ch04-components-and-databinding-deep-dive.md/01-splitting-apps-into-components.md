# 01. Spiltting Apps into Components

這就是你可以在這個章節中找到的專案，附檔在此。

它允許我們在這裡定義一個伺服器名稱，然後為該伺服器添加一些內容。

然後我們可以添加伺服器或藍圖。

如你所見，這兩者看起來相似，但伺服器是粗體和紅色的，或者有一些粗體和紅色的文字。

藍圖有一些斜體藍色的文字。

這就是差異所在。

現在，這個應用程式目前在同一個元件中運行，即 `app` 元件的模板 [`app.componenet.html`](../../cmp-databinding/src/app/app.component.html) 中。

程式碼很多，所以我們必須重構它。

我們可以將其拆分，因為將所有邏輯都放在這個元件中不是理想的，也許拆分它是有道理的，因為這也將允許我們重複使用其中部分的元件。

我將使用 CLI 創建新的元件。

## Create `cockpit` and `server-element` Components

```shell
ng g c cockpit --skip-tests
```

```shell
ng g c server-element --skip-tests
```

這樣，我們的 `app` 元件中就有了兩個新的資料夾。

現在，我們當然可以將以下 `app` 元件模板的程式碼移至 `cockpit` 元件中。

- [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html)

```html
<div class="row">
<div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button
    class="btn btn-primary"
    (click)="onAddServer()">Add Server</button>
    <button
    class="btn btn-primary"
    (click)="onAddBlueprint()">Add Server Blueprint</button>
</div>
</div>
```

當然，我們也必須移動我們在此調用的方法（例如 `onAddServer()` ）。

所以在這裡的 TypeScript 程式碼中，我會將以下程式碼移動到我們的 [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts) 中：

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
export class AppComponent {
  ...
  onAddServer() {
    this.serverElements.push({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.serverElements.push({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent
    });
  }
}
```

額外的一點是，這樣做的副作用是，我試圖將其推送到不存在的陣列 "`serverElements`" 。

那個陣列仍然在 `app` 元件中。

我們當然可以將這個 "`serverElements`" 陣列移動，但那樣我們將不再在 `app` 元件中擁有它，但我們仍然需要它，因為我們仍然需要複製這些伺服器元素以在這裡創建我們輸出的伺服器。

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  newServerName = '';
  newServerContent = '';
  ...
}
```

所以我可以將它們移動到 `cockpit` 中，但我們必須處理這個 "`serverElements`" 陣列。

但我們暫時先回到 `app` 元件的 HTML 檔案，並 extract 出一個單獨的 "`server-element`" 元件。

- [`server-element.component.html`](../../cmp-databinding/src/app/server-element/server-element.component.html)

```html
<div
  class="panel panel-default"
  *ngFor="let element of serverElements">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

現在，我將這個 `ngFor` 迴圈刪除，因為我仍然希望在 `app` 元件中管理我的 "`serverElements`" 陣列，因為我們必須能夠從 `cockpit` 中操作它，然後在 `app` 元件中複製它以創建這個伺服器元素元件的多個實例。 

> **Warning**:
> `server-element` 只是**單個**伺服器，請牢記這一點，它不是伺服器列表。

- [`server-element.component.html`](../../cmp-databinding/src/app/server-element/server-element.component.html)

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

你會發現現在我們也試圖訪問我們在 `server-element` 元件內部也缺少的 `element` 屬性。

所以我們又多了一個問題需要修復。

但現在我們先回到 [`app.component.html`](../../cmp-databinding/src/app/app.component.html) ，並將移除掉的程式碼分別改成 `cockpit` 和 `server-element` 元件：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element></app-server-element>
    </div>
  </div>
</div>
```

並且我們也可以使用 NG for 來複製 `server-element` 元件，讓 `server-element` 成為 `serverElements` 的元素：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
      ...
      <app-server-element *ngFor="let serverElement of serverElements"></app-server-element>
      ...
```

如果我們來看看它，嗯，我們只是得到一個錯誤，指出有一些未知的屬性。

所以我們需要以某種方式，這是關鍵部分，將我們在 `cockpit` 中添加的新伺服器，添加到我們應用程式中的伺服器陣列中。

所以我們有點需要通知我們的 `app` 元件，它的一個子元件，即 `cockpit` 已更改，或者說某些東西在那裡發生變化，我們應該對「添加了一個新的伺服器」的行為做出反應。

然後我們還需要獲取我們從 `cockpit` 中獲得的資料。

這個新的伺服器是由 `app` 元件中的伺服器陣列 `serverElements` 管理的，

我們需要將單一迴圈迭代的個別伺服器元素傳遞到 `server-element` 元件中。

因此，我們需要在元件之間傳遞資料，而這當然是一個非常重要的任務，我們將在接下來深入研究它。