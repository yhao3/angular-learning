# 11. Understanding `ngSwitch`

我們來談談內建的結構性指令之一，這對於特定情況可能非常有用，就是 `ngSwitch` 。

想像一下這樣的情況，假設在 [`app.component.ts`](../../directives/src/app/app.component.ts) 中，我們有一個值，例如 `10` ：

- [`app.component.ts`](../../directives/src/app/app.component.ts)

```ts
...
export class AppComponent {
  ...
  value = 10;
}
```

現在我們在應用程式中有一個位置，當這個值變化，我們有幾個不同的訊息要為每個值顯示。

為了達到這個目的，我們可以使用 `ngSwitch` 。

因此，在我們的段落下方添加一個新的 `div` 。

而使用 `ngSwitch` 的方式如下。

我們使用屬性綁定來綁定 `ngSwitch` ，所以這時候不需要星號。

然後，我們綁定到 `value` 。

所以基本上這是我們的條件，我們要檢查的東西。

然後你可能知道 Switch 有幾個 case 可以使用。

假設我們有一個段落，我們在其中說 `value` 是 `5` 、 `10` 、 `100` 或者是 `Default` 。

現在我們需要為這些 `<p>` 段落添加一些東西，以控制該顯示哪個段落，因為同時只應該顯示其中一個。

那個東西就是 `ngSwitchCase` ，我們只需要將該 case 的值作為參數傳遞給它，例如 `5` 。

> **Note**:
> 注意在 `ngSwitchCase` 開頭需要添加一個 `*` 星號，這非常重要。

所以這裡星號再次發揮作用，因為在幕後，Angular 會將所有這些轉換為其他形式。

最後，對於預設情況，我們使用 `ngSwitchDefault` ，就像這樣：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
      ...
      <div [ngSwitch]="value">
        <p *ngSwitchCase="5">Value is 5</p>
        <p *ngSwitchCase="10">Value is 10</p>
        <p *ngSwitchCase="100">Value is 100</p>
        <p *ngSwitchDefault>Value is default</p>
      </div>
      ...
```

> **Note**: 
> 當然 `ngSwitchDefault` 也需要添加星號。

有了這些，如果我們保存，只會看到這裡顯示 `10` 。

如果我回到 [`app.component.ts`](../../directives/src/app/app.component.ts) 中並將它改為 `5` ，那麼當然我們會看到 `5` 。

這就是 `ngSwitch` ，使用起來非常簡單，在某些情況下可能很有用，特別是在你發現自己創建了很多 `ngIf` 條件時。 在這種情況下， `ngSwitch` 可能是更好的解決方案。

這樣就完成了結構性指令，也完成了所有指令的介紹。

你學到了很多關於它們的知識，我希望這些知識能夠讓你為應用程式創建出色的指令，除非你真的需要特定的指令，這些內建指令已經涵蓋了許多使用情境。