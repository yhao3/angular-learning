# 06. Errors and Completion

發出資料可以說是觀察者所做的最重要的事情。

基本上 99% 的情況下，當你訂閱時，你會傳遞第一個參數，表示你感興趣的資料。

但還有一個重要的使用情境，尤其是當我們考慮像是 HTTP 請求這樣的事情時，那就是「錯誤處理」。

## Error Handling

現在我們可以模擬計數器發生錯誤，例如，當計數大於 3 時拋出一個錯誤：

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
...
export class HomeComponent implements OnInit, OnDestroy {
  ...
  ngOnInit() {

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
+       if (count > 3) {
+         observer.error(new Error('Count is greater than 3!'));
+       }
        count++;
      }, 1000);
    });
    ...
  }
  ...
}
```

值得注意的是，每當觀察者拋出一個錯誤時，它就會取消訂閱，並結束。 白話一點可以說它就死了。

因此，在這種情況下，你也不需要取消訂閱。

你仍然可以取消訂閱，但是這不是必要的，因為它已經死了，但是當你取消訂閱時，你可能不知道這一點。

當然，更重要的是不只是拋出錯誤，因為大部分時候會由一些內建的 Angular 功能自動拋出錯誤，像是 HTTP 請求可能會失敗。

但是知道如何處理這些錯誤是很重要的。

為此，你可以傳遞另一個參數給 `subscribe` 。

到目前為止，我們傳遞的是第一個參數，也就是這個資料函數。

第二個參數將是我們的函數，當發生錯誤時會被調用，並將錯誤作為參數傳遞進去。

現在，當然我們在這裡可以做的簡單的事情是將錯誤記錄到控制台上，

但顯然你可以做更多的事情。

你可以將它發送到你自己的後端，並在那裡將錯誤訊息儲存在資料庫中。

你也可以向用戶顯示錯誤消息和警示，例如：

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
...
export class HomeComponent implements OnInit, OnDestroy {
  ...
  ngOnInit() {

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
+   }, error => {
+     console.log(error);
+     alert(error.message);
    });
  }
  ...
}
```

現在，我們右側不再有那個紅色的錯誤了。 取而代之的是一個常規的控制台日誌。

所以現在我們在處理這個錯誤，這當然也是一個重要的部分。

現在處理錯誤很好，但是如何完成這個觀察者呢？

## Completion

我告訴過你，拋出一個錯誤實際上會取消觀察者並使其結束。

但是完成是一個不同的事情。

完成可以是觀察者中的一個正常過程。

現在我們的間隔默認情況下不會完成。

它將不斷發出新的值。

而另一方面，HTTP 請求將會完成。

只要服務器返回 Response，它就會完成。

當然，在我們從頭開始構建我們自己的觀察者時，

我們也可以手動完成它。

最終，我們正在定義我們的觀察者的行為。

我們的事件源是設置間隔，

我們已經將其包裝在我們的觀察者中，

在拋出錯誤之前。

我們還可以添加一個完成的條件。

比如說，如果計數等於 2 ，

那麼我們只需調用 `observer.complete` ：

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
export class HomeComponent implements OnInit, OnDestroy {
  ...
  ngOnInit() {

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
+       if (count === 2) {
+         observer.complete();
+       }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    });
  }
  ...
}
```

現在重新整理，我們可以看到我們的計數器在計數到 2 時就完成了，沒有再記錄其他的東西，也沒有達到我們的錯誤條件，因為我們在到達之前就完成了觀察者。

這是很重要的，要理解並謹記每當觀察者完成時，它真的結束了。 之後不會再發出其他的值了，這在某種程度上是有道理的，因為它已經完成了。

現在，如果你想對完成做出反應，你可以將第 3 個參數添加到 `subscribe` 方法中，這是你的完成處理程序函數。

這是一個不帶參數的函數，因為完成不傳遞任何參數，它只是一個函數，你可以在其中進行一些清理工作或者你需要做的其他事情。

在這裡，我只是記錄了 "Completed!" 的訊息：

- [`home.component.ts`](../../obs-app/src/app/home/home.component.ts)

```diff
...
export class HomeComponent implements OnInit, OnDestroy {
  ...
  ngOnInit() {

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
+   }, () => {
+     console.log('Completed!');
+   });
  }
  ...
}
```

還有一個重要的事情，如果你的觀察者已經完成了，你就不需要取消訂閱，但是，再次強調，你可能不知道這一點，所以在 `ngOnDestroy()` 中你仍然可以進行取消訂閱而不會出錯。

現在如果我重新加載，我們會再次看到我們的日誌，在數字 2 之後，我們看到了 "Completed!"。

## Errors vs Completion

現在值得注意的是，你可能會認為當出現錯誤時，complete 函數就會觸發，畢竟在拋出錯誤後，觀察者確實完成了，對吧？

但事實並非如此。

如果我們在這裡暫時更改完成的條件，讓我們假設為 4，因此這裡是 5，就假設如此，因此，這將在此條件之後發生，實際上會拋出一個錯誤。

你會看到一些可能讓你驚訝的事情。

我們在這裡看到我們的正常輸出，然後我們得到了那個錯誤，就是這樣。

你在任何地方都看不到我們的 "Completed!" log。

所以這裡從來沒有被記錄下來，這是你必須牢記的一個重要特點，關於觀察者，你必須牢記這一點。

當它因為錯誤而取消時，那與完成是不同的事情。

錯誤會取消觀察者，它不會使其完成。

從技術上講，在這兩種情況下，都不會發出新的值。

但就在這裡被調用的函數而言，存在著差異。
