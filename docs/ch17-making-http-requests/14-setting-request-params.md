# 14. Setting Request Params

## Setting a Single Param

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
import { Injectable } from '@angular/core';
- import { HttpClient, HttpHeaders } from '@angular/common/http';
+ import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  ...

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
+         params: new HttpParams().set('print', 'pretty')
        }
      )
      .pipe(
        ...
      );
  }
  ...
}
```

## Setting Multiple Params

我們也可以使用 `HttpParams` 來設定多個請求參數，例如：`?print=pretty&custom=key`。

而為了使程式碼更加優雅，我們甚至可以將所有請求儲存在一個變數中，然後將其傳遞給 `get()` 方法。

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
import { Injectable } from '@angular/core';
- import { HttpClient, HttpHeaders } from '@angular/common/http';
+ import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  ...

  fetchPosts() {
+   let searchParams = new HttpParams();
+   searchParams = searchParams.append('print', 'pretty');
+   searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
+         params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server...
          return throwError(errorRes);
        })
      );
  }
  ...
}
```