# 05. Using Custom Component

我們不行直接修改 `index.html`，而是要在 [`app.component.html`](../../my-first-app/src/app/app.component.html) 中加入 `<app-server></app-server>`。

- [`app.component.html`](../../my-first-app/src/app/app.component.html)

```html
...
<hr>
<app-server></app-server>
```

如此一來，當我們重新訪問 `localhost:4200` 時，我們就會看到 [`server.component.html`](../../my-first-app/src/app/server/server.component.html) 中的內容了。
