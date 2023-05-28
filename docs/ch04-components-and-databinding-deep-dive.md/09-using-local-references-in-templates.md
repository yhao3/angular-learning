# 09. Using Local References in Templates

回到我們在這門課程的前幾堂課中建立的應用程式，使用了駕駛艙（cockpit）、伺服器元件（server element）以及使用輸出（output）和輸入（input）進行資料傳遞的自訂屬性和事件綁定。

現在，在 `cockpit` 中，我正在使用雙向資料綁定來獲取伺服器名稱和內容：

- [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    ...
  </div>
</div>
```

雖然這樣做沒有問題，但也許我們不需要使用雙向資料綁定。

因為我只想在點擊「新增伺服器」或「新增伺服器藍圖」按鈕時保存或使用該資料，只在該時間點上取得輸入框的值就足夠了，而我們可以以一個不錯的方式實現這一點。

所以我會在該元素上建立一個本地參考（local reference）。

本地參考可以放在任何 HTML 元素上，不僅僅是輸入框，可以是模板中任何你看到的元素，使用井號（`#`）加上你選擇的名稱：

- [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <input 
      type="text" 
      class="form-control" 
      #serverNameInput>
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    ...
  </div>
</div>
```

這個參考將持有什麼？

答案是持有「對該元素的參考」。 例如， "`serverNameInput`" 。

我們可以通過在點擊「新增伺服器」按鈕時將其作為參數傳遞，這樣我們就可以在模板中的任何地方使用它，但重要的是，只能在模板中使用，不能在 TypeScript 程式碼中使用。

因此，在這裡我們可以使用 "`serverNameInput`"，這樣我們就可以將它傳遞到 TypeScript 程式碼中：

- [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <input 
      type="text" 
      class="form-control" 
      #serverNameInput>
    ...
    <button 
      class="btn btn-primary" 
      (click)="onAddServer(serverNameInput)">Add Server</button>
    ...
  </div>
</div>
```

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  onAddServer(nameInput) {
    console.log(nameInput);
    ...
  }
  ...
}
```

現在如果我們輸出 `nameInput` 的值，檢查一下它是什麼：

- The value of `nameInput` is:

```html
<input _ngcontent-qla-c44="" type="text" class="form-control">
```

所以在這裡，我們也可以輸出輸入框的值，因為我們知道輸入框元素有一個 "`value`" 屬性：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  onAddServer(nameInput) {
    console.log(nameInput.value);
    ...
  }
  ...
}
```

現在，我們可以在 TypeScript 程式碼中使用本地參考完成我們的需求：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  // newServerName = ''; // <-- Unnecessary anymore
  ...
  onAddServer(nameInput) {
    this.serverCreated.emit(
      {
        serverName: nameInput.value, // <-- Here
        ...
      }
    );
  }
  ...
}
```

同樣，我們也應該明確指定類型！ 我們知道這將是一個 HTML 輸入框元素 `HTMLInputElement` ，所以我們可以確保 `nameInput.value` 這個 "`value`" 屬性會存在：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit(
      {
        serverName: nameInput.value,
        ...
      }
    );
  }
  ...
}
```

當然， `onAddBlueprint` 方法也可以使用相同的方式重構：

- [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <input 
      type="text" 
      class="form-control" 
      #serverNameInput>
    ...
    <button 
      class="btn btn-primary" 
      (click)="onAddBlueprint(serverNameInput)">Add Server Blueprint</button>
  </div>
</div>
```

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit(
      {
        serverName: nameInput.value,
        ...
      }
    );
  }
  ...
}
```

這就是本地參考的使用方法。