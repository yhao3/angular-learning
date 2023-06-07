# 04. Injecting the Logging Service into Components

## Hierarchical Injector

Angular 提供了我們存取服務的機制，基本上就是使用了依賴注入的設計模式。

我們只需要將服務注入到元件中，就可以使用該服務。

如果要注入一個服務，可以遵循以下步驟：

1. 在需要使用該服務的元件中，添加構造函數並聲明 `private` 的服務類型。 這告訴 Angular 我們需要這個服務的實例。
2. 在元件的裝飾器中，使用 `providers` 屬性提供服務。 這告訴 Angular 如何創建該服務的實例。
3. 最後，我們就可以直接訪問注入的服務實例，並使用它的方法或屬性。

## Injecting the Logging Service into New Account Component

- [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts)

```ts
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';               // (1)

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]                                      // (3)
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService) {}           // (2)

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    this.loggingService.logStatusChange(accountStatus);            // (4)
  }
}
```

1. Import the `LoggingService` from `logging.service.ts` file.
2. Inject the `LoggingService` by declaring a private property in the constructor.
3. Add the `LoggingService` to the `providers` array.
4. Use the `LoggingService` and call the `logStatusChange()` method.

## Injecting the Logging Service into Account Component

- [`account.component.ts`](../../services-app/src/app/account/account.component.ts)

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService) {}

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    this.loggingService.logStatusChange(status);
  }
}
```