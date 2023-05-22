# 14. Proerty Blinding vs String Interpolation

在上一堂課中，我們學習了屬性綁定。

現在，如果我們有這樣的用例，我們也想要可以輸出 `allowNewServer` 的當前值，我們當然可以使用字串插值來簡單地輸出 `allowNewServer` ，因為 boolean 值也可以轉換為字串：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<p>{{ allowNewServer }}</p>
```

其實在這種情況下你可以輕鬆地使用屬性綁定，而不是字串插值。

所以你可以簡單地綁定到這個元素的 "`innerText`" 屬性，並將它設置為 `allowNewServer` ：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
<p [innerText]="allowNewServer"></p>
```

因此，在這個情況下，我們能夠輕鬆地將字串插值替換為屬性綁定。

## How to Decide Between Property Binding and String Interpolation?

那麼何時應該使用這兩者之中的哪一個呢？

基本上，如果你想要在模板中輸出一些東西，輸出一些文字，使用字串插值。

如果你想要更改一些屬性，不論是 HTML 元素的屬性，或者後來你學到的指令或 component 的屬性，通常使用屬性綁定。

這就是你可以區分它們的方式，而且在你逐步完成課程專案等任務時，你會對此有所感受。

所以這是我想要強調的一個重要注意事項，**不要將屬性綁定和字串插值混合使用**。

你可能會注意到，在這裡我們之前直接在雙引號中使用了屬性名稱：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)
- 
```html
[disabled]="!allowNewServer"
```

這兩個雙引號之間沒有 `{{ }}` 花括號，而且不應該有，因為那樣會破壞應用程式。

這不會在屬性綁定的雙引號 `" "` 之間起作用。

你已經可以且必須寫 TypeScript 程式碼，可以說是 TypeScript 表達式，它將返回該屬性期望的值。

所以對於 `disabled` ，可以使用一些返回 `true` 或 `false` 的表達式。

就像字串插值一樣，你也可以在那裡調用一個 _function_ ，但是你不能在裡面加上 `{{ }}` 花括號。

再次看到這段程式碼：

- [`servers.component.html`](../../my-first-app/src/app/servers/servers.component.html)

```html
[disabled]="!allowNewServer"
```

我們先使用了一個 HTML 屬性，後面則是 Angular 所識別的語法。

因此，在雙引號之間，你已經可以且必須寫 TypeScript 程式碼，因為再次強調，這整個表達式是由 Angular 評估的，混合使用字串插值將破壞它。

字串插值只在一個普通模板中起作用，不在該模板的另一個表達式內部，不在屬性綁定或其他類似情況內部起作用。

至此，關於屬性綁定，以及通常在模板中輸出資料的事情，就說這麼多。

接下來讓我們看看如何對 event 事件作出反應。