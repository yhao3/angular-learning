# 02. Components are important

上小節中，我們仔細觀察了在我們在瀏覽器中訪問 `localhost:4200` 時發生的事情。

我們了解到 `index.html` 檔案是「被提供」的，

它包含了一些 script，在這裡執行然後啟動 Angular 應用程式。

接著 Angular 應用程式獲取了重要的資訊，它應該要知道 app component，它應該要使用這些資訊來分析它，Angular 的程式碼能夠解析這裡的 `app-root` 元件、理解它並在這一點上插入我們的 Angular 應用程式。

```html
<app-root>Loading...</app-root>
```

這就是為什麼我們看不到 `Loading...` ，

它仍然存在於這個頁面的原始碼中，正如你所看到的。

但相反，為什麼我們看到這個呢？

因為 Angular 在運行時覆蓋了這個。

> **Note**: 
> 記住，Angular 是一個 JS 框架，它將在運行時更新我們的 DOM。
