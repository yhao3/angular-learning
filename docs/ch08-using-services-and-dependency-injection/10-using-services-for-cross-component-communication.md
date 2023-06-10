# 10. Using Services for Cross-Component Communication

在本小節中，我們將透過一個範例演示「服務如何使我們的應用程式更整潔、程式碼更簡潔、更集中，更易於維護」。

假設我們在 `Account` component 中點擊按鈕，出於某種原因，我們想在 `NewAccount` component 中輸出一些內容。

通常情況下，如果沒有使用服務，我們將不得不在 `Account` component 中發出一個事件，表示某些東西被點擊或發生了某些事情，以便我們更改狀態，接著還需要在模板中捕獲事件，並通過屬性綁定將新資料傳遞到我們想要處理它的 component 中。

相當複雜 😕 。

而使用服務，一切將變得更加簡單。

假設我們在 `AccountsService` 服務中希望提供一些事件，我們可以在一個 component 中觸發，並在另一個 component 中聽取。

因此，我們可以簡單地添加 `statusUpdated` 事件，它可以是一個事件發射器，我們從 `@angular/core` 中引入：

- [`account.service.ts`](../../services-app/src/app/accounts.service.ts)

```ts
import { EventEmitter, ... } from '@angular/core';
...
@Injectable()
export class AccountsService {
  ...
  statusUpdated = new EventEmitter<string>();
  ...
}
```

而在 `Account` 元件中，因為我們在這裡注入了 `AccountsService` 服務，所以我們可以在設置新狀態時調用帳戶服務的 `statusUpdated` 事件發射屬性來發射事件：

- [`account.component.ts`](../../services-app/src/app/account/account.component.ts)

```ts
...
export class AccountComponent {
  ...
  constructor(..., private accountsService: AccountsService) {}

  onSetTo(status: string) {
    ...
    this.accountsService.statusUpdated.emit(status);
  }
}
```

因此，現在我正在發射一個我在服務中設置的事件！

> **Note**:
> 補充說明，在後面的章節中，您將學習到另一種可以用來提交或發射事件並訂閱它的結構，而不是使用事件發射器。 但就目前而言，使用事件發射器是完全可以的。

再次提醒，事件發射器存在於我們的服務中。

而在 `NewAccount` 元件中，我現在想要監聽這個事件，所以我們可以在 constructor 中訂閱這個事件，並顯示一個警告：

- [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts)

```ts
...
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }
  ...
}
```

所以現在我不再需要建立任何屬性和事件綁定。 通過服務並搭配事件發射器，我們實現了跨 component 的通信。

您可以看到，如果我在這裡點擊更新帳戶的按鈕，我會得到一個警告，並且我可以看到新的狀態。

因此，現在我們正在通過服務在 component 之間進行通訊，這確實可以節省您很多時間。