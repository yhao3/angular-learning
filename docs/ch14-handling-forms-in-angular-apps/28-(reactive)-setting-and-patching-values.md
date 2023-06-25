# 27. (Reactive) Setting and Patching Values

除了監聽表單的更新外，您還可以手動自行更新表單。 與 Template-Driven 方法類似，Angular 提供了 `setValue()` 和 `patchValue()` 方法來實現這一目的。 讓我們來探索如何使用這些方法。

## Updating the Form with `setValue()`

要更新整個表單，您可以呼叫 `setValue()` 並傳遞一個 JavaScript 物件。 該物件應符合您最初創建的表單結構。 例如，如果您的表單包含使用者資料，您可以相應地設置它們的值。 以下是一個範例：

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
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
+   this.signupForm.setValue({
+     userData: {
+       username: 'Max',
+       email: 'max@test.com'
+     },
+     gender: 'male',
+     hobbies: []
+   });
  }
  ...
}
```

通過呼叫 `setValue()`，表單將立即填充為提供的值。 您可以在表單加載時呼叫此方法，或在點擊按鈕時觸發它。

## Updating Part of the Form with `patchValue()`

如果您只想更新表單的特定部分，例如使用者名稱，您可以使用 `patchValue()`。 該方法允許您更新個別的表單控制項，而不影響表單的其他部分。 例如，要將使用者名稱更改為 "`Anna`"，可以使用以下程式碼：

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
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email: 'max@test.com'
      },
      gender: 'male',
      hobbies: []
    });
+   this.signupForm.setValue({
+     userData: {
+       username: 'Anna'
+     }
+   });
  }
  ...
}
```

呼叫 `patchValue()` 後，您將看到只有使用者名稱欄位已更新，而表單的其他部分保留了使用 `setValue()` 設置的值。

## Resetting the Form

當您想在提交表單後對其進行重置時，只需簡單地呼叫 `reset()` 方法。 這將清除所有表單控制項並將它們重置為初始狀態。 例如：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  ...
  onSubmit() {
    console.log(this.signupForm);
+   this.signupForm.reset();
  }
  ...
}
```

通過呼叫 `reset()`，表單將被清空，讓您可以重新開始輸入。

### Resetting the Form to a Specific Value

另外 `reset()` 方法也接受一個物件，該物件可以用來重置表單的值。 例如，如果您想要重置表單的值，並讓性別預設為 "`male`"，您可以使用以下程式碼：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  ...
  onSubmit() {
    console.log(this.signupForm);
+   this.signupForm.reset({
+     userData: {
+       username: '',
+       email: ''
+     },
+     gender: 'male',
+     hobbies: []
+   });
  }
  ...
}
```

## Conclusion

通過使用 `setValue()`、`patchValue()` 和 `reset()`，您具備了根據需求更新和重置表單的必要工具。 這些方法使您能夠配置和構建強大的表單。