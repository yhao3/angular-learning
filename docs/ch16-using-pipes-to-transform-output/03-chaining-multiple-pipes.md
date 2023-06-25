# 03. Chaining Multiple Pipes

- [`app.component.html`](../../pipes-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name }}</strong> |
          {{ server.instanceType | uppercase }} |
-         {{ server.started | date:'fullDate' }}
+         {{ server.started | date:'fullDate' | uppercase }}
        </li>
      </ul>
    </div>
  </div>
</div>
```

注意這邊的 `uppercase` 會將 `server.started | date:'fullDate'` 這兩個 jobs 最終的字串輸出轉成大寫。

因此，順序對於 pipes 來說是很重要的。

假設我們將 `uppercase` 放在 `date` 之前，我們就會發生錯誤，因為 `server.started` 並不是一個字串，而是一個日期物件。