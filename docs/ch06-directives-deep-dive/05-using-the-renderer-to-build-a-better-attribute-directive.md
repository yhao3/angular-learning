# 05. Using the Renderer to Build a Better Attribute Directive

在上一堂課中，我們創建了我們的第一個基本指令，它已經在發揮作用。

我們學會了如何創建一個選擇器，以及如何使用這個選擇器，例如在這種情況下，作為一個屬性，因為我們設置了一個屬性選擇器，以及如何在 `app.module.ts` 中註冊它。

我們還學會了如何獲取指令系統的元素。

## Don't Access the DOM Directly

然而，這並不是改變樣式的最佳方式，因為正如你可能在本課程的早期章節中回憶起的那樣，直接訪問元素並不是一個好的實踐。

你應該使用一種不同的工具，我一會兒就會給你看，因為 Angular 實際上也能夠在沒有 DOM 的情況下渲染你的模板，這些屬性可能就不可用了。

它可以在使用服務器的情況下進行，所以基本上是一些高級用例，但無論如何，直接訪問元素並不是一個好的實踐。

那麼該如何訪問它們呢？ 嗯，這裡有一個更好的方法，你可以在 renderer 這裡找到它，所以讓我們這麼做，但實際上我們不要在我們的 `basic-highlight` 指令中這麼做。

## Creating a `better-highlight` Directive

讓我們創建一個新的指令，為此，我將使用 CLI 來創建，該指令將被命名為 `better-highlight` 並存放在 `better-highlight` 資料夾：

```shell
take src/app/better-highlight

ng g d better-highlight
```

```
CREATE src/app/better-highlight/better-highlight.directive.spec.ts (261 bytes)
CREATE src/app/better-highlight/better-highlight.directive.ts (159 bytes)
UPDATE src/app/app.module.ts (615 bytes)
```

執行後將會創建 2 個新的檔案，並更新 `app.module.ts` 檔案。

我可以刪除 `spec` 測試檔案。

> **Note**:
> 你也可以創建一個 `shared` 或 `directives` 資料夾來存儲所有指令。 現在，只是為了示範目的和清晰分離，使其易於看到，我將把它們放在個別的檔案夾中。

在 [`better-highlight.directive.ts`](src/app/better-highlight/better-highlight.directive.ts) 中，我們得到一個 `better-highlight` 的選擇器 `appBetterHighlight` 。

## Injecting the `Renderer`

現在開始注入這個我所提到的更好的工具。 它就是 renderer，類型是 `Renderer2` ，需要從 `@angular/core` 中導入它：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {

  constructor(private renderer: Renderer2) { }

}
```

## Using the `Renderer` and `ElementRef` to Set a Style

現在有了這個注入，我們可以使用它，我將再次使用 `ngOnInit` 來遵循這種初始化工作的最佳實踐。

確保在這裡導入 `ngOnInit` 或者只是 `OnInit` ，從 `@angular/core` 中，現在讓我們在這裡實現 `ngOnInit`，然後我現在可以使用 `renderer` 。

我通過調用這裡我創建的私有 `renderer` 屬性來實現這一點，那裡我們可以獲得一些幫助方法，可以用來處理 DOM 。

現在，我在這裡感興趣的一個重要方法是 [`setStyle()`](https://github.com/angular/angular/tree/16.0.4/packages/core/src/render/api.ts#L183-L191) 方法：

```ts
 /**
   * Implement this callback to set a CSS style for an element in the DOM.
   * @param el The element.
   * @param style The name of the style.
   * @param value The new value.
   * @param flags Flags for style variations. No flags are set by default.
   */
  abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void;
```

該方法允許我們設置某個元素的樣式：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { Directive, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle( );
  }

}
```

現在的問題是，為了這個，我們需要有我們想要設置樣式的元素。

在 Angular 中，當然有不同的方法來獲取這樣的元素，在這個指令中，這是特別簡單的。

我們已經在 `basic-highlight` 指令瞭解到如何獲取元素。 我們可以簡單地注入 `ElementRef` 。

所以我在這裡添加另一個私有屬性，這將自動綁定到一個我應該說是私有屬性的私有屬性，我將其命名為 `elRef` ，它的類型將是 `ElementRef` ，同樣，我們需要從 `@angular/core` 中導入 `ElementRef` ：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  ...
}
```

### Parameter 1 - `el`: The element

現在有了這個導入，我現在可以通過調用 `this.elRef` 來使用這個 `ElementRef` ，在這裡，我想要訪問 `nativeElement` ，這很重要。

我們不能直接傳遞引用本身，我們需要訪問其 `nativeElement` 底層元素並將其作為第一個參數傳遞給 `setStyle()` 。

### Parameter 2 - `style`: The name of the style

現在， `setStyle()` 接受幾個其他的參數。

我們已經定義了我們要樣式化的元素。

現在，我們必須定義我們要設置的樣式，這將是我們的情況下的背景顏色 `'background-color'` 。

### Parameter 3 - `value`: The new value

通過定義 `style` 屬性，我們通過第 3 個參數將其傳遞給 `setStyle()` 方法，這個值是我們為這個屬性分配的值。

現在，我們可以將背景顏色設置為藍色：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
```

### Parameter 4 - `flags`: Flags for style variations

第四個也是最後一個參數是一個標誌物件。

在這裡，我們可以為這個樣式設置幾個標誌。

這是可選的，我將在這裡省略它。

你可以在這裡設置一些東西，例如如果你想為一個樣式添加一些重要文字或者註釋以覆蓋我們的樣式，或者其他類似的東西。

## Using the `better-highlight` Directive

現在，如果我們保存這個檔案，並且已經將 `better-highlight` 指令添加到了 `app` 模塊中，我們可以轉到 `app` 元件模板中使用它。

我將簡單地複製 <p> 段落，然後在這裡使用 appBetterHighlight 指令，我們透過選擇器來引用它，因為我們已經將它加入到 `app` 模塊中：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
      ...
      <p appBasicHighlight>Style me with basic directive!</p>
      <p appBetterHighlight>Style me with better directive!</p>
      ...
```

現在，如果我們保存並重新編譯這個檔案後，重新加載瀏覽器，你會發現在該段落後面出現了藍色的背景。 這意味著我們的新指令 `better-highlight` 已經生效了，而且我們正在使用 `renderer` 這種更好的方式來訪問 DOM。

## Summary

那麼為什麼 `renderer` 是一種更好的方法呢？ 原因在於 Angular 不僅僅限於在瀏覽器中運行。

例如，當與服務器一起使用時，可能會遇到無法訪問 DOM 的情況。

因此，如果你試圖像在 `basic-highlight` 中直接訪問本地元素並改變其樣式，你可能會在某些情況下遇到錯誤。

然而，如果你使用 `renderer`，Angular 將負責處理這些 DOM 操作，並確保在不同環境中都能正常工作。

因此，使用 `renderer` 是一種更佳的做法，它提供了一種通用的方式來改變元素的樣式，並與 Angular 的渲染器一起使用。

這就是為什麼我建議在這種情況下使用 `renderer`。

希望這對你有所幫助！