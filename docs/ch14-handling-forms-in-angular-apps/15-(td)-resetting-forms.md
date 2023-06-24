# 15. (TD) Resetting Forms

現在我們想要實作「重置表單」功能。

## Restting Forms

事實上，這非常簡單。在我們的表單上，我們可以像這樣呼叫 `reset()` 方法，這將重置表單。

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
...
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  defaultQuestion = 'pet';

  answer = '';

  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  submitted = false;
  ...
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

+   this.signupForm.reset();
  }
}
```

## Resetting Forms and Specifying Values

> **Note**:
> 我們也可以在 `reset()` 中傳入一個物件，這個物件參數的屬性值將會被用來重置表單。

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  defaultQuestion = 'pet';
  ...
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset(
+     {
+       userData: {
+         username: '',
+         email: ''
+       },
+       secret: this.defaultQuestion,
+       questionAnswer: '',
+       gender: ''
+     }
    );
  }
}
```