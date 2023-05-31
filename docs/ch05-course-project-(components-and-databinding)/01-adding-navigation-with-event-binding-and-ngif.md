# 01. Adding Navigation with Event Binding and ngIf

我想在這個課程中開始的事情是將導航連結到載入食譜或購物清單。

現在我們稍後將學習一種以正確方式完成此操作的方法，但我們現在將創建的解決方案也非常有創意且不錯。

我將使用 `ngIf` 來一次只載入兩個部分中的一個。

因此，在我的 `app` component 中，可能需要在這裡管理應該顯示哪一個，並且我應該確定在 `header` component 中顯示哪一個：

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```html
<app-header></app-header>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <app-recipes></app-recipes>
      <app-shopping-list></app-shopping-list>
    </div>
  </div>
</div>
```

因此，我應該將所點擊的連結的信息傳遞給我的 `app` component ，以便我可以在那裡切換一個屬性，只顯示這兩個 component 中的一個。

## 1. Adding Event Binding to the `header` Component

### 1.1 Listening to Click Events in the Template

我將從 `header` component 模板開始：

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```html
...
<li><a href="#">Recipes</a></li>
<li><a href="#">Shopping List</a></li>
...
```

在這裡，我們有這兩個 `<a>` 連結，我想要將 `click` 監聽器附加到這些 `<a>` 連結上。

至於事件的 callback 將命名為 `onSelect` ，然後我將傳遞一個字串：

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```html
<li><a href="#" (click)="onSelect('recipe')" >Recipes</a></li>
<li><a href="#" (click)="onSelect('shopping-list')" >Shopping List</a></li>
```

### 1.2 Declaring the `onSelect` Method in TypeScript

現在，在 `header` component 中，我當然需要實現 `onSelect` ：

- [`header.component.ts`](../../course-project-1/src/app/header/header.component.ts)

```ts
...
export class HeaderComponent {

  onSelect(feature: string) {
    // 將選中的 feature 傳遞給父 component (app)
  }
}
```

### 1.3 Emitting the `featureSelected` Event in the `header` Component

現在在 `onSelect` 方法中，我想要發出一個事件，以便我可以在 `app` component 中監聽它，並在那裡執行一些操作。

首先，我需要先在 [`header.component.ts`](../../course-project-1/src/app/header/header.component.ts) 添加一個新的屬性。

1. 我將其命名為 `featureSelected`
2. 而這個屬性是一個 `EventEmitter` 事件發射器
3. 最後我會將它標記 `@Output` 將此事件公開給父 component

- [`header.component.ts`](../../course-project-1/src/app/header/header.component.ts)

```ts
import { ..., EventEmitter, Output } from '@angular/core';
...
export class HeaderComponent {

  @Output()
  featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
```

## 2. Listening to the `featureSelected` Event in the `app` Component

### 2.1 Listening to the `featureSelected` Event in the Template

現在我們可以在 `app` component 中使用 `header` component 的地方監聽「浮」出來的 `featureSelected` 事件。 又因為是浮出來的，所以我們可以使用 `$event` 拿取該事件帶來的資料，並把它繼續傳遞給 `onNavigate` callback：

> **Note**:
> `featureSelected` 事件的「入口」是在 `header` 自己的模板中；而 `featureSelected` 的「出口」則是在父元件 `app` 的模板中。

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```html
<app-header (featureSelected)="onNavigate($event)"></app-header>
...
```

### 2.2 Declaring the `onNavigate` Method in TypeScript

在 `onNavigate` 中要控制要顯示的 component，所以我們需要一個 `loadFeature` 屬性來存儲這個信息：

- [`app.component.ts`](../../course-project-1/src/app/app.component.ts)

```ts
...
export class AppComponent {

  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
```

## 3. Using `ngIf` to Output Only One Component

現在，我們可以使用 `ngIf` 來根據 `loadFeature` 的值，決定應該顯示哪個 component ：

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```html
...
<app-recipes *ngIf="loadedFeature === 'recipe'"></app-recipes>
<app-shopping-list *ngIf="loadedFeature === 'shopping-list'"></app-shopping-list>
...
```

如果 `loadedFeature` 等於 `recipe` ，應該顯示 `recipe` component ；反之則顯示 `shopping-list` component 。