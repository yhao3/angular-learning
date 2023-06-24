# 11. (TD) Grouping Form Controls

在本小節中，我們將探討如何使用模板驅動方法中的 `ngModelGroup` 指令將輸入分組於我們的 Angular 表單中。將輸入進行分組可以為表單添加結構，並驗證個別輸入組的有效性和狀態。

## Grouping

要將輸入分組在一起，我們可以使用 `ngModelGroup` 指令：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
-       <div id="user-data">
+       <div id="user-data" ngModelGroup="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username"
              required
            >
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name="email"
              required
              email
              #email="ngModel"
            >
            <span class="help-block" *ngIf="!email.valid && email.touched">Please enter a valid email!</span>
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

如此一來，`ngModelGroup` 中的所有輸入都將被分組在一起。 例如範例中的 Username 和 Mail 輸入現在都屬於 `userData` 組。 這意味著我們可以在表單中訪問 `userData` 組，並檢查其有效性和狀態。

當使用 `ngModelGroup` 將輸入進行分組時，Angular 會自動為該組生成一個控制項，其中包含 `valid`、`dirty` 等屬性。這使我們能夠檢查整個組的有效性。

檢查 HTML 程式碼，找到帶有指定 ID（例如 `user-data` ）的 `<div>` 元素。 您會注意到該元素上已添加了 `ng-dirty`、`ng-touched` 和 `ng-valid` 類。

## Accessing Group Validation

要存取分組的 JavaScript 物件，可以使用模板變數語法將本地引用添加到該元素上。 例如：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
-       <div id="user-data" ngModelGroup="userData">
+       <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
          ...
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

接著我們就可以使用該 `userData` 本地引用來存取分組的 JavaScript 物件。 例如，我們可以根據 `userData` 的 `valid` 屬性來提示一段文字：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
          ...
        </div>
+       <p *ngIf="!userData.valid && userData.touched">User Data is invalid!</p>
        ...
      </form>
    </div>
  </div>
</div>
```

如此一來只要當 `userData` 組中其中一組輸入無效時且被觸碰過，就會顯示錯誤提示文字。