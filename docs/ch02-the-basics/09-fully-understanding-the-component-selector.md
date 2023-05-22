# 09. Fully Understanding the Component Selector

現在，您已經是一位 component 高手了嗎？

我們學到了很多關於 component 的知識，包括模板以及我們在其中擁有的屬性，還有關於樣式的知識。

我現在想專注於此 component decorator 中看到的最後一個屬性，即選擇器 `selector` 。

## The selector must be unique

我已經提到過，這個選擇器必須是**唯一**的，這樣您就不會意外地覆蓋已經存在的元素，也可以避免意外地覆蓋您在專案中使用的其他第三方套件所提供的 component。

## The "element" selector

不過，關於選擇器還有另一個資訊。

您不必使用這種類型的選擇器。

目前，我們的選擇器與在 CSS 中選擇元素時使用的選擇器相同。

所以我們這裡有一個 `app-servers` 作為元素，Angular 能夠識別它，因為在 [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts) 中，我們選擇器指定的就是 `app-servers` ：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
@Component({
  selector: 'app-servers',
  ...
})
export class ServersComponent {

}
```

基本上，這就像您在 CSS 中選擇元素一樣，對吧？

- [`app.component.css`](../../my-first-app/src/app/app.component.css)

```css
h3 {
  color: blue;
}
```

我們只需在這裡輸入 `h3`，就可以選擇 `h3` 元素。

我們只需在這裡輸入 `app-servers`，就可以選擇 `app-servers` 元素。

## The "attribute" selector

所以 Angular 中的選擇器實際上就像是一個 CSS 選擇器，因此您不僅僅限於「按元素名稱」選擇。

您可以將它放在方括號 `[]` 中，以使用「屬性」選擇器：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
@Component({
  selector: '[app-servers]',
  ...
})
```

這就如同在 CSS 中，您可以通過將該屬性放在方括號中來選擇元素。

現在，如果您儲存，您會發現我們的應用程式實際上出現了問題。

因為如果我們查看錯誤訊息，`app-servers` 是一個未知元素，因為我們現在的 Angular 程式碼無法識別 `app-servers` 了，因為我們將選擇器更改為「屬性」選擇器。

所以要使其恢復正常，我們需要修改一下 [`app.component.html`](../../my-first-app/src/app/app.component.html) 檔案。 我們將原本的 ~~`<app-servers></app-servers>`~~ 註釋掉，或者刪除它，然後添加一個 `div` 元素，並為它定義一個 `app-servers` 屬性：

- [`app.component.html`](../../my-first-app/src/app/app.component.html)

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h3>I'm in the AppComponent!</h3>
      <hr>
      <!-- <app-servers></app-servers> -->
      <div app-servers></div>
    </div>
  </div>
</div>
```

現在有了這個自訂 `app-servers` 屬性，現在應用程式又正常運作了，因為現在 Angular 根據屬性選擇元素，而不是根據元素本身，因為我們更改了選擇器。

## The "class" selector

另一種選擇是使用 class 選擇器，如果在 `selector` 開頭加上一個點 `.` 變成 `.app-servers`，就像在 CSS 中一樣。 如此一來，就可以通過類來選擇：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
@Component({
  selector: '.app-servers',
  ...
})
export class ServersComponent {

}
```

讓我們在這裡添加一個新的 `div` ，它具有 `app-servers` 的 CSS class，當然我們現在也可以對其進行樣式設定：

- [`app.component.html`](../../my-first-app/src/app/app.component.html)

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h3>I'm in the AppComponent!</h3>
      <hr>
      <!-- <app-servers></app-servers> -->
      <!-- <div app-servers></div> -->
      <div class="app-servers"></div>
    </div>
  </div>
</div>
```

但除此之外，這個 CSS class 也被 Angular 識別為一個選擇器，這就是為什麼我們仍然看到了應用程式正常運作。

## ⚠️ The "ID" selector does not work

現在，這些都是您可以選擇的選項，附帶說明，按「 ID 」選擇將不起作用，這在 Angular 中不支援！

另外其它那些 hover 等的偽選擇器也不起作用。

## The "element" selector is the most common

在 component 中，通常您會使用 element style：

- [`app.component.html`](../../my-first-app/src/app/app.component.html)

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

通常您會創建自己的元素，像是 [`servers.component.ts`]：

- [`servers.component.ts`](../../my-first-app/src/app/servers/servers.component.ts)

```ts
@Component({
  selector: 'app-servers',
  ...
})
export class ServersComponent {

}
```

因此不太常會使用 class 風格，也不使用 attribute 風格。 相反，您通常會使用像 `app-servers` 這樣的 element 選擇器。

但是，重要的是要理解您不僅僅局限於這個，可能有一些案例需要使用不同的選擇器。
