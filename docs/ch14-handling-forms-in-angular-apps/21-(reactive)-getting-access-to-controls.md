# 21. (Reactive) Getting Access to Controls

現在，讓我們來看看如何使用表單狀態來顯示驗證訊息，這與 Template-Driven 的方式相似。

要為不正確的使用者名稱顯示訊息，我們可以在使用者名稱輸入欄位下方新增一個具有 "help-block" 類別的 `<span>` 元素：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
+         <span
+           class="help-block">Please enter a valid username!</span>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

在 Template-Driven 的方式中，我們會使用 `ngModel` 來存取使用者名稱並檢查其有效性。 然而，在 Reactive 的方式中，我們需要以不同的方式存取控制項。

在響應式的方式中，我們可以使用整個表單提供的 `get()` 方法來存取控制項及其有效性。 這個方法讓我們可以輕鬆地透過指定控制項名稱或路徑來存取控制項。 在這個案例中，由於我們的表單物件只有一層巢狀結構，路徑就是「控制項名稱」，也就是 "`username`"。 我們可以透過存取控制項的 `valid` 屬性來檢查控制項是否有效：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
          <span
+           *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
            class="help-block">Please enter a valid username!</span>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

其它的驗證也可以使用相同的方式來實作，完整程式碼如下：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
+         <span
+           *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
+           class="help-block">Please enter a valid username!</span>
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            formControlName="email"
            class="form-control">
+         <span
+           *ngIf="!signupForm.get('email').valid && signupForm.get('email').touched"
+           class="help-block">Please enter a valid email!</span>
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
+       <span
+         *ngIf="!signupForm.valid && signupForm.touched"
+         class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Styling Invalid Input Fields

最後我們也為無效的輸入欄位加上紅色邊框吧：

- [`app.component.css`](../../forms-reactive-app/src/app/app.component.css)

```diff
...
+ input.ng-invalid.ng-touched {
+   border: 1px solid red;
+ }
```