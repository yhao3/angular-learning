# 03. (TD) Creating the Form and Registering the Controls

## 1. Importing the FormsModule is required

- [`app.module.ts`](../../forms-td-app/src/app/app.module.ts)

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
+ import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
+   FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 2. Automatic Form Creation

- 當 `FormsModule` 被匯入後，Angular 會在 HTML 代碼中檢測到 `<form>` 元素時，自動創建一個代表表單的 JavaScript 物件。
- 可以將 `<form>` 元素想像成 Angular 指令的選擇器，該指令會為你創建表單的 JavaScript 物件。

## 3. Registering Controls

- Angular 不會自動檢測表單元素內的 `<input>` 欄位。這是因為 HTML 中的所有 `<input>` 欄位都不應該被視為 JavaScript 表單表示中的控制項。
- 您需要手動註冊控制項，告知 Angular 哪些 `<input>` 欄位應該成為表單的一部分。

### Steps to Register a Control

在**模板驅動**的方法中，註冊控制項的步驟如下：

1. 選擇所需的 `<input>` 欄位元素。
2. 添加 `ngModel` 指令，以指示它是表單的一個控制項。
3. `ngModel` 指令是 `FormsModule` 中提供的一部分，它允許進行雙向數據綁定。在這個案例中，我們只使用它來註冊控制項。
4. 此外，還需在 `<input>` 欄位元素中添加 `name` 屬性，以指定控制項的名稱。

### Example

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form>
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
+             ngModel
+             name="username"
            >
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
+             ngModel
+             name="email"
            >
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select 
            id="secret" 
            class="form-control"
+           ngModel
+           name="secret"
          >
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

## 4. Submitting the Form

- 在下一小節 [**04. Submitting and Using the Form**](./04-(td)-submitting-and-using-the-form.md) 中，我們將探討如何提交表單並存取代表使用者輸入的鍵值對。
- 透過提交表單，我們可以查看每個輸入欄位中輸入的資料。

遵循這些步驟，Angular 將根據**模板驅動**的方法創建表單的 JavaScript 物件表示。 `FormsModule` 提供了更多功能和對表單的控制，我們將在以後的課程中進一步探討。