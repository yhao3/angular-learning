# 06. Creating a Data Service

## Creating a `accounts.service.ts` File

```shell

```shell
cd src/app/
```

```shell
vi accounts.service.ts
```

## Implementing the Accounts Service

- [`accounts.service.ts`](../../services-app/src/app/accounts.service.ts)

```ts
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

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}
```

## Updating the App Component

### Updating the `app.component.ts` File

在 [`app.component.ts`](../../services-app/src/app/app.component.ts) 中，雖然 `accounts` 陣列已經搬移到 service 中，但我們仍然必須保留 `accounts` 陣列屬性，因為我們的模板仍然需要它。

所以我們必須做的是：

1. 保留 `accounts` 陣列屬性
2. 注入 `AccountsService` 服務
3. 在 `ngOnInit()` 方法中，將 `accounts` 陣列屬性設定為 `AccountsService` 服務的 `accounts` 陣列屬性

- [`app.component.ts`](../../services-app/src/app/app.component.ts)

```ts
import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent implements OnInit {
  accounts: { name: string, status: string }[] = [];

  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }
}
```

### Updating the `app.component.html` File

對於 [`app.component.html`](../../services-app/src/app/app.component.html) 模板，我們必須做的是：刪除 `<app-new-account>` 的 `(accountAdded)="onAccountAdded($event)"` 這段 event binding 的程式碼。 因為我們已經將 `onAccountAdded()` 方法從 `app.component.ts` 搬移到 `new-account.component.ts` 中了！

- [`app.component.html`](../../services-app/src/app/app.component.html)

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
<!--  <app-new-account (accountAdded)="onAccountAdded($event)"></app-new-account> -->
      <app-new-account></app-new-account>
      <hr>
      <app-account
        *ngFor="let acc of accounts; let i = index"
        [account]="acc"
        [id]="i"
        (statusChanged)="onStatusChanged($event)"></app-account>
    </div>
  </div>
</div>
```

## Updating the NewAccount Component

也因為我們現在不再監聽 `accountAdded` 事件，所以我們可以從 [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts) 中刪除發射 `accountAdded` 事件的程式碼。

接著我們注入 `AccountsService` 服務，並在 `onCreateAccount()` 方法中呼叫 `AccountsService` 服務的 `addAccount()` 方法：

- [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts)

```ts
import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService, AccountsService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
```

## Updating the Account Component

最後，我們也可以從 [`account.component.ts`](../../services-app/src/app/account/account.component.ts) 中刪除發射 `statusChanged` 事件的程式碼。

接著我們注入 `AccountsService` 服務，並在 `onSetTo()` 方法中呼叫 `AccountsService` 服務的 `updateStatus()` 方法：

- [`account.component.ts`](../../services-app/src/app/account/account.component.ts)

```ts
import { Component, Input } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService, AccountsService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
```

## Summary

現在如果我們儲存更動，看起來一切正常，但如果我們點擊新增帳戶的按鈕，我們雖然不會收到錯誤，我們只會輸出 log 卻看不到任何新增的帳戶。

如果我點擊更新帳戶的按鈕，也只會看到 log 輸出。

所以某些地方出了問題，我們會在下一堂課中解決這個問題。
