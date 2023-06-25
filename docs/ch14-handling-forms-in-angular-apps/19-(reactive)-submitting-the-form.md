# 19. (Reactive) Submitting the Form

現在，讓我們來探討如何提交表單。

## Submitting a Form in the Template-Driven Approach

在模板驅動方式中，我們使用 `ngSubmit` 指令來處理表單的提交事件。 我們將繼續使用相同的方式來回應 HTML 和 JavaScript 觸發的預設提交事件。 將 `ngSubmit` 指令添加到表單元素上，並指定在提交表單時要執行的方法：

### 1. Using `ngSubmit` in the Template

- [`app.component.html`](../../forms-reactive-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
-     <form [formGroup]="signupForm">
+     <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            formControlName="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              formControlName="gender"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

### 2. Declaring the `onSubmit()` Method

> **Note**:
> 與 TD 方式不同，我們不再需要使用 local reference 來獲取表單引用，因為我們不依賴於 Angular 的自動創建機制。 相反，我們已經在 TypeScript 程式碼中可以直接訪問表單。

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }

+ onSubmit() {
+   console.log(this.signupForm);
+ }
}
```

## Testing the Form Submission

提交後，您將在控制台中看到記錄的 form group。 它將顯示表單的屬性，包括 `username`、`email` 和 `gender` 屬性輸入的值。 這是使用 Reactive 方式的一個優點。 您在 form group 中設置的值會反映在表單的值中，使您能夠將其綁定到應用程序 model 中，並確保表單的結構與模型的結構相匹配。