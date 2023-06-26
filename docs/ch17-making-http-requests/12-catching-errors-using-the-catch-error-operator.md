# 12. Catching errors - Using the `catchError` Operator

以往在學習例外處理時，不外乎就是「拋出」錯誤或是「捕捉」錯誤。

我們在前面的章節中已經學過如何「拋出」錯誤，現在如果在發生錯誤時，我們不希望直接拋出錯誤導致程式終止，而是希望能夠「捕捉」錯誤，並且在捕捉到錯誤時，能夠進行一些處理，例如：傳送錯誤到分析伺服器中等等，我們就可以使用 RxJS 中提供的 `catchError` 來捕捉錯誤。

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
...
- import { map } from 'rxjs/operators';
+ import { catchError, map } from 'rxjs/operators';
- import { Subject } from 'rxjs';
+ import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  ...

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
+       }),
+       catchError(errorRes => {
+         // Send to analytics server...
+         return throwError(errorRes);
        })
      );
  }
  ...
}
```