# 10. Handling Errors - Using Second Argument of `subscribe()`

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
+ error = null;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    // Send Http request
    this.postService
      .fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
+     }, error => {
+       this.error = error.message;
      });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postService
      .fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
+     }, error => {
+       this.error = error.message;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

}
```

## Displaying the Error Message

- [`app.component.html`](../../http-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <form #postForm="ngForm" (ngSubmit)="onCreatePost(postForm.value)">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            ngModel
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            class="form-control"
            id="content"
            required
            ngModel
            name="content"
          ></textarea>
        </div>
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!postForm.valid"
        >
          Send Post
        </button>
      </form>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <button class="btn btn-primary" (click)="onFetchPosts()">
        Fetch Posts
      </button>
      |
      <button
        class="btn btn-danger"
        [disabled]="loadedPosts.length < 1"
        (click)="onClearPosts()"
      >
        Clear Posts
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1 && !isFetching">No posts available!</p>
      <ul class="list-group" *ngIf="loadedPosts.length >= 1 && !isFetching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </li>
      </ul>
-     <p *ngIf="isFetching">Loading...</p>
+     <p *ngIf="isFetching && !error">Loading...</p>
+     <div class="alert alert-danger" *ngIf="error">
+       <h1>An Error Occured!</h1>
+       <p>{{ error }}</p>
+     </div>
    </div>
  </div>
</div>
```