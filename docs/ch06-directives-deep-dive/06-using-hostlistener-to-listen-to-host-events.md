# 06. Using `HostListener` to Listen to Host Events

所以現在我們已經看到了兩個指令的例子。

但這並不太動態，對吧？ 它總是給我們一個藍色的背景。

我想要改變這一點。

只有在我將滑鼠游標懸停在元素上方時，我才想要將元素添加背景顏色。

如果我將鼠標移開，它應該恢復為透明。

所以讓我們稍微改進一下這個 `better-highlight` 指令。

在這之前，我們先將 `onInit()` 方法中的程式碼註釋掉：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
...
export class BetterHighlightDirective implements OnInit {
  ...
  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
```

## Creating a `mouseover()` Method

我們需要對指令所在元素上發生的一些事件做出反應。

所以首先我們可以創建一個新的 `mouseover` 方法。

該方法接收一個 `Event` 事件參數，方法體中則定義當事件發生時要執行的程式碼，因此在這裡我們要做的事就是在滑鼠游標懸停在元素上方時，將元素的背景顏色設置為藍色：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
...
export class BetterHighlightDirective implements OnInit {
  ...
  mouseover(event: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
```

## Creating a `mouseleave()` Method

我們還需要一個方法來處理滑鼠游標離開事件，當滑鼠游標離開元素時，我們需要將元素的背景顏色設置為透明：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
...
export class BetterHighlightDirective implements OnInit {
  ...
  mouseleave(event: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
  }

}
```

## Using the `@HostListener` Decorator

創建了這兩個方法後，我們需要讓它們監聽特定的事件。

一種快速且簡單的方法就是使用 `@HostListener` 裝飾器。

它需要從 "`@angular/core`" 中導入並添加到我們想要執行的「方法」上。

`@HostListener` 需要指定一個事件名稱，也就是我們想要監聽的事件名稱。 因此在這裡我們可以簡單地將這兩個方法分別監聽預設的 `mouseover` 和 `mouseleave` 事件：

- [`better-highlight.directive.ts`](../../directives/src/app/better-highlight/better-highlight.directive.ts)

```ts
import { ..., HostListener, ... } from '@angular/core';
...
export class BetterHighlightDirective implements OnInit {
  ...
  @HostListener('mouseover')
  mouseover(event: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseleave')
  mouseleave(event: Event): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
  }

}
```

現在，有了這些，我們就有了一個具有互動功能的指令。

有了 `@HostListener` 之後，我們就可以對使用者事件或任何事件做出反應了！