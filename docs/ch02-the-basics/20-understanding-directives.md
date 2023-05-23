# 20. Understanding Directives

## What are Directives

現在，還有另一個關鍵的特性，在您構建的任何 Angular 應用程式中都會使用到，也就是「Directives」。

什麼是「Directives」？

**「Directives」是 DOM 中的指示**，實際上，我們在不知不覺中已經使用了「Directives」。

component 本質上就是 DOM 中的「Directives」。

一旦我們在模板中的某個位置放置了 component 的選擇器，在這個時間點上，我們正在告訴 Angular 在我們使用選擇器的地方添加我們 component 模板的內容，以及我們在程式碼中的業務邏輯。

這就是我們的指示：「 Angular，請在這個位置添加我們的 component 」。

實際上， component 就是帶有模板的「Directives」。

還有一些沒有模板的「Directives」。

例如， `appTurnGreen` 這個「Directives」就可以是我們自己建立的自定義「Directives」：

```html
<p appTurnGreen>Receives a green background!</p>
```

我們通常使用「屬性選擇器」來添加「Directives」，但技術上來說，「Directives」的選擇器可以像 component 的選擇器一樣進行配置。

因此，您也可以使用 CSS 類或元素樣式，但**通常我們會使用屬性樣式**。

在這個段落中，這個「Directives」可能只是將文字顏色設為綠色。

Angular 將會找到這個「Directives」：

```ts   
@Directive({
  selector: '[appTurnGreen]'
})
export class TurnGreenDirective {
  // logic about turning the text green...
}
```

在這裡，我們將使用 `@Directives` 註解定義「Directives」，以通知 Angular 這個類是一個「Directives」。

然後我們可能會在其中添加將文字設為綠色的邏輯。

現在，我們將在本課程關於「Directives」的章節中學習如何編寫自己的「Directives」，但內建的一些「Directives」非常有用。

讓我們在接下來的課程中更詳細地了解如何使用它們，以及它們為我們做了什麼。