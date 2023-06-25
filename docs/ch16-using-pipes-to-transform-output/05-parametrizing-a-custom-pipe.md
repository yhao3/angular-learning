# 05. Parametrizing a Custom Pipe

## Parametrizing Shorten Pipe

- [`shorten.pipe.ts`](../../pipes-app/src/app/shorten.pipe.ts)

```diff
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
- transform(value: any) {
+ transform(value: any, limit: number) {
    if (value.length > 10) {
-     return value.substr(0, 10) + ' ...';
+     return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}
```

## Using Parametrized Shorten Pipe

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
-         <strong>{{ server.name | shorten }}</strong> |
+         <strong>{{ server.name | shorten:15 }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date:'fullDate' | uppercase }}
        </li>
      </ul>
    </div>
  </div>
</div>
```
