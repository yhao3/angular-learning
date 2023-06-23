# 09. (TD) Setting Default Values with `ngModel` Property Binding

現在讓我們嘗試為表單中的下拉選單設置預設值吧！

要為表單控制項定義預設值，我們可以稍微改變使用 `ngModel` 指令的方式。不再單獨使用 `ngModel`，而是結合屬性綁定來設定預設值。

- 首先，在 `ngModel` 周圍加上方括號，表示我們使用屬性綁定。
- 將 `ngModel` 綁定到表示控制項預設值的值。
- 例如，如果我們有一個下拉選單有兩個選項（`pet` 和 `teacher`），我們可以通過將 `ngModel` 綁定到一個名為 `defaultQuestion` 的屬性，將預設值設為 "`pet`"。

## 1. Declaring a Property to Store the Default Value

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

+ defaultQuestion = 'pet';

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
```

## 2. Using `ngModel` Property Binding to Set the Default Value

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        ...
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select
            id="secret"
            class="form-control"
-           ngModel
+           [ngModel]="defaultQuestion"
            name="secret"
          >
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```