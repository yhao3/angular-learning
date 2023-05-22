# 07. Working with Component Templates

到目前為止，我們一直使用外部模板檔案，並且對於 component 的樣式沒有進行任何處理。

現在是改變的時候了。

現在，您可以使用內嵌模板（Inline template），而不是使用外部模板檔案，這意味著您可以在 TypeScript 程式碼中定義 HTML 程式碼。

聽起來有點奇怪。

雖然這是可能的，我們可以通過簡單地轉到這裡的 [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts) component 來實現這一點。

現在，我們指向這裡的 HTML 檔案。

現在，我們可以將 `templateUrl` 屬性 key 更改為 `template` 。

兩者之一必須存在，要麼是指向外部模板的連結，要麼只是在此檔案中定義模板。

但是每個 component 都至少需要一個模板。

這是您始終必須擁有的屬性之一。

現在，我們可以在這裡編寫我們的模板程式碼：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
@Component({
  ...
  // templateUrl: './servers.component.html',
  template: '<app-server></app-server><app-server></app-server>',
  ...
})
export class ServersComponent {

}
```

所以在這裡，我們現在可以像這樣重複 `<app-server></app-server>` 兩次。

我們必須確保不要將此行包裹起來，因為預設的 TypeScript 字串不支援這種做法。

現在如果存檔，我們會看到與之前相同的結果。

所以看起來好像什麼都沒變。

但事實上，我們確實改變了設置模板的方式。

現在，我們在同一個 TypeScript 檔案中定義 HTML 程式碼。

實際上，如果您想在這裡撰寫多行字串（可能需要的情況），並且如果您在其中添加了更多 HTML 程式碼，您可以從使用單引號切換為使用反引號，使用 JavaScript 模板表達式來能夠在其中撰寫多行字串：

```ts
@Component({
  ...
  template: `
    <app-server></app-server>
    <app-server></app-server>`,
  ...
})
export class ServersComponent {

}
```

因此，在開始和結尾的反引號之間，您實際上可以將行包裹起來，並像這樣撰寫您的 HTML 程式碼。

您應該使用哪一種方法？您應該使用這裡的模板方法還是外部檔案？這取決於情況。

如果您的程式碼不多，HTML 程式碼也不多，使用內嵌模板可能是可以接受的。

那麼，您擁有 TypeScript 程式碼的所有邏輯，這是完全可以的。

但是，一旦您在模板中有超過 3 行的程式碼，使用外部檔案是一個好主意，可以更容易地追蹤和理解。

重要的是要記住，您可以使用這種方法來內嵌模板，並且非常重要的是，您在 component 中至少需要一個模板。

您可以省略選擇器，在後面的路由部分中，您將學習一種不使用選擇器加載 component 的方法。

您不必添加樣式，但模板必須存在。

現在讓我們在下一個課程中來看看這些樣式。
