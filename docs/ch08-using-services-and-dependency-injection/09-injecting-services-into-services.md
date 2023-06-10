# 09. Injecting Services into Services

回顧一下，階層式注入器的最高層級是 `AppModule` ，因此我們可以在 `AppModule` 中提供服務以確保所有應用程式都共用相同的服務實例。

現在我們將 `AccountsService` 的提供從 `AppComponent` 中刪除，並將其改為 `AppModule` 來提供：

- [`app.component.ts`](../../services-app/src/app/app.component.ts)

```typescript
...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AccountsService]
})
export class AppComponent implements OnInit { ... }
```

- [`app.module.ts`](../../services-app/src/app/app.module.ts)

```typescript
...
import { AccountsService } from './accounts.service';

@NgModule({
  ...
  providers: [AccountsService],
  ...
})
export class AppModule { }
```

現在我們甚至可以將服務注入到其他服務中，因為這是無法通過在 component 層級上提供服務來實現的，我們需要在 `AppModule` 中提供它。

假設我們想要在呼叫 `AccountsService` 中的方法時記錄某些事情。

因此，我現在必須在 `AppModule` 中提供一個 `LoggingService` ：

- [`app.module.ts`](../../services-app/src/app/app.module.ts)

```typescript
...
import { LoggingService } from './logging.service';

@NgModule({
  ...
  providers: [..., LoggingService],
  ...
})
export class AppModule { }
```

爲了確保整個應用程式都使用相同的實例，我們還需要刪除其他地方的提供。 也因為我們不再需要在 `NewAccountComponent` 和 `AccountComponent` 中輸出 log ，因此我們也將輸出 log 的程式碼刪除：

- [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts)

```typescript
...
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {
  ...
  onCreateAccount(accountName: string, accountStatus: string) {
    ...
    // this.loggingService.logStatusChange(accountStatus);
  }
}
```

- [`account.component.ts`](../../services-app/src/app/account/account.component.ts)

```typescript
...
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  ...
  onSetTo(status: string) {
    ...
    // this.loggingService.logStatusChange(status);
  }
}
```

相反，假設我想要在 AccountsService 中使用這個 `LoggingService` ，並且我可能想要在那裡調用 `logStatusChange()` 方法，因為這不是狀態變更的唯一地方，無論是因為我們添加了新帳戶還是因為我們調用了 `updateStatus()` 。

因此，要在那裡使用該服務，通常我們是這樣開始的：

- [`accounts.service.ts`](../../services-app/src/app/accounts.service.ts)

```typescript
import { LoggingService } from './logging.service';         // (1)

export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) { }   // (2)

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);            // (3)
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);            // (3)
  }
}
```

1. 導入 `LoggingService`
2. 添加一個構造函式並注入我們的 `LoggingService` （並且我們已經在 `AppModule` 中提供了它）
3. 在方法中調用 `logStatusChange()`

但現在如果我們重新加載應用程式，我們會看到一個錯誤：

```typescript
Error: app.module.ts:21:15 - error NG2005: The class 'AccountsService' cannot be created via dependency injection, as it does not have an Angular decorator. This will result in an error at runtime.

Either add the @Injectable() decorator to 'AccountsService', or configure a different provider (such as a provider with 'useFactory').
```

原因是，如果您將一個服務注入到其他地方，則這個地方需要附帶一些元資料。

像是 component 需要被 `@Component` 標記，指令也需要被 `@Directive` 標記。

## Adding `@Injectable` to the `AccountsService`

而現在我們的 `AccountsService` 並沒有被任何元資料標記，因此我們需要附加一些元資料，就是 `@Injectable` ：

- [`accounts.service.ts`](../../services-app/src/app/accounts.service.ts)

```typescript
import { Injectable } from '@angular/core';
...

@Injectable()
export class AccountsService { ... }
```

這告訴 Angular，現在「**這個服務是可被注入的**」，或者更準確地說，某些東西可以被注入其中。

注意，不是將 `@Injectable` 添加到要注入的服務上，而是添加到要被注入某些東西的服務上。 就像在 `LoggingService` 中不需要添加 `@Injectable` 。 只有在您希望被注入東西時才添加它。

## Always add `@Injectable` to Services

但是，建議在 Angler 的新版本中始終添加 `@Injectable` 。

從技術上講，現在沒有任何差別，但將來可能會有所不同，因此您可能已經養成了這種習慣，即添加它。

在這裡，我忽略了它，但您可以考慮添加它，以確保在將來不會意外出現問題。

## Summary

有了這個，如果我現在保存並重新加載應用程式，現在它可以正常運行。