# 13. Setting Request Headers

- [`posts.service.ts`](../../http-app/src/app/posts.service.ts)

```diff
import { Injectable } from '@angular/core';
- import { HttpClient } from '@angular/common/http';
+ import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  ...

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
+       {
+         headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
+       }
      )
      .pipe(
        ...
      );
  }
  ...
}
```