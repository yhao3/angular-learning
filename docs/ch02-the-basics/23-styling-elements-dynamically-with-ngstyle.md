# Styling Elements Dynamically with ngStyle

在上一堂課中，我們看到了 NG if，非常實用的結構指令。

NG if 是一個結構指令。

其他類型的指令是「屬性指令」，被稱為「屬性指令」，是因為它們看起來就像是普通的 HTML 屬性，基本上不像 NG if 帶有星號。

> **Note**:
> 不同於結構指令，「屬性指令」不會新增或移除 DOM 元素，它們只會改變所放置的元素。

讓我們添加一個範例！

在 [`server.component.ts`](../../my-first-app/src/app/server/server.component.ts) 中，我們輸出伺服器狀態，而且伺服器狀態總是離線。

讓我們改變一下。

假設我們想要使每個伺服器的狀態都變成隨機的。

我們可以添加建構子，在其中隨機初始化伺服器狀態。

- [`server.component.ts`](../../my-first-app/src/app/server/server.component.ts)

```ts
...
export class ServerComponent {
  ...
  constructor() {
    // Math.random() returns a number between 0 and 1
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  ...
}
```

我將使用數學隨機函數，這會給我們一個介於 0 和 1 之間的隨機浮點數。

如果這個數大於 0.5，我把狀態設置為在線，否則我會把它設置為離線。

現在假設我們想要根據服務狀態更改此元件的背景顏色。

為此，我們可以使用一個數值指令。

在這個 `<p>` 標籤上，我可以添加 `ngStyle` ：

- [`server.component.html`](../../my-first-app/src/app/server/server.component.html)

```html
<p [ngStyle]>{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}.</p>
```

這是一個內建指令。

您可以從開頭的 **`ng`** 看出這一點。

而我們需要給它一些配置以執行某些操作。

這就是為什麼我們將在此指令上使用 property binding。

而且非常重要的是要理解這裡的方括號 `[]` 不是指令名稱的一部分。

指令名稱只有 `ngStyle` 。

方括號用來表示我們想要「綁定」到此指令上的某個屬性。

而這個屬性名稱碰巧也是 `ngStyle` 。

我們將在後面的指令部分中實際看到這一點。

但是非常重要的是要理解 property binding 和指令是不同的東西。

它們完全不同。

我們只是綁定到指令的屬性。

接著，這個 `ngStyle` 屬性希望得到一個 JavaScript 物件：

```html
<p [ngStyle]="{ ... }">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}.</p>
```

在這裡，我們定義 key/value 對

例如，我們可以使用 `background-color` ，如果您想使用帶 `-` 的表示法

您必須用單引號括起來，使其成為有效的 JavaScript 屬性名稱：

```html
<p [ngStyle]="{ 'backgound-color': 'red' }">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}.</p>
```

或者您可以使用駝峰表示法 `backgroundColor` ，就像這樣：

```html
<p [ngStyle]="{ backgroundColor: 'red' }">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}.</p>
```

然後您可以將其設置為紅色，但我不想設置為紅色。

我想根據伺服器狀態設置它。

所以在這裡，我們可以簡單地調用一個方法， `getColor()` ：

- [`server.component.html`](../../my-first-app/src/app/server/server.component.html)

```html
<p [ngStyle]="{ backgroundColor: getColor() }">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}.</p>
```

現在我們可以在 TypeScript 中添加 `getColor()` 方法：

- [`server.component.ts`](../../my-first-app/src/app/server/server.component.ts)

```ts
export class ServerComponent {
  ...
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```

`getColor()` 將根據 `serverStatus` 屬性返回綠色或紅色。

並且 `getColor()` 的返回值將作為背景顏色分配給 `ngStyle` 。

讓我們看一下結果。

我們確實看到運行中的伺服器具有綠色背景；而離線的伺服器具有紅色背景。

它允許我們動態更新樣式。

這就是 `ngStyle` ！

一個像屬性一樣添加的屬性指令。

在這個範例中，我們還使用了屬性繫結來配置它。
