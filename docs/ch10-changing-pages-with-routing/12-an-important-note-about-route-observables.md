# 12. An Important Note about Route Observables

在前一節中，我們學習了如何訂閱參數以更新它們或對其變化做出反應，並在頁面上已存在時進行更新。

我們使用 `Observable` 提供的 `subscribe()` 方法來監聽 `Params` 物件的變化。這樣做很好，你不需要在 `user.component.ts` 中做任何其他事情。

然而，我想提醒你一些事情。實際上，Angular 在背景為你處理了一些重要的工作。

當該元件被銷毀時，它會清除你在此處設置的訂閱！

因為如果不這樣做，假設你訂閱了參數的變化，然後離開了這個元件，稍後再回來。

當你離開後，該元件將被銷毀，當你回來時，將創建一個新的元件。

但該訂閱將一直存在於內存中，因為它與該元件沒有密切關聯。

所以，如果元件被銷毀，訂閱將不會被銷毀。

現在，Angular 會在背景處理這個訂閱的銷毀，所以它會存在這裡。

但從理論上講，你可能希望實現 `OnDestroy` 生命週期鉤子，從 `@angular/core` 中導入它。

因此，你需要實作 `ngOnDestroy()` 方法。

然後，你可以將該訂閱存儲在一個屬性中。

讓我們將其命名為 `paramsSubscription`，它的類型是 `Subscription`。

> **Note**:
> `Subscription` 需要從 `rxjs/Subscription` 中導入，`RXJS` 是提供所有這些可觀察功能的套件。 正如我之前提到的，它不隨 Angular 一起提供，但 Angular 使用了這個套件。

正好 `subscribe()` 方法返回的是一個 `Subscription` 物件，所以我們將返回值 assign 給 `this.paramsSubscription` ，然後在 `ngOnDestroy()` 方法中取消訂閱：

- [`user.component.ts`](../../routing-app/src/app/users/user/user.component.ts)

```ts
import { ..., OnDestroy, ... } from '@angular/core';
...
import { Subscription } from 'rxjs';

...
export class UserComponent implements OnInit, OnDestroy {
  ...
  paramsSubscription: Subscription;
  ...
  ngOnInit() {
    ...
    this.paramsSubscription = this.route.params
      .subscribe(
        ...
      );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
```

一旦元件被銷毀，我們現在可以訪問並取消訂閱。

再次強調，這並不是必需的，但手動這樣做也沒有壞處。

因為 Angular 會處理與路由 `Observable` 相關的部分。

但如果你添加了自己的 `Observable` 物件，在接下來的 `Observable` 部分我會回來討論這個問題，你需要自行取消訂閱。

我只是想提醒你這一點，因為了解背後的情況總是非常重要的。

再次強調，這在這裡並不是必需的，但這樣做也不會對你的應用程式造成任何不利影響。