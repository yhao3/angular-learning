# 13. (TD) Setting and Patching Form Values

在本小節中，我們將探索在點擊 ` Suggest an Username ` 按鈕時，如何以不同的方法來填充使用者名稱輸入欄位。

現在我們的 [`app.component.ts`](../../forms-td-app/src/app/app.component.ts) 中有一個 `suggestUserName()` 方法雛形如下：

- [`app.component.ts`](../../forms-td-app/srcs/app/app.component.ts)

```ts
...
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;
  ...
  suggestUserName() {
    const suggestedName = 'Superuser';
    // TODO
  }
  ...
}
```

> **Info**:
> `// TODO` 的部分尚待我們實作。

我們可以先將 ` Suggest an Username ` 按鈕添加 `click` 事件並將 `suggestUserName()` 作為其處理函式：

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username"
              required
            >
          </div>
-         <button class="btn btn-default" type="button">Suggest an Username</button>
+         <button class="btn btn-default" type="button" (click)="suggestUserName()">Suggest an Username</button>
          ...
          </div>
        </div>
        ...
      </form>
    </div>
  </div>
</div>
```

而我們有 2 種方式可以實作 `suggestUserName()` 方法：

## Option 1: Setting a Value with `setValue()`

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
...
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;
  ...
  suggestUserName() {
    const suggestedName = 'Superuser';
+   this.signupForm.setValue({
+     userData: {
+       username: suggestedName,
+       email: ''
+     },
+     secret: 'pet',
+     questionAnswer: '',
+     gender: 'male'
+   });
  }
  ...
}
```

然而，這種方法有一個缺點。 如果其他欄位中已經有值輸入，使用 `setValue()` 會覆蓋所有現有內容。 因此推薦使用第二種 `patchValue()` 的作法：

## Option 2: Patching a Value with `patchValue()`

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
...
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;
  ...
  suggestUserName() {
    const suggestedName = 'Superuser';
+   this.signupForm.form.patchValue({
+     userData: {
+       username: suggestedName
+     }
+   });
  }
  ...
}
```

儲存更改並觀察只有使用者名稱欄位被更新，其他控制元件保持不變。

## Conclusion


`setValue` 和 `patchValue` 方法在設定 Angular 表單的值時非常有用。 `setValue` 用於設定整個表單的值，而 `patchValue` 允許你只覆蓋特定的控制元件而不影響其他控制元件。

請記住，`patchValue` 可在 `signupForm` 物件中的表單群組中使用，而 `setValue` 也可以直接應用於 `signupForm` 上：

```
this.signupForm.form.setValue({ ... });
```

這些方法提供了方便的方式來填充表單控制元件的預設或建議值。