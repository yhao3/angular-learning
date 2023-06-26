# 08. Using a Service for Http Requests

## Introduction

在較大型的 Angular 應用程式中，將使用者介面相關的程式碼與邏輯以及資料操作分開是一種良好的做法。 這樣可以讓元件專注於與樣板相關的工作，使其保持精簡。 服務用於執行繁重的工作、處理 HTTP 請求和操作資料。 在本小節中，我們將學習如何建立一個服務來處理 HTTP 請求，並將邏輯從元件中外包出來。

## Creating a Service

```shell
cd src/app
touch posts.service.ts
```

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() {}
}
```

## Handling HTTP Requests

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
import { Injectable } from '@angular/core';
+ import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

- constructor() {}
+ constructor(private http: HttpClient) {}

+ createAndStorePost(title: string, content: string) {
+   const postData = { title: title, content: content };
+   this.http.post<{ [key: string]: Post }>(
+     'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
+     postData
+   )
+   .subscribe(responseData => {
+     console.log(responseData);
+   });
+ }

+ fetchPosts() {
+   return this.http
+     .get<{ [key: string]: Post }>('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
+     .pipe(
+       map(responseData => {
+         const postsArray = [];
+         for (const key in responseData) {
+           if (responseData.hasOwnProperty(key)) {
+             postsArray.push({ ...responseData[key], id: key });
+           }
+         }
+         return postsArray;
+       })
+     );
+ }
}
```

> **Note**:
> 值得注意的是，這裡的 `fetchPost()` 我們直接 return 了 `Observable` 物件，而不是像之前在元件中訂閱它。 這是因為我們希望「元件」負責訂閱這個 `Observable`，而不是服務。 若在元件沒有訂閱 `Observable`，那麼永遠都不會顯示資料。
> 相反的，我們在 `createAndStorePost()` 中訂閱了 `Observable` 這完全沒有問題，因為我們不需要在元件中訂閱它。

## Consuming the Service in the Component

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
- import { map } from 'rxjs/operators';
import { Post } from './post.model';
+ import { PostsService } from './posts.service';

...
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
+             private postService: PostsService) {}

  ngOnInit() {
+   this.isFetching = true;
-   this.fetchPosts();
+   this.postService
+     .fetchPosts()
+     .subscribe(posts => {
+       this.isFetching = false;
+       this.loadedPosts = posts;
+     });
  }

  onCreatePost(postData: Post) {
-   Send Http request
-   this.http.post<{ [key: string]: Post }>(
-     'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
-     postData
-   )
-   .subscribe(responseData => {
-     console.log(responseData);
-   });
+   this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
+   this.isFetching = true;
    // Send Http request
-   this.fetchPosts();
+   this.postService
+     .fetchPosts()
+     .subscribe(posts => {
+       this.isFetching = false;
+       this.loadedPosts = posts;
+     });
  }

  onClearPosts() {
    // Send Http request
  }

- fetchPosts() {
-   this.isFetching = true;
-   this.http
-     .get<{ [key: string]: Post }>('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
-     .pipe(
-       map(responseData => {
-         const postsArray = [];
-         for (const key in responseData) {
-           if (responseData.hasOwnProperty(key)) {
-             postsArray.push({ ...responseData[key], id: key });
-           }
-         }
-         return postsArray;
-       })
-     )
-     .subscribe(posts => {
-       this.isFetching = false;
-       this.loadedPosts = posts;
-     }
-   );
- }

}
```

通過遵循這種方式，元件負責與服務互動並委派邏輯和資料處理任務。 服務封裝了 HTTP 請求和資料操作，使元件的程式碼保持乾淨，專注於與樣板相關的工作。

## Notes

記住，當元件需要訂閱 Http 之 response 時，服務應該回傳 `Observable` 給元件，而不是訂閱它。

## Conclusion

通過將邏輯外包至 Angular 應用程式的服務中，我們可以使元件保持精簡並專注於與樣板相關的任務。 服務處理繁重的工作，如 HTTP 請求和資料操作。 這種關注點分離改善了程式碼的組織和可維護性。