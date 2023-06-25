---
tags: ['FormArray]
---

# 23. (Reactive) Arrays of Form Controls

現在，讓我們來探索另一個實用的功能：動態添加表單控制項到我們的表單中。

## Adding a New Area to the Form

首先，讓我們在單選按鈕下方的表單中添加一個新區域。 我們將使用 `<div>` 元素來容納動態添加的表單控制項。

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        ...
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
+       <div>
+         <h4>Your Hobbies</h4>
+         <button
+           class="btn btn-default"
+           type="button"
+         >Add Hobby</button>
+       </div>
        <span
          *ngIf="!signupForm.valid && signupForm.touched"
          class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Handling Button Click

當使用者點擊「添加愛好」按鈕時，我們希望動態添加一個新的控制項到我們的表單中。 我們可以通過為按鈕添加點擊事件監聽器來實現這一點。


- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        ...
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <div>
          <h4>Your Hobbies</h4>
          <button
            class="btn btn-default"
            type="button"
+           (click)="onAddHobby()"
          >Add Hobby</button>
        </div>
        <span
          *ngIf="!signupForm.valid && signupForm.touched"
          class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Adding Controls to the Form Array

在元件中，我們將定義 `onAddHobby()` 方法來處理按鈕點擊事件。 在這個方法內部，我們將添加表單控制項：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
- import { FormControl, FormGroup, Validators } from '@angular/forms';
+ import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
+     'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

+ onAddHobby() {
+   const control = new FormControl(null, Validators.required);
+   (<FormArray>this.signupForm.get('hobbies')).push(control);
+ }
}
```

> **Note**:
> 請注意，我們使用了 `(<FormArray>)` 將控制項明確地轉型為 `FormArray`。 這告訴 TypeScript 正確的類型，並防止任何錯誤。

## Synchronizing with HTML

為了在 HTML 模板中顯示動態添加的表單控制項，我們需要使用 `formArrayName` 指令來同步表單陣列和模板：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        ...
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
-       <div>
+       <div formArrayName="hobbies">
          <h4>Your Hobbies</h4>
          <button
            class="btn btn-default"
            type="button"
            (click)="onAddHobby()"
          >Add Hobby</button>
        </div>
        <span
          *ngIf="!signupForm.valid && signupForm.touched"
          class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

通過將 `formArrayName` 指令添加到外部 `<div>` 中，通知 Angular 控制項陣列將存在於此區域內。 在 `<div>` 內部，我們還需要使用 `*ngFor` 來遍歷 `hobbies` 控制項，並將每個控制項分配給 `hobbyControl` 變量：

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        ...
        <div formArrayName="hobbies">
          <h4>Your Hobbies</h4>
          <button
            class="btn btn-default"
            type="button"
            (click)="onAddHobby()"
          >Add Hobby</button>
+         <div
+           class="form-group"
+           *ngFor="let hobbyControl of getControls(); let i = index">
+           <input type="text" class="form-control" [formControlName]="i">
+         </div>
        </div>
        <span
          *ngIf="!signupForm.valid && signupForm.touched"
          class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

注意，這裡我們在元件中定義了一個 `getControls()` 方法，它將返回 `hobbies` 表單陣列中的所有控制項。 如此一來在 `ngFor` 中，我們就可以使用 `getControls()` 來取得所有控制項：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
  ...
+ getControls() {
+   return (<FormArray>this.signupForm.get('hobbies')).controls;
+ }
}
```