# 14. (TD) Using Form Data

在本小節中，我們將完成我們的表單，並實現表單提交和數據總結。

## Adding User Data Summary

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  ...
+ <div class="row">
+   <div class="col-xs-12">
+     <h3>Your Data</h3>
+     <p>Username: </p>
+     <p>Mail: </p>
+     <p>Secret Question: </p>
+     <p>Answer: </p>
+     <p>Gender: </p>
+   </div>
+ </div>
</div>
```

## Implementing `onSubmit()` Method

- [`app.component.ts`](../../forms-td-app/src/app/app.component.ts)

```diff
...
export class AppComponent {

  @ViewChild('f')
  signupForm: NgForm;

  defaultQuestion = 'pet';

  answer = '';

  genders = ['male', 'female'];

+ user = {
+   username: '',
+   email: '',
+   secretQuestion: '',
+   answer: '',
+   gender: ''
+ };

+ submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
+   this.submitted = true;
+   this.user.username = this.signupForm.value.userData.username;
+   this.user.email = this.signupForm.value.userData.email;
+   this.user.secretQuestion = this.signupForm.value.secret;
+   this.user.answer = this.signupForm.value.questionAnswer;
+   this.user.gender = this.signupForm.value.gender;
  }
}
```

## Using the Submitted Data in the Template

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  ...
- <div class="row">
+ <div class="row" *ngIf="submitted">
    <div class="col-xs-12">
      <h3>Your Data</h3>
-     <p>Username: </p>
+     <p>Username: {{ user.username }}</p>
-     <p>Mail: </p>
+     <p>Mail: {{ user.email }}</p>
-     <p>Secret Question: </p>
+     <p>Secret Question: {{ user.secretQuestion }}</p>
-     <p>Answer: </p>
+     <p>Answer: {{ user.answer }}</p>
-     <p>Gender: </p>
+     <p>Gender: {{ user.gender }}</p>
    </div>
  </div>
</div>
```