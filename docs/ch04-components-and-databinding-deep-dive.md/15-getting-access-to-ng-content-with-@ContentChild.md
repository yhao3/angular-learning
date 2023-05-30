# Getting Access to ng-content with `@ContentChild`

## `@ContentChild()` in Angular 8+

在 Angular 8+ 中， `@ContentChild()` 語法需要稍作修改：

不再使用：

```ts
@ContentChild('serverContentInput')
serverContentInput: ElementRef;
```

而是使用

```ts
@ContentChild('serverContentInput', {static: true})
serverContentInput: ElementRef;
```

同樣的變更（將 `{ static: true }` 作為第二個參數）需要應用於所有使用 `@ContentChild()` 的地方（以及稍後你將學習到的 `@ContentChild()` ），如果你計劃在 `ngOnInit()` 內訪問所選元素，則將其設置為 `true` 。 反之則設置為 `false` 。

如果你使用的是 Angular 9+，只需根據需要添加 `{ static: true }`（不需要添加 `{ static: false }` ）。

## Access the ng-content with `@ContentChild`

在上一堂課中，我們學到了我們可以使用 `@ViewChild` 來在生命週期鉤子中存取它。

現在，還有一個不錯的小補充。

在 `app` 元件中，我們將我們的內容添加並投影到 `server-element` 元件中。

假設我們還想在這個 `<p>` 標籤上設置一個本地引用，比如 `contentParagraph` ：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
...
        <p #contentParagraph>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
...
```

但現在我們希望在最終將這個內容放到的 `server-element` 元件中使用它。

現在，在 `app` 元件中，我們目前是將它放在模板中的地方，我們可以使用 `@ViewChild` ，因為它在 `app` 元件的模板中，即使它稍後會被傳遞到 `server-element` 元件中。

由於我們知道它會在那裡，如果我們也能從 `server-element` 元件中訪問它就太好了，但 `@ViewChild` 是不起作用的，因為它不是**視圖（View）**的一部分，而是**內容（Content）**的一部分，這就是為什麼我們在這裡還有單獨的 `ContentInIt` 和 `ViewInIt` 鉤子。

偉大的事情是，我們不僅擁有 `@ViewChild` ，還有 `@ContentChild` ，同樣需要從 `@angler/core` 中引入。

現在，我們還可以傳遞一個選擇器，例如 `contentParagraph` 這個引用名稱，它在 `app` 元件的 HTML 檔案中顯示。 然後，就像使用 `@ViewChild` 一樣，我們可以將它存儲在某個屬性中，類型為 `ElementRef` ，就像這樣，現在我們可以使用它：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
import { ..., ContentChild, ... } from '@angular/core';

...
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  ...
  @ContentChild('contentParagraph', { static: true })
  paragraph: ElementRef;
  ...
}
```

就像 View 一樣，當然在達到 `ContentInIt` 之前我們無法訪問其值或任何內容。

這就是我想要補充的內容，使用 `@ContentChild` 來訪問存儲在另一個元件中的內容，然後通過 `ng-content` 傳遞。

現在讓我輸出這個，我將在 `OnInIt` 中輸出它以證明它不存在。

這裡，我將簡單輸出段落的文字內容，然後，我將將此複製到 `AfterContentInIt` 中：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
...
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  ngOnInit() {
    console.log('ngOnInit called!');
    ...
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }
  ...
  ngAfterContentInit() {
    console.log('ngAfterContentInit called!');
    ...
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }
  ...
}
```

現在，一旦我保存並重新載入應用程式，你會在 OnInIt 中會是空的；但在此之後，即在  `ngAfterContentInit` 或在此之後被調用之後，一旦調用了這個鉤子，我們會看到段落的文字內容：

```
ngOnInit called!                                  server-element.component.ts:33
Text Content of paragraph:                        server-element.component.ts:34
...
ngAfterContentInit called!                        server-element.component.ts:43
Text Content of paragraph: Just a test!           server-element.component.ts:44
```
```

所以現在 Content 已經初始化了。