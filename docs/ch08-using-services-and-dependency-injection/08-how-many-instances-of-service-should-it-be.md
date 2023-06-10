# How many instances of service should it be

在知道了 Angular 的階層式注入器是如何運作之後，我們就可以解決目前應用程式中的問題了。

現在我們知道 `AccountsService` 這個服務在我們的應用程式中共有 3 個實例！

第一個在 `AppComponet` 中被提供：

- [`app.component.ts`](../../services-app/src/app/app.component.ts)

```typescript
...
@Component({
  ...
  providers: [AccountsService]
})
export class AppComponent implements OnInit { ... }
```

第二個在 `NewAccountComponent` 中被提供：

- [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts)

```typescript
...
@Component({
  ...
  providers: [..., AccountsService]
})
export class NewAccountComponent { ... }
```

第三個在 `AccountComponent` 中被提供：

- [`account.component.ts`](../../services-app/src/app/account/account.component.ts)

```typescript
...
@Component({
  ...
  providers: [..., AccountsService]
})
export class AccountComponent { ... }
```

因此，我們有 3 個實例，而且每個實例都有自己的 `accounts` 陣列。 這就是為什麼我們在 `NewAccountComponent` 中創建的帳戶不會顯示在 `AccountComponent` 中的原因。

## Solution

我們可以通過只在 `AppComponet` 中提供 `AccountsService` 來解決這個問題！

因此我們需要從 `NewAccountComponent` 和 `AccountComponent` 中刪除 `AccountsService` 的提供：

- [`new-account.component.ts`](../../services-app/src/app/new-account/new-account.component.ts)

```typescript
...
@Component({
  ...
//providers: [LoggingService, AccountsService]
  providers: [LoggingService]
})
export class NewAccountComponent { ... }
```

- [`account.component.ts`](../../services-app/src/app/account/account.component.ts)

```typescript
...
@Component({
  ...
//providers: [LoggingService, AccountsService]
  providers: [LoggingService]
})
export class AccountComponent { ... }
```
