# 20. (Reactive) Adding Validation

既然我們已經知道如何提交表單，讓我們為它新增一些驗證。

在 Template-Driven 的方法中，我們只需在 HTML 中使用 `required` 屬性來指定必填欄位。 然而，在 Reactive 方法中，情況有所不同。

> **Warning**:
> 請記住，在 Reactive 方法中我們並不會在 template 中進行表單的相關設定，只是將其與 `formControlName` 和 `formGroup` 這些指令進行同步。 實際的表單配置都是在 TypeScript 程式碼中進行的。

要在 Reactive 方法中新增驗證，我們使用 `FormControl` 建構子，它接受多個參數：

1. 第 1 個參數是設定「預設值」
2. 第 2 個參數則是用來指定「驗證器」

## Specifying a Validator

您可以將單個驗證器傳遞給 `FormControl` 構造函式。 例如，要求 `username` 必填，您可以使用 `Validators.required` 物件，這個 `required` 驗證器是 Angular 提供的內建驗證器：

> **Note**:
> 請確保從 `@angular/forms` 中進行導入。

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
...
- import { FormControl, FormGroup } from '@angular/forms';
+ import { FormControl, FormGroup, Validators } from '@angular/forms';

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
-     'username': new FormControl(null),
+     'username': new FormControl(null, Validators.required),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }
  ...
}
```

## Specifying Multiple Validators

您也可以通過將一個「驗證器陣列」傳遞給 `FormControl` 建構子來新增多個驗證器。 例如，對於 `email` 欄位，您可以同時使用 `required` 驗證器和 `email` 驗證器：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      'username': new FormControl(null, Validators.required),
-     'email': new FormControl(null),
+     'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male')
    });
  }
  ...
}
```

