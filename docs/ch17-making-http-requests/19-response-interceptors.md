# 19. Response Interceptors

我們不只可以在 Interceptors 中與 Request 互動，我們也可以在 Interceptors 中與 Response 互動。

通過訂閱 Request 返回的 `Observable` 物件，您可以獲得對 Response 物件的訪問權限。 與處理請求時類似，您可以使用 `map()` 等 operators 對 Response 進行轉換或應用其他操作。

要訪問 Response ，您可以在 `Observable` 鏈中使用 `tap()` operator 。`tap()` operator 允許您檢查 Response 而不進行修改。 在 `tap` callback function 內部，您將收到與接收到的特定類型 Response 相對應的事件。 您可以利用此事件根據 Response 類型執行操作。

例如，您可以檢查事件類型是否等於所需的 HTTP 事件類型，如成功獲得 response。在這種情況下，您可以記錄事件並使用 `event.body` 訪問 Response body。 這使您可以細粒度地訪問 Response 並根據 Response 類型執行特定操作：

- [`auth-interceptor.service.ts`](../../http-app/src/app/auth-interceptor.service.ts)

```diff
- import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
+ import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
+ import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });
    return next.handle(modifiedRequest)
+     .pipe(
+       tap(event => {
+         console.log(event);
+         if (event.type === HttpEventType.Response) {
+           console.log('Response arrived, body data: ');
+           console.log(event.body);
+         }
+       })
+     );
  }
}
```

> **Note**:
> 請記住，如果需要，您可以鏈接多個 operators 並對 Response 進行複雜的轉換。但是，重要的是確保對 Response 進行的任何修改或轉換不會破壞應用程式的功能。

通過觀察控制台輸出，我們可以看到攔截器成功攔截了 Request 和 Response：

```
Request is on its way                    auth-interceptor.service.ts:8
{                                       auth-interceptor.service.ts:13
    "type": 0
}
Response arrived, body data:            auth-interceptor.service.ts:15
{                                       auth-interceptor.service.ts:16
    "-NYryXLaxN9VvwTg4pes": {
        "content": "aaa",
        "title": "aaa"
    },
    "-NYryXtmUypsVZQLXKMm": {
        "content": "aaa",
        "title": "aaa"
    },
    "-NYryaCWuhHR2yzUg6kU": {
        "content": "bbbbbb",
        "title": "bbb"
    },
    "-NYwKFb19wY1-Cq4Mdy7": {
        "content": "sss",
        "title": "sss"
    }
}
```