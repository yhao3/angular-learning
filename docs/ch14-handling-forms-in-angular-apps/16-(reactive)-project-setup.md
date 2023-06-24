# 16. (Reactive) Project Setup

## 1. Importing the `ReactiveFormsModule` is Required

- [`app.module.ts`](../../forms-reactive-app/src/app/app.module.ts)

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
- import { FormsModule } from '@angular/forms';
+ import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
-   FormsModule
+   ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 2. Defining a `FormGroup` Object

- [`app.component.ts`](../../forms-reactive-app/src/app/app.component.ts)

```diff
import { Component } from '@angular/core';
+ import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
+ signupForm: FormGroup;
}
```