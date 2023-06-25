# 24. (Reactive) Creating Custom Validators

現在，讓我們來探索另一個使用反應式方法時可以輕鬆實作的功能：添加自訂驗證器。

到目前為止，我們一直在使用內建的驗證器，這些驗證器應該可以涵蓋大部分使用情境。 然而，有時我們可能需要增加額外的驗證規則。 例如，我們可能想限制某些使用者名稱的使用。 在這種情況下，我們可以建立自己的自訂驗證器。

## Creating a Custom Validator

要建立自訂驗證器，我們需要定義一個函式，Angular 將在檢查表單控制項的有效性時自動執行該函式。 驗證器函式應該接收表單控制項作為參數，並返回一個表示驗證結果的 JavaScript 物件。

讓我們建立一個自訂驗證器，以檢查輸入的使用者名稱是否是禁止使用的使用者名稱之一。 在您的 TypeScript 檔案中，新增一個禁止使用的使用者名稱屬性：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
+ forbiddenUsernames = ['Chris', 'Anna'];
  ...
}
```

現在，我們來建立自訂驗證器函式：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  ...
+ forbiddenNames(control: FormControl): {[s: string]: boolean} {
+   if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
+     return {'nameIsForbidden': true};
+   }
+   return null;
+ }
}
```

> 在這個範例中，`forbiddenNames()` 函式接收一個 `FormControl` 作為參數。 在函式內部，我們檢查控制項的值是否存在於禁止使用的使用者名稱陣列中。 如果存在，我們返回一個 key 為 `'nameIsForbidden'`，value 為 `true` 的物件，表示控制項無效。 如果值不是禁止的，則返回 `null`，表示控制項有效。

## Using the Custom Validator

要將自訂驗證器應用於特定的表單控制項，您需要在定義該控制項的驗證器時，將驗證器函式的參考傳遞給它。 例如，如果您想將自訂驗證器應用於使用者名稱控制項：

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
-       'username': new FormControl(null, Validators.required),
+       'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
  ...
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }
}
```

> **Warning**:
> 請確保使用 `bind(this)` 方法，以確保在驗證器函式內使用正確的上下文 (`this`)。 否則，您將因為無法訪問 `forbiddenUsernames` 屬性而得到以下錯誤：
> ```
> ERROR TypeError: Cannot read properties of undefined (reading 'forbiddenUsernames')
> ```
> 之所以需要使用 `bind(this)`，是因為在 `forbiddenNames()` 方法中，我們使用了 `this` 關鍵字來訪問 `forbiddenUsernames` 屬性。 但我們並不是從這個 `AppComponent` 類別內呼叫建構子中的 `this.forbiddenNames`，而是當 Angular 檢查有效性時，Angular 會呼叫它。 這會導致 `this` 關鍵字無法指向 `AppComponent` 類別。 因此，我們需要使用 `bind(this)` 來確保 `this` 關鍵字指向 `AppComponent` 類別。
