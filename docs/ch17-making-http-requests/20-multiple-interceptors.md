# 20. Multiple Interceptors

## Introduction

在本小節中我們將探討如何添加多個攔截器以及它們在執行中的順序的重要性。

## Adding a Second Interceptor

在 Angular 中，您可以添加多個攔截器，以靈活處理 HTTP 請求。 現在我們將添加第二個攔截器，名為 `logging-interceptor.service.ts` ：

- [`logging-interceptor.service.ts`](../../http-app/src/app/logging-interceptor.service.ts)

```typescript
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing request');
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response');
          console.log(event.body);
        }
      })
    );
  }
}
```

## Order of Interceptors

> **Note**: 在 `providers` 陣列中提供攔截器的順序決定了攔截器執行的順序。

- [`app.module.ts`](../../http-app/src/app/app.module.ts)

```diff
...
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
+ import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
+   {
+     provide: HTTP_INTERCEPTORS,
+     useClass: LoggingInterceptorService,
+     multi: true,
+   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

我們首先提供 `AuthInterceptor`，然後是 `LoggingInterceptor`。 因此 `AuthInterceptor` 將先執行，然後才是 `LoggingInterceptor`。

## Testing Order of Interceptors

為了驗證執行順序，我們可以根據在 `LoggingInterceptor` 中記錄的請求標頭來查證。 因為 `LoggingInterceptor` 排在第二個位置，所以我們應該能夠看到自訂的 `auth` 標頭被添加。

```json
{
    "normalizedNames": { ... },
    "lazyUpdate": null,
    "headers": [
        {
            "key": "custom-header",
            "value": [
                "Hello"
            ]
        },
        {
            "key": "auth",
            "value": [
                "xyz"
            ]
        }
    ],
    "lazyInit": null
}
```

## Conclusion

- 在 Angular 中，添加多個攔截器很簡單。
- 提供攔截器的順序決定了它們執行的順序。
- 攔截器在處理 HTTP 請求時提供了很大的靈活性，可進行自定義修改和日誌記錄。