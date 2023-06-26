# 11. Handling Errors - Using `Subject`

## Introduction to `Subject`

在開始之前強烈建議複習一下 `Subject` 的觀念，請參考 [Ch12 - 09. Subjects](../ch12-understanding-observables/09-subjects.md)。

## Declaring a `Subject` Property in the Service

上一節我們在元件中的 `subscribe()` 方法中處理錯誤，但那是因為服務的方法有返回 `Observable` 物件給元件，所以元件可以在 `subscribe()` 方法中處理錯誤。

那如果像是 `createAndStorePost()` 方法，它沒有返回 `Observable` 物件給元件，元件也沒辦法在 `subscribe()` 方法中處理錯誤，這時候就可以使用 `Subject` 來處理錯誤。

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
...
+ import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

+ error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData = { title: title, content: content };
    this.http.post<{ [key: string]: Post }>(
      'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
+   }, error => {
+     this.error.next(error.message);
    });
  }
  ...
}
```

## Subscribing to the `Subject` in the Component

### 1. Declaring a `Subscription` Property

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
+ import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
+ private errorSub: Subscription;
  ...
}
```

### 2. Subscribing to the `Subject` in the `ngOnInit()` Method and Storing the `Subscription`

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  ...
  private errorSub: Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {

+   this.errorSub = this.postService.error.subscribe(errorMessage => {
+     this.error = errorMessage;
+   });

    this.isFetching = true;
    // Send Http request
    this.postService
      .fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
      });
  }
  ...
}
```

### 3. Unsubscribing from the `Subject` in the `ngOnDestroy()` Method

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
- import { Component, OnInit } from '@angular/core';
+ import { Component, OnDestroy, OnInit } from '@angular/core';
...
- export class AppComponent implements OnInit {
+ export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  ...

+ ngOnDestroy(): void {
+   this.errorSub.unsubscribe();
+ }

}
```