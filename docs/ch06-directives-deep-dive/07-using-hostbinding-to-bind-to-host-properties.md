# 07. Using `HostBinding` to Bind to Host Properties

我們學到了 `@HostListener` ，這裡的設置對我們目前的需求來說完全正確，但我們還有另一個可以使用的裝飾器，這樣我們就不需要使用 Renderer 渲染器。

使用 Renderer 渲染器沒有問題，但如果我們只是想在指令中簡單地改變背景顏色，那麼有一種更簡單的方法。

> **Note**:
> 再次強調，使用 Renderer 渲染器並沒有錯。

## Using the `HostBinding` Decorator

我所指的裝飾器稱為 `@HostBinding` ，它也需要從 `@angular/core` 中導入。

首先，我們需要將 `@HostBinding` 綁定到一個屬性，其值將變得重要。

它可以是一個背景顏色屬性，所以我在這裡創建一個新的 `backgroundColor` 屬性，類型為字串，並給予它一個初始值 `transparent` ，避免 `undefined` 的發生。

現在，在 `@HostBinding` 中，我們可以傳遞一個字串，用於定義我們要綁定到 hosting element 的哪個屬性。

現在，Hosting element 的屬性就是我們在 [`basic-highlight`](../../directives/src/app/basic-highlight/basic-highlight.directive.ts) 指令中訪問的那些屬性。

`style` 就是這樣一個屬性，更具體地說是 `backgroundColor` 屬性。

因此，我們可以簡單地傳入一個 `style.backgroundColor` 字串作為 `@HostBinding` 的參數：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { ..., HostBinding, ... } from '@angular/core';

...
export class BetterHighlightDirective implements OnInit {

  @HostBinding('style.backgroundColor')
  backgroundColor: string = 'transparent';
  ...
}
```

> **Note**:
> 駝峰式寫法在這裡很重要，因為我們訪問的是不認識破折號（`-`）的 DOM 屬性。

這樣一來，我們告訴 Angular，在這個指令所在的元素上，請訪問 `style` 屬性，這個屬性幾乎在我們的指令的任何輸入中都有，它們訪問某些值。

當然，你必須確保它們只被添加到具有這個屬性的輸入中。

但是在這裡， `style` 屬性應該在任何元素上都可用。

所以在這裡，我們訪問 `style` 屬性，然後是其中的一個子屬性，即 `backgroundColor` 背景顏色。

並將其設置為這裡設定的任何背景顏色。

## Updating the `backgroundColor` Property Dynamically

好的，現在我們可以在滑鼠懸停時簡單地改變背景顏色。

在這種情況下，我們可以將背景顏色設置為藍色，並在這裡設置為透明。

我們還會將 Renderer 渲染器的程式碼註釋掉。（再次強調，使用 Renderer 渲染器並沒有錯，但在這個例子中不再需要它）

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
...
export class BetterHighlightDirective implements OnInit {

  @HostBinding('style.backgroundColor')
  backgroundColor: string = 'transparent';
  ...
  @HostListener('mouseover')
  mouseover(event: Event): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave')
  mouseleave(event: Event): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'transparent';
  }

}
```

如果我們懸停在上面，它的工作方式與之前一樣，但現在完全由 `@HostListener` 和 `@HostBinding` 控制。

這是一種在指令內部處理元素的絕佳方式。

當然，在 `@HostBinding` 中，你可以綁定到元素上的任何屬性。