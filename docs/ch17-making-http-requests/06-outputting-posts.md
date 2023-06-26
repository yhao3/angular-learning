# 06. Outputting Posts

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
export class AppComponent implements OnInit {
- loadedPosts = [];
+ loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}
  ...
  fetchPosts() {
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
+       this.loadedPosts = posts;
      }
    );
  }

}
```

- [`app.component.html`](../../http-app/src/app/app.component.html)

```diff
<div class="container">
  ...
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
-     <p>No posts available!</p>
+     <p *ngIf="loadedPosts.length < 1">No posts available!</p>
+     <ul class="list-group" *ngIf="loadedPosts.length >= 1">
+       <li class="list-group-item" *ngFor="let post of loadedPosts">
+         <h3>{{ post.title }}</h3>
+         <p>{{ post.content }}</p>
+       </li>
+     </ul>
    </div>
  </div>
</div>
```