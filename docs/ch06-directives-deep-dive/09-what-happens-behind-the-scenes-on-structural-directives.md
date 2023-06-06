# 09. What Happens behind the Scenes on Structural Directives

所以，既然我們仔細研究了屬性指令並創建了我們自定義的屬性指令，在創建我們自定義的結構指令之前，讓我解釋一下為什麼這個星號（`*`）實際上是必需的。

這個星號告訴 Angular 這是一個結構指令。

問題是，為什麼 Angular 需要知道這一點？

因為有星號的結構指令實際上只是一種更好的方式供我們使用，基本上是這樣。

在幕後，Angular 會將它們轉換為其他東西，因為在使用指令、屬性綁定或類似的內容時，Angular 語法中並沒有星號。

Angular 只有屬性綁定、事件綁定、雙向綁定和字串插值，並沒有星號運算符或類似的東西。

所以在幕後，Angular 需要將這種 `ngIf` 用法轉換為我們最終使用這些工具的形式，例如屬性綁定等等。

它會這樣做；我可以以不同的方式寫出與 [`app.component.html`](../../directives/src/app/app.component.html) 中相同的列表：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
        ...
        <div *ngIf="!onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{odd: even % 2 !== 0}"
            [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
        ...
```

所以如果我試著以不同的方式編寫這個 `ngIf` 程式碼，我會得到以下內容：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
        ...
        <ng-template [ngIf]="!onlyOdd">
          <div>
            <li
              class="list-group-item"
              [ngClass]="{odd: even % 2 !== 0}"
              [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
              *ngFor="let even of evenNumbers">
              {{ even }}
            </li>
          </div>
        </ng-template>
        ...
```

這裡有一個 `ng-template` 元素，這是 Angular 提供的， `ng` 表示這是 Angular 的元素。

在這個元素內部，我們有條件性地要渲染的內容。

因此，在這種情況下，我們在其中使用一個 `div` ，並在該 `div` 內部包含列表項目。

你可能會認為這基本上是相同的，只是多了一個 `ng-template` 的包裝。

這樣做的原因是 `ng-template` 是一個不會被渲染的元素，但它允許我們為 Angular 定義一個模板。 一旦滿足條件時，Angular 將根據這個模板來渲染相應的元素。

因此，在 `ng-template` 上，我們使用 `ngIf` ，但不再使用星號，而是使用我們已經熟悉的「屬性綁定」。

在這裡，我們只簡單地綁定了 `!onlyOdd` 的條件。

現在，我們使用了熟悉的工具，並達到了相同的效果，而不需要使用星號。 然而，這也是為什麼我們通常更喜歡使用星號的寫法，因為這種寫法更直觀，可以直接將星號放在我們要條件渲染的元素上。

但在幕後，Angular 會將它轉換為相應的內容。

雖然你不一定非要使用這種寫法，但我認為意識到這一點非常重要。

因此，如果我們儲存這個程式碼，列表將出現 2 次，出現和消失也將發生 2 次，因為它的工作方式完全相同。

這就是星號（`*`）在幕後將其轉換為的內容。