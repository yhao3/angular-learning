# 27. (Reactive) Reacting to Status or Value Changes

在本節中，我們將介紹如何使用 `ngOnInit` 生命週期鉤子來追蹤表單狀態。 我們將專注於註冊表單及其內部的每個控制項。

## Value Changes

首先，讓我們來監聽表單的值變更。由於值變更是一個 `Observable` 可觀察物件，我們可以訂閱它。 在訂閱中，我們提供一個 callback 函數，該函數在接收到新數據時執行。 這個 callback 函數將接收到表單的更新值，讓我們可以將其記錄下來：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
+   this.signupForm.valueChanges.subscribe(
+     (value) => console.log(value)
+   );
  }
  ...
}
```

通過實作這段程式碼，您會注意到每次按鍵都會將表單物件的值輸出到控制台中。 這是預期的行為，因為只要表單中的任何輸入被修改，值變更就會發生。

> **Note**:
> 值得一提的是，如果需要，您也可以在「個別的表單控制項」上調用 `valueChanges` 方法。

## Status Changes

除了值變更之外，我們還可以追蹤表單的狀態變更。 通過訂閱 `statusChanges`  `Observable` 可觀察物件，我們可以接收到表單的更新狀態。 讓我們來看一下具體的實作：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
+   this.signupForm.statusChanges.subscribe(
+     (value) => console.log(value)
+   );
  }
  ...
}
```

運行這段程式碼後，您會觀察到在表單中輸入內容時，狀態最初顯示為 "`INVALID`"，因為表單無效。 然而，如果您在包含「非同步驗證器」的欄位中輸入值，您將看到狀態在 1.5 秒的延遲後從 "`PENDING`" 變為 "`VALID`" 或 "`INVALID`"。

> **Note**:
> 值得一提的是，如果需要，您也可以在「個別的表單控制項」上調用 `statusChanges` 方法。

## Conclusion

通過值變更和狀態變更來追蹤表單狀態，可以提供對表單行為的重要鉤子。 通過訂閱這些 `Observable` 可觀察物件，您可以密切監視並對整個表單或個別控制項的變化作出反應。