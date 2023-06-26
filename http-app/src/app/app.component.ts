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
  error = null;

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
      }, error => {
        this.error = error.message;
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
      }, error => {
        this.error = error.message;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

}
