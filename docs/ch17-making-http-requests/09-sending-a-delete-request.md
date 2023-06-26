# 09. Sending a `DELETE` Request

## Adding a `deletePosts()` Method in the `PostsService`

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}
  ...
+ deletePosts() {
+   return this.http.delete('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
+ }
}
```

## Using the `deletePosts()` Method in the Component

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ...

  onClearPosts() {
    // Send Http request
+   this.postService.deletePosts().subscribe(() => {
+     this.loadedPosts = [];
+   });
  }

}
```