# 01. Introduction to Directives

本節將快速複習我們迄今為止所學的指令，並學習如何建立自訂指令。

## Attribute vs. Structural Directives

在此部分，我們將深入探討屬性指令和結構指令之間的差異，以及結構指令中星號（`*`）的含義。

回顧一下，我們有**屬性指令（Attribute directives）**和**結構指令（Structural directives）**。

屬性指令之所以被稱為屬性指令，是因為它們附加在元素上，就像屬性一樣。

結構指令則基本上具有相同的特性，但它們也會改變環繞該元素的 DOM 結構。

例如，如果你在段落上使用了 `ngIf` 指令，當條件為 `false` 時，該段落將從 DOM 中移除，因此整個視圖容器都會受到影響。 而在屬性指令中，你永遠不會銷毀 DOM 中的元素，只會更改該元素的屬性，例如背景顏色。

因此，屬性指令只會影響它們所附加的元素，而結構指令則會影響整個 DOM 或視圖容器，即它們所放置的元素周圍的區域。

這就是兩者之間的差異。

現在，讓我們簡要回顧已經熟悉的指令及其使用方法，然後深入探討如何建立自訂指令，並進一步了解結構指令的更多知識。