# 05. Building a Custom Observable

現在讓我們真正自定義一個 `Observable` 物件吧！

我們來復刻一下 `interval()` 方法，並且讓它每秒發出一個數字。

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
import { Component, OnDestroy, OnInit } from '@angular/core';
- import { Subscription, interval } from 'rxjs';
+ import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
-   this.firstObsSubscription = interval(1000).subscribe(count => {
-     console.log(count);
-   })

+   const customIntervalObservable = Observable.create(observer => {
+     let count = 0;
+     setInterval(() => {
+       observer.next(count);
+       count++;
+     }, 1000);
+   });

+   this.firstObsSubscription = customIntervalObservable.subscribe(data => {
+     console.log(data);
+   });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
```
