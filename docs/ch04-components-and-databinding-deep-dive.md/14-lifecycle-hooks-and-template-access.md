# 14. Lifecycle Hooks and Template Access

在結束本模組之前，還有一件與我們的鉤子相關的事情。

我們學到了 `@ViewChild` ，我們可以在 `cockpit` 元件中使用它來獲取對我們的元素，也就是 DOM 中的元素，從我們的模板中。

讓我們在這裡的 `server-element` 元件的 HTML 檔案中進行相同的操作，其中我們有所有這些生命週期鉤子。

假設我想要獲取對這個標題的訪問權限，所以我只需要在它上面放置一個名為 `heading` 的本地引用：

- [`server-element.component.html`](../../cmp-databinding/src/app/server-element/server-element.component.html)

```html
<div
  ...
  <div class="panel-heading" #heading>{{ name }}</div>
  ...
```

因此，我將在 [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts) 中添加一個新的 `@ViewChild` 屬性，並確保從 `@angular/core` 中引入 `ViewChild` ，並將資料存儲在一個名為 `header` 的屬性中，類型為 `ElementRef` ，正如我們所學的，這也需要從 `@angular/core` 中引入：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
import { ..., ElementRef, ..., ViewChild, ... } from '@angular/core';

...
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  ...
  @ViewChild('heading', { static: true })
  header: ElementRef;
  ...
}
```

我想要選擇這個 `<div class="panel-heading" #heading>` 上剛剛放置的 `heading` 本地引用。

這樣我們就可以獲取它，現在我們期望在達到 `AfterViewInit` 之前無法使用它。

所以讓我們在 `ngOnInIt` 中試試看：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
...
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  ...
  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('Text Content: ' + this.header.nativeElement.textContent);
  }
  ...
}
```

現在如果保存並查看 console，我們可以發現沒有內容：

```
ngOnInit called!                    server-element.component.ts:30 
Text Content:                       server-element.component.ts:31
```

如果我複製完全相同的程式碼並將其放在這裡的 `AfterViewInit` 中：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
...
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  ...
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Text Content: ' + this.header.nativeElement.textContent);
  }
  ...
}
```

所以在視圖初始化之後，我們在 console 看到了 `Testserver` ：

```
ngAfterViewInit called!            server-element.component.ts:47
Text Content: Testserver           server-element.component.ts:48
```

所以這就是這些鉤子運行的時間點之間的區別。

`AfterViewInit` 讓你可以訪問模板元素。

然後你可以訪問它們並使用它們的值等等。

在達到此鉤子之前，你不能這樣做。

你不能檢查 DOM 中某個元素的值，因為它還沒有被渲染出來。