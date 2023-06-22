# 04. Getting Closer to the Core of Observables

## Building an Observable

[RxJS](https://rxjs.dev/) 套件提供了多種創建 `Observable` 物件的方式。

其中一種最簡單的方式是使用 `interval()` 方法，它會在指定的時間間隔內，每次發出一個數字。 我們可以設定每 1000 毫秒就發出一個新值，並訂閱該事件，在 console 中輸出：

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
...
+ import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
+   interval(1000).subscribe(count => {
+     console.log(count);
+   })
  }

}
```

> **Warning**:
> 注意，這是來自 `interval` 函式提供的 `Observable` 物件，不是我們從頭開始建立的 `Observable` 物件，但它非常接近。

現在打開瀏覽器，你會看到每秒都會在 console 中輸出一個數字。

問題是當我們從 Home 頁面導航到其他頁面時，這個 `Observable` 仍然在運行，並且會持續發出新值。 這是因為我們沒有取消訂閱，所以 `Observable` 仍然在運行。

甚至如果重新回到 Home 頁面，又會創建出一個新的 `Observable` 物件，並且會持續發出新值。

為了阻止這種情況並避免記憶體洩漏，你應該取消訂閱任何你不再對其值感興趣的 `Observable` 物件。

## Unsubscribe

為了取消訂閱 `Observable`，我們需要將訂閱方法的返回值存儲在一個變數中！ 然後在不再需要時調用 `unsubscribe()` 方法。

### 1. Store the Subscription

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
...
- import { interval } from 'rxjs';
+ import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

+ private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
-   interval(1000).subscribe(count => {
+   this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })
  }

}
```

### 2. Unsubscribe in ngOnDestroy()

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
- import { Component, OnInit } from '@angular/core';
+ import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
- export class HomeComponent implements OnInit {
+ export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })
  }

+ ngOnDestroy(): void {
+   this.firstObsSubscription.unsubscribe();
+ }

}
```

現在，當我們從 Home 頁面離開時，`Observable` 會被取消訂閱，並且不會再發出新值。