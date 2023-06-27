# 18. Modifying Requests with Interceptors

## Modifying Requests in Interceptors

在 Angular Interceptor 中，我們不僅可以記錄數據，還可以修改請求物件。

### The request object is immutable, we need to clone it

但需要注意的是，請求物件本身是**不可變的**，因此直接修改其屬性將無法生效並可能導致錯誤。

要修改請求，我們需要創建一個新的請求物件。 我們可以使用原始請求物件的 `clone` 方法來創建一個新的請求物件。 通過調用 `request.clone()`，我們可以獲得一個可以修改的新請求物件：

- [`auth-interceptor.service.ts`](../../http-app/src/app/auth-interceptor.service.ts)

```diff
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
+   const modifiedRequest = req.clone();
    return next.handle(req);
  }
}
```

## Modifying Request Properties

新的請求物件，通常稱為「修改後的請求」，允許我們覆蓋各種核心屬性。 我們可以在 `clone()` 方法中傳入一個物件，該物件包含我們的新屬性。

### Example: Adding a Header to the Request

例如我們想在現有的 Headers 中添加一個新的 `Auth` header，我們就可以這樣做：

- [`auth-interceptor.service.ts`](../../http-app/src/app/auth-interceptor.service.ts)

```diff
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
+   const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });
    return next.handle(req);
  }
}
```

## Forwarding the Modified Request

在使用 Interceptors 時，重要的是我們不轉發原始請求，而是轉發修改後的請求。 我們可以在 `next.handle()` 方法中傳入修改後的請求物件，而不是原始請求物件以便轉發修改後的請求。

- [`auth-interceptor.service.ts`](../../http-app/src/app/auth-interceptor.service.ts)

```diff
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz') });
-   return next.handle(req);
+   return next.handle(modifiedRequest);
  }
}
```

## Conditional Modification

如果我們只想對特定 URL 或特定條件下的請求進行某些修改，可以在 Interceptor 內部使用條件檢查。

例如，我們可以使用 if 檢查 `request.url` 屬性並根據需要進行修改。