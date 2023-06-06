# 04. Creating a Basic Attribute Directive

所以我們已經使用像 `ngClass` 和 `ngStyle` 這樣的屬性指令。

一旦我們建立了自己的指令，就更容易理解該如何操作。

## Creating a Highlight Directive

所以我想建立一個指令，它可以在元素上進行簡單的高亮顯示。

當然，我可以用普通的 CSS 樣式達到相同的效果，但這只是一個好的示範。

### Creating a `basic-highlight` Folder and `basic highlight.directive.ts` File

```
src
├─ app
│  ├─ basic-highlight
│  │  ╰─ basic-highlight.directive.ts
│  ├─ ...
```

所以我會創建一個新的資料夾，並將其命名為 "`basic-highlight`" ，在其中我將創建一個 `basic-highlight.directive.ts` 新檔案：

- [`basic-highlight.directive.ts`](../../directives/src/app/basic-highlight/basic-highlight.directive.ts)

```ts
import { Directive } from '@angular/core';  // (3)

@Directive({                                // (2)

})
export class BasicHighlightDirective {      // (1)

}
```

1. 在這個檔案中，我將導出一個類別，名為 `BasicHighlightDirective` 。
2. 接著，為了描述這個類別是什麼，並使其成為一個指令，就像在 component 中添加 "`@Component`" 一樣，這裡我們需要將其標記為 "`@Directive`" 。
3. 而 "`Directive`" 需要從 "`@angular/core`" 中引入。

## Configuring a Directive

那麼，我們如何配置一個指令呢？

### Configuring a "unique" Selector

我們的指令絕對需要的一個東西是選擇器。

因為記住，我們在模板中放置指令，將它們附加到元素上，所以我們需要一種方法向 Angular 提供這個指示，這就是選擇器。

在這裡，這應該也是一個唯一的選擇器。

通常，在這裡你使用「駝峰式」命名法，例如 "`appBasicHighlight`" 。

現在我想要這個是一個屬性風格，所以我要用方括號 `[]` 將 `appBasicHighlight` 括起來，這意味著只要我在元素上添加 "`appBasicHighlight`" 而不帶有方括號，這將被 Angular 辨識：

- [`basic-highlight.directive.ts`](../../directives/src/app/basic-highlight/basic-highlight.directive.ts)

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective {

}
```

### Injecting the Element the Directive Sits On

現在為了實作顯示效果，我們需要做一些使我們能夠看到這一點的視覺黏合劑。

最基本的事情是，我們附加這個指令的元素的背景顏色。

為此，我們需要訪問指令所在的元素。

而很酷的是，Angular 給了我們這個訪問權限。

我們可以將指令所在的元素注入到這個指令中。

> **Note**:
> 注入（Injection）是我們將在下一個課程模組中更仔細地看一下的東西，那是關於服務的。 基本上，它是一種簡單的方式來訪問其他類別，而不需要自己實例化它們。

我們通過添加構造函數來進行注入。 在參數列表中，我們列出了一些參數，當創建這個類別的實例時，你想要獲取這些參數。

當然，Angular 負責創建這些實例。

因此，如果我們告訴它請給我們一個特定類型的參數，這就是注入。

Angular 將嘗試創建我們需要的這個東西並將其給予我們。

至於我們需要的這個東西，在這種情況下只是對指令所放置的元素的引用。

所以一個元素引用，這個名字完全取決於你，但類型是重要的。 類型必須是 `ElementRef` 。

> 在 [`@ViewChild`](../ch04-components-and-databinding-deep-dive.md/10-getting-access-to-the-template-and-dom-with-@ViewChild.md) 中我們有介紹過。 在那裡，它也是對某個元素的引用。 在這裡，也是如此。

現在，為了能夠在這個類別中使用這個資料，我們可以使用 TypeScript 的一個特性，它允許我們在構造函數中添加一個修飾符，這個修飾符會自動將這個參數設置為一個屬性。

因此我們在 `elementRef` 前面添加 "`private`" 修飾符，將其設置為這個類的屬性：

- [`basic-highlight.directive.ts`](../../directives/src/app/basic-highlight/basic-highlight.directive.ts)

```ts
import { ..., ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective {
  constructor(private elementRef: ElementRef) {

  }
}
```

所以我們獲得了這個實例，我們可以通過這個屬性獲得它。

現在，我們可以在構造函數中使用它，例如訪問 `nativeElement` ，然後對其進行一些操作。

但是，比構造函數更好的地方是 `OnInIt` 。

就像 component 一樣，指令也有 `ngOnInIt` 周期鉤子。

所以，在這裡我可以添加 `ngOnInIt()` 。 在其中，我可以訪問 `elementRef` 屬性，這是一個自動為我提供這個屬性的捷徑，訪問 `nativeElement` 。 然後訪問 style，將其 `backgroundColor` 設置為綠色，以便我們可以看到一些變化：

- [`basic-highlight.directive.ts`](../../directives/src/app/basic-highlight/basic-highlight.directive.ts)

```ts
import { ..., OnInit } from '@angular/core';

...
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
```

所以我們在這裡做的是，我們獲得了指令所在的元素的訪問權限。

然後，我們重寫了這個元素的樣式。

## Using the Directive

現在讓我們使用這個指令。

要使用它，我們需要做兩件事。

### 1. Inform Angular About the Directive

首先，就像對於 component 一樣，我們需要告訴 Angular 我們有一個新的指令。

所以我們需要去 [`app.module.ts`](../../directives/src/app/app.module.ts) 中，並在 `declarations` 中添加我們的 `BasicHighlightDirective` ，同樣也要添加指向 `basic highlight` 資料夾的引入，以及指向 `BasicHighlightDirective` 檔案的引入：

- [`app.module.ts`](../../directives/src/app/app.module.ts)

```ts
...
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

@NgModule({
  declarations: [
    ...
    BasicHighlightDirective
  ],
  ...
})
export class AppModule { }
```

### 2. Use the Directive

現在有了這個，我們可以在我們的 `app` component 的 HTML 檔案中使用這個指令。

在我們所有的列表下方，我只會添加一個新的 `<p>` 段落，並對這個段落添加 `appBasicHighlight` 這個我們自定義的選擇器。 我們不需要設置任何值。

而且重要的是，我們不使用方括號 `[]` ，因為如我已經強調的，指令名稱只是我們在 [`basic-highlight.directive.ts`](../../directives/src/app/basic-highlight/basic-highlight.directive.ts) 中設置的選擇器。

而這裡的方括號不是名稱的一部分，而是這個選擇器樣式的一部分，告訴 Angular 請將其作為元素上的屬性選擇。：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
      ...
      <p appBasicHighlight>Style me with basic directive!</p>
      ...
```

這就是我們在這裡添加它的方式，就像段落的屬性一樣。

有了這個，如果我們儲存這個，我們確實在我們的列表下方看到一個綠色的段落，因為我們的指令在這裡工作。

所以這就是如何創建一個簡單的指令，並在元素上應用樣式。