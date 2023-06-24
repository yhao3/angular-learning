# 17. (Reactive) Creating a Form in Code

現在，讓我們繼續來建立我們的表單。

## Initializing the Form

我們不會直接在屬性宣告區域初始化表單，而是使用 `OnInit` 周期鉤子來保持我們的程式碼組織化。 以下是我們的作法：

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
- import { Component } from '@angular/core';
+ import { Component, OnInit } from '@angular/core';
- import { FormGroup } from '@angular/forms';
+ import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
- export class AppComponent {
+ export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

+ ngOnInit(): void {
+   this.signupForm = new FormGroup({
+     'username': new FormControl(null),
+     'email': new FormControl(null),
+     'gender': new FormControl('male')
+   });
+ }
}
```