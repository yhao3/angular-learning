# 08 Working with Component Styles

在本小節我們將使用 Booststrap 來美化我們的應用程式。

首先開啟 [`app.component.html`](../../my-first-app/src/app/app.component.html) 檔案，並且把裡面的內容改成：

- [app.component.html](../../my-first-app/src/app/app.component.html)

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h3>I'm in the AppComponent!</h3>
      <hr>
      <app-servers></app-servers>
    </div>
  </div>
</div>
```

我們還可以使用 Angular 提供給我們的一些特性。

假設這裡的 "`I'm in the AppComponent!`" H3 標題，我們想改變它的樣式，也許我們想將字體變成藍色。 我們可以通過修改 AppComponent 的 [`app.component.css`](../../my-first-app/src/app/app.component.css) 檔案來做到這一點：

- [app.component.css](../../my-first-app/src/app/app.component.css)

```css
h3 {
  color: blue;
}
```

現在，就像我們可以在模板之間選擇外部檔案和內嵌程式碼一樣，我們也可以對樣式進行同樣的選擇。

您會注意到， `styleUrls` 結尾是 "`s`" 且 value 是一個陣列，而 `templateUrl` 不是。之所以如此，是因為我們可以在這裡引用多個外部樣式檔案。 因此，您可以添加指向其他 CSS 檔案。

除此之外，您還可以設置另一個屬性，即 `styles` 。 它也接受一個陣列，但現在它接受一個「字串陣列」，您可以在這個字串中定義樣式。

- [app.component.ts](../../my-first-app/src/app/app.component.ts)

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    h3 {
      color: red;
    }
  `]
})
export class AppComponent {
  title = 'my-first-app';
}
```

現在，在這個檔案中，我將再次使用反引號 ，以便能夠在這裡編寫多行表達式。然後，我們可以在這裡設定 H3 標籤。 為了真正向您展示這有所不同，我將把顏色設定為 `red`。 如果我現在保存這個，然後回到應用程式，您會看到藍色已更新，因為現在內嵌樣式順位較高。

就像模板一樣，您必須決定使用哪個。您不能將 `styleUrls` 和 `styles` 結合在一起，但這兩者在這裡都很重要，必須是一個陣列。 這與 template 不同，您只能有一個模板，但您可以有多個樣式檔案或樣式定義，並且可以選擇內嵌或外部檔案。

規則基本上與模板相同，如果其中有更多程式碼，使用外部檔案是一個好主意。 如果它是像這樣的簡短樣式定義，為什麼不直接將它放入 TypeScript 檔案中呢。

這就是您可以使用模板和樣式的方式。
