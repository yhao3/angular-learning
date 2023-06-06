# 08. Binding to Directive Properties

我們的指令看起來非常不錯。

我們快要完成了，但我還想添加一個功能。

目前指令是以動態方式工作的，我們可以將滑鼠懸停在上面，然後移開滑鼠，但我們無法決定使用哪些顏色。

現在，假設我們想要隨著第三方套件一起提供該指令，那麼使用這個指令的開發者應該能夠動態設定這個「顏色」的值。

目前，顏色是寫死的，預設情況下是透明的，如果滑鼠懸停在上面則是藍色。

所以這是我們可以改進的地方，我們可以使用我們已經學過的工具來改進它。 也就是「自定義屬性綁定（Custom property binding）」。

> **Note**:
> 「自定義事件綁定」和「指令」也可以，但你可能不會經常使用它們。

## Making the Color Dynamic

那麼我們如何使用自定義屬性綁定呢？

首先讓我們添加 2 個屬性進行綁定。

我在這裡使用 `@Input` 來標記它們，並將第一個命名為 `defaultColor` ，並將其設置為字串，初始值是透明的。 第二個則是 `highlightColor` ，也是字串，初始值是藍色：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { ..., Input, ... } from '@angular/core';
...
export class BetterHighlightDirective implements OnInit {

  @Input()
  defaultColor: string = 'transparent';

  @Input()
  highlightColor: string = 'blue';
  ...
}
```

> **Note**:
> 記得要從 `@angular/core` 中導入 `@Input` 。

所以我們有一些預設值可供使用，但它們可以從外部覆寫。

現在預設情況下，我將 `backgroundColor` 賦值為 `this.defaultColor` 作為初始值；而對於 `@HostListener` 中，如果滑鼠懸停在上面，我將 `backgroundColor` 設置為 `this.highlightColor` ，如果滑鼠移開，我將 `backgroundColor` 設置為 `this.defaultColor` ：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
...
export class BetterHighlightDirective implements OnInit {

  @Input()
  defaultColor: string = 'transparent';

  @Input()
  highlightColor: string = 'blue';

  @HostBinding('style.backgroundColor')
  backgroundColor: string = this.defaultColor;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  ...
  @HostListener('mouseover')
  mouseover(event: Event): void {
    // ...
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave')
  mouseleave(event: Event): void {
    // ...
    this.backgroundColor = this.defaultColor;
  }

}
```

有了這個，它應該仍然像之前一樣正常工作，不同的是，現在我們的顏色可以從外部進行綁定了。

## Using the Directive with Custom Properties

因此，在我們使用 `better-highlight` 指令的應用程式元件中，我們現在可以綁定到 `defaultColor` ，並將其設置為黃色；對於 `highlightColor` 則是紅色：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
      ...
      <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">Style me with better directive!</p>
      ...
```

> **Note**:
> 注意，我們必須使用單引號將字串包裹起來，因為綁定的屬性型別是一個字串。

現在，如果我們儲存更動，會看到效果變成紅色和黃色。

## Fixing the Default Color Issue

但在我們滑鼠游標懸停之前，我們會發現預設仍是透明的，而不是黃色。

為了防止這種情況發生，我們可以改在 `ngOnInit` 狀態中對 `backgroundColor` 進行初始化：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
...
export class BetterHighlightDirective implements OnInit {

  @Input()
  defaultColor: string = 'transparent';

  @Input()
  highlightColor: string = 'blue';

  @HostBinding('style.backgroundColor')
  backgroundColor: string; // backgroundColor: string = this.defaultColor;
  ...
  ngOnInit(): void {
    // ...
    this.backgroundColor = this.defaultColor;
  }
  ...
}
```

現在，我們預設情況下是黃色，這樣它現在可以工作了，我們現在能夠覆寫它。

## Something Interesting about Property Binding

對於我們傳遞這些值的方式，還有一些有趣的事情可以觀察到。

第一個有趣的事情是，在段落中，我們有兩個類似指令的東西，這只是屬性綁定。

### How Angular Knows What to Bind To?

那麼 Angular 如何知道我們是要綁定到 `<p>` 段落的屬性（當然段落本身沒有預設顏色），還是要綁定到我們自定義指令的屬性呢？

答案是 Angular 會自己找出來。

它在訪問元素的原生屬性之前，先檢查我們自己的指令等等。

### Why We Can Use Directives without Square brackets `[...]` ?

另一個重要的觀點是：為何我們自定義的指令不需要放在方括號中，而 `ngClass` 這些指令卻需要？

當然，我們也可以微調自定義指令使其也需要使用方括號。

對於 `ngClass` ，你會看到指令本身被括在方括號中，這是一個典型的用例，尤其是如果你只有一個要綁定的主要屬性，或者至少有一個主要屬性。

作法是你可以提供一個「別名」，我們可以在這裡做這個，例如將 `highlightColor` 設置為指令選擇器的名稱：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  ...
  @Input('appBetterHighlight')
  highlightColor: string = 'blue';
  ...
}
```

所以在這種情況下，如果我將 `appBetterHighlight` 設置為 `highlightColor` 的別名，現在 `<p>` 中我們為 `highlightColor` 賦值的動作就不再起作用了，所以我將其刪除，然後我可以將我的主指令放入方括號中，並將其設置為紅色：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
      ...
      <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">Style me with better directive!</p>
      ...
```

所以現在我們應該仍然看到黃色和紅色，但現在我們使用相同的方式來封閉指令本身。

重要的是要理解，這只是一個選項。

你可以設置這樣的別名，但這不是必須的。

並且，**預設情況下，就像你之前看到的那樣，指令名稱並不被方括號括起來**。

這只有在你想要綁定到具有相同名稱或別名的屬性時才會發生。

### Add Property Binding Without Square brackets `[...]`  and Ommit the Single quotes `'...'` between Double quotes `"..."`

關於我們如何傳遞資料，還有一件事情。

關於屬性綁定的一般情況是，如果你傳遞一個字串，比如現在我們使用方括號和單引號：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
        ...
        <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">Style me with better directive!</p>
        ...
```

但你可以刪除方括號和單引號，例如我們的 `defaultColor` ：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
        ...
        <p [appBetterHighlight]="'red'" defaultColor="yellow">Style me with better directive!</p>
        ...
```

這是一個特殊情況。

前提是如果你傳遞一個字串，你可以在不使用方括號的情況下進行屬性綁定。 並且你還要省略這些（在雙引號之間的）單引號，這應該和之前一樣工作，沒有錯誤。

你可以使用這個，你會在課程的後面看到我使用這個官方的 Angular 指令。

> **Note**:
> 請注意，如果你使用它，要非常清楚這是「屬性綁定」，而不要認為這是插值的一部分。

這就是關於如何使用屬性綁定來定義自己的指令的全部內容。