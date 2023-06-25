# 26. (Reactive) Creating a Custom Async Validator

在某些情況下，我們可能需要執行「非同步」操作，例如與網頁伺服器進行驗證。 這些操作需要一些時間才能完成，並且無法立即提供回應。 為了處理這樣的情況，Angular 提供了非同步驗證器，讓我們能夠在確定欄位有效性之前等待回應。

## Creating a Custom Async Validator

讓我們在 `AppComponent` 中建立一個非同步驗證器的範例，我們將其命名為 "`forbiddenEmails`"。 這個驗證器將以控制項為參數：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
+ import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ...
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
  ...
+ forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
+   const promise = new Promise<any>((resolve, reject) => {
+     setTimeout( () => {
+       if (control.value === 'test@test.com') {
+         resolve({'emailIsForbidden': true});
+       } else {
+         resolve(null);
+       }
+     }, 1500);
+   });
+   return promise;
+ }
}
```

在這個範例中，我們在驗證器內建立了一個 `Promise`。這個 `Promise` 會在延遲 1.5 秒後回應，模擬像是與伺服器進行非同步任務的情境。 如果控制項物件的值為 `'test@test.com'`，我們將其視為無效並返回一個包含錯誤碼 `'emailIsForbidden': true` 的物件。 否則，我們以 `null` 回應來表示有效的輸入。

## Using the Custom Async Validator with `asyncValidator` Argument

要使用非同步驗證器，我們需要在設定表單控制項時加入它。 不要將它添加到一般驗證器的陣列中，而是加在建構子的 `asyncValidator` 參數：

```typescript
(alias) new FormControl<any>(value: any, validatorOrOpts?: FormControlOptions | ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): FormControl<...> (+4 overloads)
```

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
-       'email': new FormControl(null, [Validators.required, Validators.email])
+       'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
  ...
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
```

> **Note**:
> 這裡我們就不需要使用 `bind()` 了，因為我們在 `forbiddenEmails()` 函式中沒有使用 `this`。

## Testing the Custom Async Validator

現在如果輸入有效的值，驗證狀態將從 `ng-pending` 變為 `ng-valid`。 如果輸入無效的電子郵件地址，例如 `test@test.com`，狀態將從 `ng-pending` 變為 `ng-invalid`。 這展示了非同步驗證器的工作方式。

## Conclusion

在 Angular 中使用非同步驗證器非常簡單，特別是遵循反應式方法。 它們非常適合處理需要執行非同步任務（例如與網頁伺服器進行驗證）的情境。 通過使用非同步驗證器，您可以即時向使用者提供反饋並基於伺服器回應顯示適當的錯誤訊息。