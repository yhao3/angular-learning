# 04. Creating a Custom Pipe

## Creating Shorten Pipe

```shell
cd src/app
touch shorten.pipe.ts
```

### 1. Implement `PipeTransform` Interface and `transform()` Method

- [`shorten.pipe.ts`](../../pipes-app/src/app/shorten.pipe.ts)

```typescript
import { PipeTransform } from '@angular/core';

export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 10) {
      return value.substr(0, 10) + ' ...';
    }
    return value;
  }
}
```

### 2. Adding `@Pipe` Decorator

- [`shorten.pipe.ts`](../../pipes-app/src/app/shorten.pipe.ts)

```diff
- import { PipeTransform } from '@angular/core';
+ import { Pipe, PipeTransform } from '@angular/core';

+ @Pipe({
+   name: 'shorten'
+ })
export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 10) {
      return value.substr(0, 10) + ' ...';
    }
    return value;
  }
}
```

### 3. Register Pipe in `app.module.ts`

- [`app.module.ts`](../../pipes-app/src/app/app.module.ts)

```diff
...
+ import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
+   ShortenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using Shorten Pipe

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
-         <strong>{{ server.name }}</strong> |
+         <strong>{{ server.name | shorten }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date:'fullDate' | uppercase }}
        </li>
      </ul>
    </div>
  </div>
</div>
```