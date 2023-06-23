# 08. (TD) Outputting Validation Error Messages

## 1. Adding Span Elements for Error Messages

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data">
          ...
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
            >
+           <span class="help-block">Please enter a valid email!</span>
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

## 2. Adding Local References to the Input Fields

在這裡，我們使用本地引用 `#email` 並將其與 `ngModel` 關聯。

> **Warning**:
> 注意這裡不是像整個 `<form>` 元素一樣關聯 `ngForm`。 `ngModel` 指示器會提供有關所創建控制項的其他資訊，讓我們可以存取其屬性。

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data">
          ...
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
+             #email="ngModel"
            >
            <span class="help-block">Please enter a valid email!</span>
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

## 3. Adding the `*ngIf` Directive to Output the Error Message

有了本地引用後，我們可以根據電子郵件控制項的有效性條件來條件性地顯示幫助文字。 為此，請在幫助文字的 `<span>` 元素中添加以下條件：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data">
          ...
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
-           <span class="help-block">Please enter a valid email!</span>
+           <span class="help-block" *ngIf="!email.valid && email.touched">Please enter a valid email!</span>
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

> 在這裡，我們檢查電子郵件控制項是否無效（`!email.valid`）並且是否已觸碰（`email.touched`）。這確保只有在使用者與欄位互動並輸入無效值時才會顯示幫助文字。