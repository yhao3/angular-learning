# 03. Sending a `GET` Request

## Sending a `GET` Request

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}
  ...
  onFetchPosts() {
    // Send Http request
+   this.http
+     .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
+     .subscribe(responseData => {
+       console.log(responseData);
+     }
+   );
  }
  ...
}
```

## Extracting GET Logic

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}
  ...
  onFetchPosts() {
    // Send Http request
-   this.http
-     .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
-     .subscribe(responseData => {
-       console.log(responseData);
-     }
-   );
+   this.fetchPosts();
  }
  ...
+ fetchPosts() {
+   this.http
+     .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
+     .subscribe(responseData => {
+       console.log(responseData);
+     }
+   );
+ }

}
```

## Fetching Data in the `OnInit` Hook

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
+   this.fetchPosts();
  }
  ...
  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }
  ...
  fetchPosts() {
    this.http
      .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .subscribe(responseData => {
        console.log(responseData);
      }
    );
  }

}
```