# 07. Showing a Loading Indicator

本小節將會實作載入指示器按鈕來增進使用者體驗。

## Declaring the `isFetching` State

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
+ isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{ [key: string]: Post }>(
      'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
+   this.isFetching = true;
    this.http
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
        })
      )
      .subscribe(posts => {
+       this.isFetching = false;
        this.loadedPosts = posts;
      }
    );
  }

}
```

## Using the `isFetching` State

- [`app.component.html`](../../http-app/src/app/app.component.html)

```diff
<div class="container">
  ...
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
-     <p *ngIf="loadedPosts.length < 1">No posts available!</p>
+     <p *ngIf="loadedPosts.length < 1 && !isFetching">No posts available!</p>
-     <ul class="list-group" *ngIf="loadedPosts.length >= 1">
+     <ul class="list-group" *ngIf="loadedPosts.length >= 1 && !isFetching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </li>
      </ul>
+     <p *ngIf="isFetching">Loading...</p>
    </div>
  </div>
</div>
```