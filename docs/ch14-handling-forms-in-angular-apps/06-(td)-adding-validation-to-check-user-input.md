# 06. (TD) Adding Validation to Check User Input

## Validtaion in Angular

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username"
+             required
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
+             required
+             email
            >
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

- 儲存修改後，如果我們在沒有填寫必填欄位或輸入有效的電子郵件地址的情況下提交表單，表單的 `valid` 屬性將被設為 `false`。 只有在填寫了所有必填欄位並且電子郵件地址有效時， `valid` 屬性才會被設為 `true`。
- Angular 追蹤表單的狀態並提供我們查詢其有效性的能力。 這種表單級別的驗證也適用於個別控制項。每個控制項都有自己的 `valid` 屬性，使我們能夠獨立追蹤其有效性。
- Angular 動態地為表單控制項添加 CSS 類別，以視覺化呈現它們的狀態。這些類別包括 `ng-dirty` 、 `ng-touched` 、 `ng-valid` 和 `ng-invalid` 。 以 `ng-` 為前綴表示這些類別是 Angular 添加的，用於表示控制項的狀態，例如是否已修改、是否已觸碰或是否有效。
- 利用這些資訊，我們可以根據控制項的有效性狀態有條件地設計輸入欄位的樣式。 通過利用 Angular 追蹤表單和控制項的有效性，我們可以增強表單的樣式和行為，以改善整體使用者體驗。

## Built-in Validators & Using HTML5 Validation

Angular 內建了哪些驗證器呢？

請參閱 `Validators` 類別：https://angular.io/api/forms/Validators - 這些都是內建的驗證器，但實際執行的是方法（在使用反應式方法時，您可以在其中添加這些驗證器）。

對於模板驅動的方法，您需要使用指令。您可以在官方文件中搜索「validator」以獲取它們的名稱：https://angular.io/api?type=directive - 所有標記為「`D`」的都是指令，可以將它們添加到您的模板中。

此外，您可能還希望啟用 HTML5 驗證（Angular 預設情況下禁用它）。您可以通過在模板中的控制項上添加 `ngNativeValidate` 來實現。