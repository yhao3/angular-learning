# 05. Custom Property and Event Binding Summary

現在談談「向上傳遞資料」的情況，如果我們有一個元件，其中有些內容發生了變化，我們想要通知父元件，也就是實作另一個元件的那個元件。

例如，在 `app` 元件中，我們正在實作 `cockpit` 元件，而在 `cockpit` 中的這個元件中，某些內容可能會發生變化，因為這裡有兩個按鈕，當我們點擊按鈕時，我們希望執行某些操作。

現在，原本應該執行的程式碼已被註釋掉：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  ...
  ngOnInit(): void {
  }

  onAddServer() {
    // this.serverElements.push({
    //   type: 'server',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

  onAddBlueprint() {
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

}
```

因此，在這裡，我們希望通知父元件，也就是 `app` 元件，在這種情況下，已創建了一個新的伺服器或新的藍圖。

因此，在我們的 `app` 元件中，我們可能希望也在 `app` 元件中實作這兩個方法。 只需將他們複製過來即可：

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
export class AppComponent {
  serverElements = [{ type: 'server', name: 'Testserver', content: 'Just a test!'}];

  onServerAdded() {
    this.serverElements.push({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onBlueprintAdded() {
    this.serverElements.push({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent
    });
  }
}
```

不過，我會調整名稱並將其命名為 `onServerAdded` 。

因為這些方法只會在點擊此按鈕後執行（callback）。

因此，不是一旦按鈕被點擊就立即執行，而是在「之後」，也就是當我們確實完成了創建伺服器的工作才會執行。

因此，在 `app` 元件中，將方法命名為 `onServerAdded` 和 `onBlueprintAdded` 在這裡聽起來更適合。

不過，這段程式碼目前尚無法正常工作，因為我們在 `app` 元件中引用了 `newServerName` 和 `newServerContent` ，而這些在 `app` 元件中是不可用的。

但這確實是我們想要從 `cockpit` 傳遞到 `app` 元件的信息。

因為在目前的應用程式中，`app` 元件是管理整個服務的中心位置。

那麼，我們如何發出自己的事件？如何通知我們的 `app` 元件？如果在 `cockpit` 中看起來像這樣會很好。

因此，在我們實作 `cockpit` 的 `app` 元件的 HTML 檔案中，如果我們可以**監聽** `serverCreated` 事件那就好了！

> **Note**:
> `serverCreated` 事件也可以是您喜歡的任何名稱，但這將是我們想要聽取的事件的合適名稱。

當然，這個事件預設情況下是不存在的。

所以，就像我們聽取 `click` 事件一樣，現在我們想要聽取像 `serverCreated` 這樣的事件。

一旦我們創建了我們的伺服器，我們就會 callback 執行某些程式碼。

就像在任何其他內建事件中一樣，像 `Click` 一樣，在等號右邊的引號之間，我們想要呼叫 `onServerAdded` ，這是我們為此準備的方法：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
  ...
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
  ></app-cockpit>
  ...
```

而且我們甚至期望使用 $event 獲得一些資料：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
  ...
  <app-cockpit (serverCreated)="onServerAdded($event)"></app-cockpit>
  ...
```

這是您可以捕獲此資料的方式。 `$event` 可以是一個「物件」，給我們提供關於該伺服器所需的信息，例如名稱和內容。

因此，在 `onServerAdded` 中，我們期望獲得事件資料，或者說我們實際上期望獲得服務器資料，其中包含一個名為 `serverName` 的字串欄位，還有一個 `serverContent` 字串，所以我們將定義 `onServerAdded` 該方法的參數如下：

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
  ...
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    ...
  }
  ...
```

然後，我們可以在這裡使用它，使用 `serverData` 和 `serverName` 將其分配為我們新創建的伺服器的名稱，即我們在這裡推送到陣列中的名稱：

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
  ...
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }
  ...
```

當然，內容也是一樣的。

這就是它應該工作的方式。

我們在 `onServerAdded` 中獲取此 `serverData` 資料，並在 `cockpit` 元件上發生自定義事件時呼叫 `onServerAdded` 。

而且這個事件甚至應該提供我們期望獲得的資料，我們使用 `$event` 進行捕獲。

