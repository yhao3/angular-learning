# 15. Observing Different Types of Responses

在 Angular 中，我們通常專注於從 HTTP 請求中提取並使用回應資料。 然而，有些情況下我們需要存取完整的回應物件，包括狀態碼和標頭資訊。 在這種情況下，我們可以修改 Angular 的 HTTP 客戶端如何處理回應，並要求返回完整的回應而不只是提取的資料。 

## Observing the Full Response

要獲取完整的 HTTP 回應，我們可以在配置請求時使用 `observe` 選項。 預設情況下，`observe` 的值設為 "`body`"，它會自動提取並將 Response Body 資料轉換為 JavaScript 物件。 然而，我們可以將其更改為 "`response`" 以獲取完整的回應物件。 

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
this.http.post<{ [key: string]: Post }>(
  'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
  postData,
+ {
+   observe: 'response' // 'body' is default
+ }
)
...
```

例如，在進行 `POST` 請求時，我們可以在請求配置物件中包含 `observe` 選項。 將其設置為 `'response'` 確保我們接收到完整的回應物件，而不僅僅是 Response body 資料。 例如：

```javascript
{
    "headers": {
        "normalizedNames": {},
        "lazyUpdate": null
    },
    "status": 200,
    "statusText": "OK",
    "url": "https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
    "ok": true,
    "type": 4,
    "body": {
        "name": "-NYwKFb19wY1-Cq4Mdy7"
    }
}
```

## Benefits of Observing the Full Response

觀察完整回應不僅提供存取 Response body 的能力，還可以獲取其他有用的資訊，如 Response headers 和狀態碼。 通過訪問 `response.body`，我們仍然可以方便地獲取解析後的 Response body 資料。 此外，TypeScript 的類型推斷功能可提供自動完成並更好地理解可用的屬性。 

## Alternative Observables

除了觀察 `response`，還有其他可用的選項。 通過使用 `observe` 選項，我們可以選擇觀察不同類型的資料。 例如，我們可以使用 `observe: 'events'` 來接收與 HTTP 請求相關的事件。 

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
his.http.delete(
  'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
+ {
+   observe: 'events'
+ }
);
```

`'events'` 選項允許我們觀察與請求相關的事件。 為了在不改變回應的情況下記錄這些事件，我們可以使用 RxJS 中的 `tap` 運算符。 `tap` 運算符在執行程式碼的同時保持回應的原樣通過：

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
...
- import { catchError, map } from 'rxjs/operators';
+ import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  ...
  constructor(private http: HttpClient) {}
  ...
  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        observe: 'events'
      }
    )
+   .pipe(
+     tap(event => {
+       console.log(event);
+     })
+   );
  }
}
```

## Handling HTTP Events

在觀察事件時，我們會接收到以數字編碼的不同類型的事件。 雖然這些數字在內部使用，但 TypeScript 提供了更便於使用的方式來處理它們。 通過將事件類型與 `HttpEventType` 枚舉進行比較，我們可以輕鬆確定收到的事件類型。 

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
import { Injectable } from '@angular/core';
- import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
+ import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  ...
  constructor(private http: HttpClient) {}
  ...
  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        observe: 'events'
      }
    )
    .pipe(
      tap(event => {
        console.log(event);
+       if (event.type === HttpEventType.Sent) {
+         // e.g. update UI to indicate that request has been sent
+       }
+       if (event.type === HttpEventType.Response) {
+         console.log(event.body);
+       }
      })
    );
  }
}
```

通過將事件類型與 `HttpEventType` 枚舉進行比較，我們可以使程式碼更易讀，並且更容易理解事件的類型。 TypeScript 提供將數字值翻譯為可讀性更高的枚舉值的功能。 這個功能是特定於 TypeScript 的，它會在編譯成 JavaScript 時轉換為數字比較。 

## Conclusion

觀察 HTTP 回應允許我們存取完整的回應物件，而不僅僅是提取的資料。 通過將 `observe` 選項更改為 `'response'`，我們可以獲取完整的回應，包括狀態碼、標頭和 Response body 。 此外，觀察事件可以精細地控制請求狀態，允許我們在請求過程的不同階段更新使用者界面或執行特定操作。 