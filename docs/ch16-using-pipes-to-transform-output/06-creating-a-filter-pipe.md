# 06. Creating a Filter Pipe

## Adding Filter input

- [`app.component.html`](../../pipes-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
+     <input type="text" [(ngModel)]="filteredStatus">
+     <hr>
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
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

## Declaring `filteredStatus` Property

- [`app.component.ts`](../../pipes-app/src/app/app.component.ts)

```diff
...
export class AppComponent {
  servers = [
    ...
  ];
+ filteredStatus = '';
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    ...
  }
}
```

## Creating Filter Pipe

```shell
ng g p filter --skip-tests
```

```
CREATE src/app/filter.pipe.ts (217 bytes)
UPDATE src/app/app.module.ts (502 bytes)
```

- [`filter.pipe.ts`](../../pipes-app/src/app/filter.pipe.ts)

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.lenght === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName].indexOf(filterString) !== -1) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
```

## Using Filter Pipe

- [`app.component.html`](../../pipes-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus">
      <hr>
      <ul class="list-group">
        <li
          class="list-group-item"
-         *ngFor="let server of servers"
+         *ngFor="let server of servers | filter:filteredStatus:'status'"
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

注意：

這裡 `filter:filteredStatus:'status'` 的 `filteredStatus` 是上方 `<input type="text" [(ngModel)]="filteredStatus">` 綁定的 `filteredStatus` 。

而 `status` 是 `servers` 裡面的屬性名稱 `status` ：

- [`app.component.ts`](../../pipes-app/src/app/app.component.ts)

```typescript
export class AppComponent {
  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable', // <--- Here
      started: new Date(15, 1, 2017)
    },
    ...
  ];
  ...
}
```