現在，顯然我們也可以為 `blueprintCreated` 事件複製此過程。

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
  ...
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (blueprintCreated)="onBlueprintAdded($event)"
  ></app-cockpit>
  ...
```

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
  ...
  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
  ...
```

現在，在 `cockpit` 元件中，我們實際上需要發出我們自己的事件。

我們正在等待名為 `serverCreated` 和 `blueprintCreated` 的事件。

因此，在 `cockpit` 元件中，我想在這裡創建 2 個新的屬性，這些屬性非常重要。 分別為 `serverCreated` 和 `blueprintCreated` ：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  serverCreated;
  blueprintCreated;
  ...
}
```

現在回想一下，如果在屬性前面添加 `@Input` 是為了將它們標記為可以從**外部**存取的屬性。

但是現在我們要做**相反**的事情！ 我們要確保這 2 個屬性是我們可以發出的事件。

要使它們成為事件，首先我們必須為屬性分配新值，即一個新的 `EventEmitter` 物件，並且需要從 `@angular/core` 中導入 `EventEmitter` ：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
import { EventEmitter } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  serverCreated = new EventEmitter<...>();
```

而 `EventEmitter` 是一種泛型類型，使用 TypeScript 中的 `<>` 符號來表示。

至於在中間，您只需定義您將要發出的事件資料的類型。 在這裡，我們要發出的類型就是我們在 [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts) 中 `onServerAdded` 方法的參數類型 `{serverName: string, serverContent: string}` ：

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
  ...
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    ...
  }
  ...
```

因此，我們可以把這段類型定義 `{serverName: string, serverContent: string}` 複製到 `<>` 中：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
import { ..., EventEmitter, ... } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  ...
}
```

> **Warning**: 
> 切記，在結尾記得加上括號 `()` ，以呼叫 `EventEmitter` 的建構子並創建一個新的 `EventEmitter` 物件，並賦值給 `serverCreated` 。

對於 `blueprintCreated` ，我們也可以依樣畫葫蘆：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>;
  blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  ...
}
```

現在我們有了 2 個事件發射器（Event emitter），這是第一步。

`EventEmitter` 是 Angular 框架中的一個物件，它允許您發出自己的事件。

接著，我們可以在 [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts) 中的 `onAddServer` 方法中使用**事件發射器物件 `serverCreated` 呼叫 `emit()` 方法**。 ：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  onAddServer() {
    this.serverCreated.emit(  );
  }
  ...
}
```

`this.serverCreated.emit(  )` 將會發出一個新的事件，就像名字所暗示的那樣，使用這個 `EventEmitter` 物件，事件的類型是 `serverCreated` 。

在這裡，我們還要創建並傳遞我們設置的物件：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  newServerName = '';
  newServerContent = '';
  ...
  onAddServer() {
    this.serverCreated.emit(
      {
        serverName: this.newServerName,
        serverContent: this.newServerContent
      }
    );
  }
  ...
}
```

所以這就是我們在 `onAddServer` 中發射的內容。

讓我們對 `onAddBlueprint` 做同樣的事情：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  newServerName = '';
  newServerContent = '';
  ...
  onAddBlueprint() {
    this.blueprintCreated.emit(
      {
        serverName: this.newServerName,
        serverContent: this.newServerContent
      }
    );
  }
  ...
}
```

非常棒！ 我們成功傳遞了資料。

然而還有一個缺少的部分。

記住，之前我們添加了 `@Input` ，是為了「使屬性可以從外部綁定」。

現在我們需要在 `serverCreated` 和 `blueprintCreated` 中添加一些東西，以「使它們可以從外部監聽」。

它是 `@Output`，並帶有括號，因為我們從該元件傳遞一些東西出來，我們將自己的事件傳遞出該元件。

> **Note**:
> - `@Input`  -> 使屬性可以從外部綁定
> - `@Output` -> 使屬性可以從外部監聽

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
import { ..., Output } from '@angular/core';
...
export class CockpitComponent implements OnInit {
  @Output()
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>;
  @Output()
  blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  ...
}
```

> **Warning**: 
> 請確保從 `@angular/core` 中導入 `Output` 。

大功告成！ 我們的應用程序再次運作正常，但現在拆分成多個可以彼此通信的元件。