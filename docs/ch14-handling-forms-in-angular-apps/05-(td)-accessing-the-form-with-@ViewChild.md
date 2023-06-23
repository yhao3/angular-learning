# 05. (TD) Accessing the Form with `@ViewChild`

之前我們是將本地參考作為 `onSubmit()` 方法的參數，以訪問表單物件。

而使用 `@ViewChild` 提供了一種替代的方式來在 TypeScript 程式碼中存取表單物件，以彈性地存取表單的數據和屬性：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
-     <form (ngSubmit)="onSubmit(f)" #f="ngForm">
+     <form (ngSubmit)="onSubmit()" #f="ngForm">
        ...
      </form>
    </div>
  </div>
</div>
```

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
- import { Component } from '@angular/core';
+ import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

+ @ViewChild('f')
+ signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

- onSubmit(form: NgForm) {
-   console.log(form);
+ onSubmit() {
+   console.log(this.signupForm);
  }
}
```