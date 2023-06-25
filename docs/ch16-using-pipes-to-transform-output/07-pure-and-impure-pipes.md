# 07. Pure and Impure Pipes

在上一小節中，我們實作了一個過濾管道，讓我們能夠根據伺服器的狀態進行過濾。 雖然過濾管道運作良好，但還存在一些問題需要處理。

## Adding Functionality to Add a New Server

為了讓使用者能夠新增一個伺服器，我們將修改我們的模板如下：

- [`app.component.html`](../../pipes-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus">
      <hr>
+     <button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
+     <hr>
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of (servers | filter:filteredStatus:'status')"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten:15 }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date:'fullDate' | uppercase }}
        </li>
      </ul>
    </div>
  </div>
</div>
```

我們還會在 `app` 元件中新增 `onAddServer` 方法：

- [`app.component.ts`](../../pipes-app/src/app/app.component.ts)

```diff
...
export class AppComponent {
  servers = [
    ...
  ];
  ...
+ onAddServer() {
+   this.servers.push({
+     instanceType: 'small',
+     name: 'New Server',
+     status: 'stable',
+     started: new Date(15, 1, 2017)
+   });
+ }
}
```

## Issue with Filtering and Adding New Servers

如果我們過濾了伺服器列表並新增一個伺服器，該伺服器將不會顯示在過濾後的列表中。 但是，當我們移除過濾條件時，該伺服器將出現在完整的列表中。

這個行為並不是 bug，而是 Angular 中一個刻意設計的選擇。 預設情況下，當底層資料變動時，Angular 不會重新運行過濾管道。 這個設計決策提升了效能，避免在頁面上的任何資料變動時不必要地重新計算過濾管道。

## Understanding Angular's Default Behavior

讓我們進一步探索這個行為。 如果重新載入頁面並過濾穩定的伺服器，我們可以觀察到即使按下 Enter 鍵，新伺服器也不會被加入過濾後的列表中。 但是，當我們清除過濾條件時，新伺服器將變得可見。

Angular 的預設行為確保只有在輸入變動時才重新計算過濾管道，而不會在資料變動時重新計算。這種方法避免了不必要的重新計算，提升了效能。

## The Absence of a Built-in Filter Pipe

Angular 沒有提供內建的過濾管道，因為強制在資料變動時更新過濾管道可能會對效能產生顯著影響。 儘管過濾是一個常見的任務，但 Angular 團隊出於潛在的效能成本考量，故故意排除了內建的過濾管道。

## Forcing Recalculation of the Pipe

然而，我們可以通過在管道裝飾器中添加第 2 個屬性來強制重新計算管道，該屬性稱為 `pure`，並將其設置為 `false`。

> **Note**:
> 預設情況下，`pure` 被設置為 `true`，並且不需要明確添加。

> **Warning**:
> 請注意，在這種方式下修改管道的行為可能會導致效能問題，特別是當處理大型資料集時。在實施此變更之前，必須清楚了解其影響。

為了在資料變動時重新計算管道，請將 `pure` 屬性添加到管道裝飾器並將其設置為 `false`：

- [`filter.pipe.ts`](../../pipes-app/src/app/filter.pipe.ts)

```diff
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
+ pure: false
})
export class FilterPipe implements PipeTransform {
  ...
}
```

##  Working with the Updated Pipe

在進行此更改並重新載入應用程序後，我們可以過濾穩定的伺服器並新增一個新伺服器。 現在，新新增的伺服器將出現在過濾後的列表中。 由於 `pure` 屬性被設置為 `false`，每當資料變動時，管道都會重新計算。

請記住，這種修改行為可能會對效能產生影響，因此在使用時要謹慎。 了解其影響並確保它符合您的特定需求。

透過這個修改，我們現在有一個運作正常的過濾管道。 然而，在處理大型資料集時，請注意可能的效能問題。