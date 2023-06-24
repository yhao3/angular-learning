# 12. (TD) Handling Radio Buttons

在本小節中，我們將探討如何在 Angular 模板驅動表單中使用單選按鈕。

目前應用程式中還沒有任何單選按鈕。 讓我們先添加一些單選按鈕，然後再來看看如何處理它們。

## Adding Radio Buttons

首先我們先在 `app.component.ts` 中添加一個 `genders` 屬性：

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  defaultQuestion = 'pet';

  answer = '';

+ genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
```

現在，讓我們將單選按鈕添加到表單中：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
        ...
        <p>Your reply: {{ answer }}</p>
+       <div class="radio" *ngFor="let gender of genders">
+         <label>
+           <input
+             type="radio"
+             name="gender"
+             ngModel
+             [value]="gender"
+             required
+           >
+             {{ gender }}
+         </label>
+       </div>
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!f.valid"
        >Submit</button>
      </form>
    </div>
  </div>
</div>
```
