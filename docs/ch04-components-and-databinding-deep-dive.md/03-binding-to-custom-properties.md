# 03. Binding to Custom Properties

所以我們學到了可以使用屬性綁定（property binding）來綁定元件的屬性。

現在我們要開始做這個。

為了暫時避免應用程式崩潰，我們將只是將 [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts) 的以下程式碼註解掉，這樣就不會再有錯誤了：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  ...
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

現在來看伺服器元件， `server-element` 元件，如果我們查看它的 HTML 檔案，您會看到我們嘗試存取這個 `element` 屬性，因此我們應該在這個 TypeScript 檔案元素中創建一個屬性，代表我們的伺服器：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
export class ServerElementComponent implements OnInit {
  element: {};
  ...
}
```

我們可以為 `element` 指定一個類型，通過加上冒號 `:` ，然後簡單地定義類型，這將是一個 JavaScript 物件，所以用大括號 `{}` 表示。

然後我們知道一個元素將擁有一個類型，一個名稱和一個內容：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
export class ServerElementComponent implements OnInit {
  element: { type: string, name: string, content: string };
  ...
}
```

這就是我們為我們在 HTML 程式碼中要使用的屬性的類型定義，我們在所有這些地方都使用它。

但現在這個 `element` 屬性僅僅屬於 `server-element` 元件，也就是說我們無法從外部訪問它。

現在如果在 `app` 元件中的 `serverElements` 陣列 ，我們能夠以某種方式訪問這個 `element` 屬性就太好了！

因為假設我們只是為了看到一些東西，我們在 `serverElements` 中先定義一個假資料：

- [`app.component.ts`](../../cmp-databinding/src/app/app.component.ts)

```ts
export class AppComponent {
  serverElements = [{ type: 'server', name: 'Testserver', content: 'Just a test!'}];
}
```

> **Note**: 再強調一下，這裡的冒號 `:` 不是類型定義，因為冒號 `:` 在等號 `=` 的右側，所以這裡我們是在「賦值」，而這個值只是一個 JavaScript 物件。

現在我們得到了 `serverElements` 陣列，我們正在迴圈遍歷這個陣列；而在 [`server.element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts) 中，我們有我們的 `element` 屬性這個類型定義。

現在我們希望從外部訪問這個 `element` 屬性。

如果我們能夠綁定它就太好了，就像我們可以綁定 `disabled` 屬性一樣。

也許可以透過加上方括號 `[]` ，然後在中間輸入屬性的名稱 `element` ，然後將其賦值為遍歷的伺服器元素 `serverElement` ：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
<app-server-element
  *ngFor="let serverElement of serverElements"
  [element]="serverElement">
</app-server-element>
```

如果我們能這樣做就太好了。

如果我們嘗試這樣做，應用程式重新加載後，我們會看到我們得到一個錯誤，無法綁定到 `element` ，因為它不是 `server-element` 元件的已知屬性。

現在你可能會說這不對，它是 `server-element` 的屬性，我們在這裡將它定義為屬性，它甚至是 `public` 的，對吧？ 我們沒有在前面加上 `private` 或其他東西。

那麼為什麼我們不能訪問它？

簡單的答案是，預設情況下，元件的所有屬性只能在這些元件**內部**訪問，不能從外部訪問，這通常是件好事，您不希望使所有屬性都可以從外部綁定。

因此，您必須明確指定要公開給外界綁定的屬性。

如果您想允許父元件能夠綁定到這個屬性，您需要對該元素屬性添加一些東西，明確來說是一個標記。

> **Note**:
> 請記住，我說過標記不僅適用於類別，這裡我們要將它添加到這個屬性上。

我們需要添加的標記是 `@Input` ，這裡重要的是，您需要執行它，它就像一個函數，所以添加括號，然後需要從 `@angular/core` 中導入它：

- [`server-element.component.ts`](../../cmp-databinding/src/app/server-element/server-element.component.ts)

```ts
import { Input } from '@angular/core';
...
export class ServerElementComponent implements OnInit {
  @Input()
  element: { type: string, name: string, content: string };
  ...
}
```

有了這個設置，現在我們成功地將這個屬性公開給外界。

因此，現在，任何父元件，任何寄宿我們的 `server-element` 元件的元件，通過選擇器實現這個元件，現在都能夠綁定到 `element` 這個屬性。

如果我們保存這個，您現在可以看到畫面上多了我們創建的那筆假資料！ 也就是說我們成功地從 `app` 元件將遍歷的 `serverElement` 傳遞到了 `server-element` 元件，並綁定到 `server-element` 元件中的 `element` 屬性。

這就是您如何在自己的事件上設置自訂屬性綁定，將自己的屬性公開給您透過選擇器實現這些元件的元件。