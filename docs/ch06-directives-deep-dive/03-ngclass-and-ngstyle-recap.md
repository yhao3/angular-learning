# `ngClass` and `ngStyle` Recap

當然，有許多屬性指令，而在本章節中，我們將看到不同的指令；我們已經學過的兩個是 `ngClass` 和 `ngStyle` 。

## Using `ngClass` Directive

現在，為了快速回顧它們的工作原理，讓我們在 `app` 元件的 CSS 檔案中新增一個 "`odd`" 類別，然後將顏色設定為紅色：

- [`app.component.css`](../../directives/src/app/app.component.css)

```css
...
.odd {
  color: red;
}
```

現在，在我的模板中，如果它是奇數，我想要將其指定為這個類別。

所以在奇數的 `<li>` 中我們當然可以始終指定為 `odd` 類別，因為我們已經確保這個清單（專案清單）只有在只顯示奇數時才會顯示。

不過，我們仍然可以在這裡使用 `ngClass` ，並確保我們指定 "`odd`" 的 CSS 類別，因此我們只需要在我們目前檢查的數字除以二後的餘數不等於零時，將它定義為屬性名稱：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
          ...
          <li
            class="list-group-item"
            [ngClass]="{odd: odd % 2 !== 0}"
            *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
          ...
```

現在我們可以將這個套用到偶數清單中，我知道這裡永遠不會是奇數，因為我們已經確保只有在不顯示奇數專案時才會呈現。

在偶數數字陣列中，我們沒有任何奇數專案，所以只是為了顯示這個機制的運作方式：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
          ...
          <li
            class="list-group-item"
            [ngClass]="{odd: even % 2 !== 0}"
            *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
          ...
```

現在你會看到，偶數是黑色的，奇數是紅色的。

再說一次，這並不是很令人驚訝，只是對 `ngClass` 如何運作的簡短回顧。

重要的是，我之前提到過，方括號（`[]`）表示我們正在對 `ngClass` 指令上的某個屬性進行綁定。

## Using `ngStyle` Directive

現在，`ngStyle` 是我們迄今為止要查看的另一個屬性指令。

`ngStyle` 允許我們將一個物件傳遞給同一個指令上的某個屬性，這個屬性也叫做 `ngStyle` 。

在模板中，我們可以簡單地設定背景顏色。 當是奇數時，我想要將背景顏色設定為黃色（`yellow`），反之，則設為透明（`transparent`）：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
          ...
          <li
            class="list-group-item"
            ...
            [ngStyle]="{backgroundColor: odd % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
          ...
          <li
            class="list-group-item"
            ...
            [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
          ...
```

現在，偶數仍然沒有任何樣式，但說實話奇數現在變得非常醜陋。

但這表示我們這裡的指令是有效的。

下一節開始，讓我們開始創建自己的屬性指令吧！