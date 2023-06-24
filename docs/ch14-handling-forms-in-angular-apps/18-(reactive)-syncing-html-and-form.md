# 18. (Reactive) Syncing HTML and Form

在上一小節 [17. (Reactive) Creating a Form in Code](./17-(reactive)-creating-a-form-in-code.md) 中，我們在 TypeScript 中建立了我們的表單。 然而，實際上表單存在於 HTML 模板中，所以我們需要將 HTML 輸入與 TypeScript 中的表單進行同步。

預設情況下，Angular 會自動檢測模板中的表單並為我們創建一個表單。 為了覆蓋這種預設行為並連接我們的 TypeScript 表單，我們需要添加一些指示（Directives）。

> **Note**:
> 務必將 `ReactiveFormsModule` 匯入到 `app.module.ts` 中，否則 Angular 將無法識別這些指示。

## Adding the `formGroup` Directive and Binding to `signupForm`

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
-     <form>
+     <form [formGroup]="signupForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## 2. Adding the `formControlName` Directive and Binding to `username` and `email`

例如，要將使用者名稱輸入與 TypeScript 中的 `username` 控制項連接起來，我們可以直接將名稱作為字串傳遞：

```diff
<input
  type="text"
  id="username"
+ formControlName="username"
  class="form-control">
```

或者根據需要使用屬性綁定：

```diff
<input
  type="text"
  id="username"
+ [formControlName]="'username'"
  class="form-control">
```

詳細實作如下：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
+           formControlName="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
+           formControlName="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
+             formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```