# 01. Building and Using a Dropdown Directive

歡迎回來到食譜書這個專案。

在這一節中，我們已經在使用指令的部分使用了 `ngIf` 和 `ngFor`，但現在我想通過添加我們自己的指令來增強這個專案，這樣我們就可以打開目前無法點擊的 ` Manage ▾ ` 下拉選單。

它們無法工作是因為我們沒有導入 Bootstrap 的 JavaScript 程式碼。

我不想導入它，因為 Angular 應該是唯一與我的 DOM 互動的東西。

但現在有了指令的知識，我們可以創建自己的指令來操作這些按鈕。

## Creating a Dropdown Directive

我將在共享資料夾 `shared` 中添加指令，並將其命名為 `dropdown` ：

```shell
cd src/app/shared/
```

```shell
ng g d dropdown
```

```
CREATE src/app/shared/dropdown.directive.spec.ts (232 bytes)
CREATE src/app/shared/dropdown.directive.ts (145 bytes)
UPDATE src/app/app.module.ts (1207 bytes)
```

這裡我會將用於測試的 `spec` 檔案刪除。

## Implementing the Dropdown Directive

那麼，這個指令應該做什麼呢？

我想添加一些功能，使我們可以在點擊時將某個 CSS 類別添加到它所在的元素上。

所以一旦點擊這個指令所在的元素，就添加該類，再次點擊則移除，就這樣。

> **Hint**:
> 監聽點擊事件，然後切換一些屬性，確定是否附加某個類。 同樣，試著實現一些動態附加或移除 CSS 類的程式碼。 不過，在你開始之前，讓我們找出需要附加的 CSS 類別。

### Finding the CSS Class to Attach

如果你在這裡的食譜詳細信息 component 中，將 `open` CSS 類別附加到包含按鈕組的 `div` 上，然後在應用程式中選擇該食譜。

你會看到，它看起來就像打開了下拉選單。

所以這就是 `open` CSS 類別。

對於 header 中的用法也是一樣，我們需要附加它。

實作一個 `dropdown` 指令，每次點擊時附加這個類，再次點擊時移除它。

現在讓我們一起建立這個指令。

就像之前解釋的，我想在點擊時切換它。

所以我們必須監聽點擊（`click`）事件。

我應該添加 `@HostListener` ，它需要從 `@angular/core` 中導入。

然後我想執行一個 callback 方法，姑且就將其命名為 `toggleOpen()` ，這個名字看起來很合適，因為這就是我想做的。

我想切換它是否應該打開。

好吧，然後我會添加 `isOpen` 屬性，最初設置為 `false` 。

在我的 `@HostListener` 標記的方法中，我只需要設置點擊後將 `isOpen` 重新賦值為當前的相反值即可。

所以如果 `isOpen` 是 `true` ，現在它將被設置為 `false` ，反之亦然：

- [`dropdown.directive.ts`](../../course-project-1/src/app/shared/dropdown.directive.ts)

```ts
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  isOpen = false;

  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
```

所以這樣，我現在切換了這個屬性。 而何時要動態附加或移除一個 CSS 類別，就取決於這個 `isOpen` 屬性。

### Binding `isOpen` to the Host Element

接著我們需要做的是將 `isOpen` 標記 `@HostBinding` ，它也需要從 `@angular/core` 中導入，允許我們綁定到指令所放置的元素的屬性。

在這裡，我想綁定到該元素的 `class` 屬性陣列中的 `open` 類別，這是我們需要動態附加或移除的 CSS 類別：

- [`dropdown.directive.ts`](../../course-project-1/src/app/shared/dropdown.directive.ts)

```ts
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')
  isOpen = false;

  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
```

> **Note**:
> `class` 屬性是一個包含元素所有類別的陣列。

現在，其餘的工作將由 Angular 處理。

由於綁定到 `isOpen`，初始時它不會被附加，每當 `isOpen` 切換為 `true` 時，它將被附加，每當它切換為 `false` 時，它將被移除。

這就是我們整個指令的內容。

## Registering the Dropdown Directive

現在，為了能夠使用它，我需要進入 `app` module ，並在這裡添加 `dropdown` 指令，並導入指向 `shared` 檔案夾的引用。

引入後，現在我們才可以使用它。

幸運的是 Angular CLI 已經為我們完成了這些工作。

## Using the Dropdown Directive

現在我們可以在應用程式中使用它。

### In Recipe Detail Component

在 [`recipe-detail.component`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html) 中，我必須在最後打開的 `div` 或元素上使用它。

所以在這種情況下，使用具有 `btn-group` 這個 CSS 類別的 `div` 。

在這裡，我將添加我的自定義 `appDropdown` 指令，不需要使用方括號，也不需要指定任何值，因為我不需要在這個指令上指定任何參數或內容：

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```html
    ...
    <div
      class="btn-group"
      appDropdown>
    ...
```

### In Header Component

現在在標題中，這個需要添加的地方是具有 `dropdown` 類別的 `<li>` 元素：

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```html
        ...
        <li class="dropdown" appDropdown>
        ...
```

## Summary

最後，讓我們保存並在應用程式中查看它。

非常好！ 它的工作方式完全符合我的要求。