# 05. Using Types with the `HttpClient`

> 在本小節中，我們將學習如何在使用 Angular 的 `HttpClient` 時定義回應資料的型別。 透過指定我們期望從伺服器接收的資料型別，我們可以改善型別安全性，並充分利用 TypeScript 靜態型別檢查的優勢。

## Introduction

在我們繼續輸出文章之前，讓我們先處理程式碼中的一個問題。 如果我們在 IDE 中將游標懸停在 `posts` 陣列上，我們可以看到它的型別是 `any`。 這表示 TypeScript 無法確定我們的文章結構。 唯一已知的屬性是 `id`，而其他的物件結構則是未知的。

為了解決這個問題，我們可以告訴 TypeScript 我們文章的結構。

## Defining Post Structure

其中一種方法是在 `map()` 函式接收的參數中指定型別。 我們可以使用方括號作為佔位符，並指定鍵的型別為字串。 這個鍵的值將對應到實際的文章資料。

在這裡，我們定義了一個名為 `Post` 的介面，代表我們文章的結構。 它包含 `title` 和 `content` 屬性，並使用問號（`?`）表示可選（Optional）的 `id` 屬性：

- [`post.model.ts`](../../http-app/src/app/post.model.ts)

```typescript
export interface Post {
  title: string;
  content: string;
  id?: string;
}
```

## Using the Post Model

現在，我們可以利用 `Post` 介面為我們的文章提供型別資訊：

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
+ import { Post } from './post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

- onCreatePost(postData: { title: string; content: string }) {
+ onCreatePost(postData: Post) {
    // Send Http request
    ...
  }
  ...
  fetchPosts() {
    this.http
      .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(
-       map(responseData => {
+       map((responseData: { [key: string]: Post }) => {
-         const postsArray = [];
+         const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
      }
    );
  }

}
```

## Leveraging Generic Methods

但其實 Angular 的 `HttpClient` 提供了一種更優雅的方式來指定回應資料型別，即使用泛型方法。

我們不需要在 `map()` 或 `subscribe()` 中明確指定型別，而是在 `get()`、`post()` 這些泛型方法使用角括號（`<>`）提供所需的 response 資料型別。

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
-   this.http.post(
+   this.http.post<{ [key: string]: Post }>(
      'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });
  }
  ...
  fetchPosts() {
    this.http
-     .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
+     .get<{ [key: string]: Post }>('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
      }
    );
  }

}
```

這種方法適用於所有類型的請求，提升了程式碼的可讀性和自動完成功能。

## Conclusion

在 Angular 的 HTTP Client 中定義回應資料型別對於改善程式碼品質和發揮 TypeScript 的優勢至關重要。 無論是為參數指定型別還是使用泛型方法，我們都可以提供給 TypeScript 必要的資訊，讓它理解回應資料的結構。 這種做法提升了程式碼的完成度，幫助避免型別相關的錯誤，從而使 Angular 應用程式更加健壯。