# 10. (TD) Using `ngModel` with Two-Way Binding

目前，表單只在按下「提交」按鈕後更新，然後我們擷取表單物件以存取數值。 我們一直在使用未綁定或單向綁定的 `ngModel`。

然而，有些情境下您希望即時檢查或顯示使用者的輸入。 我們來看一個示例來說明這點。

現在我們希望新增回答第三個問題的輸入框，並且即時在畫面上渲染使用者的輸入，例如 `Your reply: {{ answer }}`。

## 0. Adding textarea and paragraph

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        ...
+       <div class="form-group">
+         <textarea
+           name="questionAnswer"
+           rows="3"
+           class="form-control"
+         ></textarea>
+       </div>
+       <p>Your reply:</p>
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

## 1. Declaring a new property `answer` in `AppComponent`

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
...
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  defaultQuestion = 'pet';

+ answer = '';

  ...
}
```

## 2. Using Two-Way Binding with `ngModel`

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        ...
        <div class="form-group">
          <textarea
            name="questionAnswer"
            rows="3"
            class="form-control"
+           [(ngModel)]="answer"
          ></textarea>
        </div>
-       <p>Your reply:</p>
+       <p>Your reply: {{ answer }}</p>
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

## Conclusion

總結來說，我們已經介紹了表單中的 3 種資料綁定類型：

1. 無綁定：用於告知 Angular 它是一個表單控制項
2. 單向綁定：用於提供「預設值」
3. 雙向綁定：用於即時回應和互動使用者輸入