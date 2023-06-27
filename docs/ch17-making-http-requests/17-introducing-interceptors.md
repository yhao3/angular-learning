# 17. Introduction Interceptors

在本小節中，我們將探討 Angular 中的攔截器概念。攔截器是 Angular `HttpClient` 支援的一項強大功能，允許我們修改 HTTP 請求和回應。它們非常適用於實現附加 headers 到外部請求或進行身份驗證等功能。

## What are interceptors?

攔截器用於攔截 Angular 應用中的 HTTP 請求和回應。它們提供了一種在發送請求之前和接收回應之前修改或處理請求的方式。這使我們可以對所有外部請求執行常見任務，例如添加 headers 或身份驗證 tokens。

## Creating an interceptor

### 1. Creating a `auth-interceptor.service.ts` file

```shell
cd src/app
touch auth-interceptor.service.ts
```

- [`auth-interceptor.service.ts`](../../http-app/src/app/auth-interceptor.service.ts)

```ts
export class AuthInterceptorService {
}
```

### 2. Implementing `HttpInterceptor` interface

- [`auth-interceptor.service.ts`](../../http-app/src/app/auth-interceptor.service.ts)

```ts
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    return next.handle(req);
  }
}
```

## Registering the interceptor

要在應用程式中註冊攔截器，請按照以下步驟進行操作：

在 `app.module.ts` 的 `providers` 陣列中添加一個 JavaScript 物件，包含三個鍵：`provide`、`useClass` 和 `multi`：

1. 將 `provide` 鍵設置為 `HTTP_INTERCEPTORS`，這是從 `@angular/common/http` 中導入的型別。
2. 將 `useClass` 鍵設置為攔截器的類名稱（`AuthInterceptorService`）。
3. 如果有多個攔截器，將 `multi` 鍵設置為 `true`。這可以確保不會替換現有的攔截器。

如此一來 Angular 將自動抓取所有已註冊的 HTTP 攔截器並運行它們的 `intercept` 方法，用於外部請求。

- [`app.module.ts`](../../http-app/src/app/app.module.ts)

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
- import { HttpClientModule } from '@angular/common/http';
+ import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
+ import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
+ providers: [
+   {
+     provide: HTTP_INTERCEPTORS,
+     useClass: AuthInterceptorService,
+     multi: true,
+   },
+ ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Restricting interceptor execution

如果您希望限制攔截器執行的請求，可以在攔截器本身內部進行控制。`intercept` 方法接收一個 `HttpRequest` 物件，其中包含有關請求的資訊，例如 URL。您可以使用這些資訊進行檢查並決定是否修改請求。

設置攔截器後，您應該可以看到攔截器程式碼運行於離開應用的每個請求上。您可以通過檢查控制台訊息來驗證此情況：

```
Request is on its way               auth-interceptor.service.ts:7 
```

攔截器提供了一種方便的方式來處理 Angular 應用中外部請求和回應的常見任務，減少手動配置和重複的程式碼。