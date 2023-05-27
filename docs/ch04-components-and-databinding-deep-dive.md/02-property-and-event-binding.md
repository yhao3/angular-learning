# 02. Property & Event Binding

在上一堂課中，我們將應用程式拆分為多個元件，這是很好的，這就是為什麼我們使用元件的原因，但問題是我們需要在這些元件之間傳遞資料。

現在，在基礎部分，我們學習了屬性和事件綁定，我們使用它來，例如，綁定 HTML 元素的 `disabled` 屬性。

因此，我們將資料傳遞給該元素。

我們傳遞了它應該被禁用的資訊，也就是將其設置為 `true` 。

事件綁定也是同樣的道理。

當我們點擊這個 HTML 按鈕時，會發生某些事情。

這個按鈕觸發了一個事件，我們可以聽取它，所以它向我們發送了一些資料。

對於輸入框，我們甚至使用了事件後綴的資料，如果你還記得的話。

我們從輸入框中獲取了資料。

這正是我們現在需要的行為，與我們自己的元件。

我們需要能夠將資料發送到元件中或獲取資料，獲取事件。

當然，Angular 提供了很棒的工具來實現這個流程。

## HTML Elements - Native Properties & Events

我們不僅可以在 HTML 元素及其本身的屬性和事件上使用屬性和事件綁定，就像我們迄今所做的那樣。

## Directives - Custom Properties & Events

我們還可以在指令上使用它，我們在 `ngClass` 和 `ngStyle` 中也使用了屬性綁定。

## Components - Custom Properties & Events

但是，這是重要的，我們還可以在我們自己的元件上使用它，並綁定到我們自己的自定義屬性和自定義事件。

我們可以觸發我們自己的事件。

這就是我在下一堂課中要深入研究的內容，從自定義屬性綁定開始。