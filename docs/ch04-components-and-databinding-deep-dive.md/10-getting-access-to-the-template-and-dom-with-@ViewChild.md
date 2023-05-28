# 10. Getting Access to the Template & DOM with `@ViewChild`

## `@ViewChild()` in Angular 8+

在 Angular 8+ 中， `@ViewChild()` 語法需要稍作修改：

不再使用：

```ts
@ViewChild('serverContentInput') serverContentInput: ElementRef;
```

而是使用

```ts
@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
```

同樣的變更（將 `{ static: true }` 作為第二個參數）需要應用於所有使用 `@ViewChild()` 的地方（以及稍後你將學習到的 `@ContentChild()` ），如果你計劃在 `ngOnInit()` 內訪問所選元素，則將其設置為 `true` 。 反之則設置為 `false` 。

如果你使用的是 Angular 9+，只需根據需要添加 `{ static: true }`（不需要添加 `{ static: false }` ）。

## Access the Template & DOM with `@ViewChild`

在上一堂課中，我們學習了本地參考（local references）。

現在，我們還有另一種方式可以直接從我們的 TypeScript 程式碼中獲取對本地參考或任何元素的存取。

目前，我們是在呼叫方法時傳遞參考，這樣做沒問題，但有時你想在呼叫方法「之前」獲取存取。

在 TypeScript 中，有一個不錯的小標記可以用來獲取這個存取。

讓我們藉由重構 server content 輸入框來看看這是如何運作的。

所以在 [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html) 中，我將不使用雙向資料綁定的舊解決方案，並加上一個本地參考 `serverContentInput` ：

- [`cockpit.component.html`](../../cmp-databinding/src/app/cockpit/cockpit.component.html)

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <!-- <input type="text" class="form-control" [(ngModel)]="newServerContent"> -->
    <input 
      type="text" 
      class="form-control" 
      #serverContentInput>
    ...
```

現在，在 `cockpit` 元件中，我也會將這裡的舊的 `newServerContent` 註解掉，並添加一個新的屬性，我將其命名為 `serverContentInput` 。 然後將該屬性標記為 `@ViewChild` 。

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
import { ..., ViewChild } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  ...
  @ViewChild()
  serverContentInput;
  ...
}
```

接著我們還需要在 `@ViewChild` 的括號中傳遞 2 個參數。

### The First Arugment of `@ViewChild`

第一個參數實際上是「元素的選擇器」。

但這個選擇器現在不是像 CSS 選擇器一樣，而是例如，我們可以將「本地參考的名稱」直接作為字串參數傳遞。

所以， `serverContentInput` 這個本地參考現在可以作為一個字串傳遞：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  ...
  @ViewChild('serverContentInput', ...)
  serverContentInput;
  ...
}
```

如果你不想傳遞字串，而是想選擇一個元件，你也可以直接在這裡傳遞「元件類型」。

所以，在 `cockpit` 元件中，我們不使用其他元件，但在 `app` 元件中，我們可以傳遞 `cockpit` 元件的類型，就像這樣，而不是傳遞字串，以獲取在 `app` 元件中的第一個出現的 `cockpit` 元件的存取。

但在這裡，我將其使用對「本地參考」的存取，這可能是你最常見的用法。

### The Second Arugment of `@ViewChild`

第二個參數則為 `{ static: true }` ，如果你計劃在 `ngOnInit()` 內訪問所選元素，則將其設置為 `true` 。 反之則設置為 `false` 。

如果你在 `ngOnInit()` 中不訪問所選元素（而是在組件的其他地方訪問），則將 `static: false` 設置為相反的。


- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  ...
  @ViewChild('serverContentInput', {static: true})
  serverContentInput;
  ...
}
```

現在，我們就可以存取我們的 `serverContentInput` 本地參考了。

那麼 `serverContentInput` 實際上保存了什麼呢？

讓我們快速註解掉目前編譯錯誤的程式碼，然後在 console 輸出這個 `serverContentInput` ：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  @ViewChild(CockpitComponent, {static: true})
  serverContentInput
  ...
  onAddServer(nameInput: HTMLInputElement) {
    console.log(this.serverContentInput);
    // this.serverCreated.emit(
    //   {
    //     serverName: nameInput.value,
    //     serverContent: this.newServerContent
    //   }
    // );
  }
  ...
}
```

如果現在回到我們的應用程式，輸入一些內容然後點擊新增伺服器，我們會 console 輸出一個類型為 `ElementRef` 的元素：

```ts
ElementRef {nativeElement: input.form-control}
```

所以，與我們直接通過方法從模板中傳遞的本地參考不同，這是 `ElementRef` 類型。

所以，我們可以在 TypeScript 中為 `serverContentInput` 屬性宣告 `ElementRef` 這個類型：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
import { ..., ElementRef, ... } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  ...
  @ViewChild(CockpitComponent, {static: true})
  serverContentInput: ElementRef; // <-- ElementRef
  ...
  onAddServer(nameInput: HTMLInputElement) {
    console.log(this.serverContentInput);
    // this.serverCreated.emit(
    //   {
    //     serverName: nameInput.value,
    //     serverContent: this.newServerContent
    //   }
    // );
  }
  ...
}
```

> **Note**: 
> `ElementRef` 需要從 `@angular/core` 中導入，它是一個 Angular 類型。

然而，這個 `ElementRef` 具有一個我們可以使用的重要屬性，那就是 `nativeElement` 。

我們可以使用 `serverContentInput` 以及 `nativeElement` 來獲取對底層元素的存取，這個底層元素現在有一個 `value` 值，因為這將是輸入元素：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  @ViewChild(CockpitComponent, {static: true})
  serverContentInput: ElementRef;
  ...
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit(
      {
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
      }
    );
  }
  ...
}
```

現在我們當然也可以對 `onAppBlueprint` 方法做同樣的處理，這樣我們就可以直接通過 @`ViewChild `獲取我們的 DOM 中的元素，也可以直接從我們的模板中獲取存取：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  @ViewChild(CockpitComponent, {static: true})
  serverContentInput: ElementRef;
  ...
  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit(
      {
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
      }
    );
  }
  ...
}
```

你應該看到，現在如果我們在這裡輸入一些內容，然後點擊按鈕，它就可以正常運作。

現在不使用雙向資料綁定，而是使用本地參考傳遞給方法或通過 `@ViewChild` 獲取的本地參考。

## ⚠️ Important: Don't Change the element through `@ViewChild`

現在，有一個重要的事情需要注意，你不應該通過這種方式更改元素。 例如將 `serverContentInput.nativeElement.value` assign 一個新的值：

```ts
this.serverContentInput.nativeElement.value = 'Something';
```

這樣確實是可以運作的。 但是，我強烈建議不要這樣做。

你不應該直接存取 DOM ！

Angular 為你提供了更好的存取 DOM 的方式，在指令一節中你將學到這些。

一般情況下，如果你想要在 DOM 中輸出內容，你應該使用其他工具，比如「字串插值」和「屬性綁定」，而不是直接操縱任何你可以獲得的元素，即使你是通過 Angular 獲得它們。
