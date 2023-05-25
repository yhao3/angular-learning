# 09. Displaying Recipe Details

在上一堂課中，我們完成了這個 `recipe-list` component 。

現在讓我們來處理食譜 `recipe-detail` `recipe-detail` component 。

所以在 `recipe-detail` 模板 HTML 檔案中，我會先添加一些 CSS 樣式：

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```html
<div class="row">
  <div class="col-xs-12">
      <img src="" alt="" class="img-responsive">
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h1>Recipe Name</h1>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary dropdown-toggle"
        data-toggle="dropdown">
        Manage Recipe
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">To Shopping List</a></li>
        <li><a href="#">Edit Recipe</a></li>
        <li><a href="#">Delete Recipe</a></li>
      </ul>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Description
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>
```

現在，我們來看看它的外觀。

看起來很不錯。

我們有名稱、描述、食材，當然還有一個不起作用的按鈕。 在課程後面，我們將修復這個問題。

而且我們在頂部看不到圖片，因為現在，圖片沒有來源或其他設定。

但我們在這方面遇到的問題是，我們無法將所選食譜傳遞到 `recipe-detail` component 中，因為 `recipe-detail` component 是添加在我們的食譜 component 中的，在那裡我們也有這個列表。

在 `recipe-list` component 中，我們也有相同的問題，我們不得不將一個單獨專案的程式碼暫時放在那裡，因為如果我們將它外包到食譜專案 component 中，我們無法將我們的食譜傳遞給該 component 。

所以跨 component 之間的通訊目前是一個巨大的問題。

但不用擔心。

這是我們將在下一個課程章節深入探討的問題。

然後，我們將回到這個問題，啟用所有那些允許我們將這段程式碼外包到自己的 component 中，並使這些連結可點擊，以便我們實際上在正確位置載入正確的食譜。

在進行這些操作之前，讓我們暫時先跳到購物清單功能去開發。