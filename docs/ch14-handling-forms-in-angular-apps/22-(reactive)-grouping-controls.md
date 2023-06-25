# 22. (Reactive) Grouping Controls

## Grouping Controls

在上一小節中，我提到 `get()` 方法也可以接受元素的路徑。 這是什麼意思呢？

在處理表單時，你可能會遇到巢狀的表單群組。 例如，假設我們想要有一個名為 "`userData`" 的 `FormGroup`，其中包含 "`username`" 和 "`email`" 的表單控制項。 我們可以使用巢狀的 `FormGroup` 物件來建立巢狀的表單結構。 例如：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
+     'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
+     }),
      'gender': new FormControl('male')
    });
  }
  ...
}
```

## Syncing HTML and Form

### Wrapping Form Controls with Container Elements and Binding to `formGroupName`

目前，如果我們在不更新模板的情況下嘗試訪問表單控制項，會出現錯誤：

```
ERROR Error: Cannot find control with name: 'username'
...
```

因為這些控制項是嵌套在 "`userData`" 表單群組內部，而整個表單並不直接包含這些控制項。

為了更新模板和 TypeScript 程式碼之間的同步，我們可以將表單控制項包裹在容器元素（例如 `<div>`）中，以複製巢狀結構。 在這個容器元素上，我們使用 `formGroupName` 指令來指定巢狀表單群組的名稱：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
+       <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control">
            <span
              *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
              class="help-block">Please enter a valid username!</span>
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              formControlName="email"
              class="form-control">
            <span
              *ngIf="!signupForm.get('email').valid && signupForm.get('email').touched"
              class="help-block">Please enter a valid email!</span>
          </div>
+       </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

### Updating `get()` Calls

然而，我們仍然需要更新 `get()` 方法的調用以正確訪問巢狀的控制項。 目前，對 `get('username')` 和 `get('email')` 的呼叫將失敗，因為這些控制項不是直接位於 `signUpForm` 物件下。 我們需要提供控制項的路徑，通過使用點（`.`）將巢狀表單群組名稱和控制項名稱分隔開來：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control">
            <span
-             *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
+             *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"
              class="help-block">Please enter a valid username!</span>
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              formControlName="email"
              class="form-control">
            <span
-             *ngIf="!signupForm.get('email').valid && signupForm.get('email').touched"
+             *ngIf="!signupForm.get('userData.email').valid && signupForm.get('userData.email').touched"
              class="help-block">Please enter a valid email!</span>
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```