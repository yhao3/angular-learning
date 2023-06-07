# 05. Alternative Injection Syntax

通常，通過 constructor injection 將服務（或一般情況下的依賴項）注入到元件中是最常見的方式。 在你所參與的大多數 Angular 專案中，你會看到這種方法的應用。

然而，還有一種替代的方式可以進行依賴注入：使用 Angular 的 `inject()` 函式。

與以下方式注入 `LoggingService` 不同：

```ts
@Component(...)
export class AccountComponent {
  // @Input() & @Output() code as shown in the previous lecture
 
  constructor(private loggingService: LoggingService) {}
}
```

你可以使用 `inject()` 函式進行注入，像這樣：

```ts
import { Component, Input, Output, inject } from '@angular/core'; // <- Add inject import
 
@Component(...)
export class AccountComponent {
  // @Input() & @Output() code as shown in the previous lecture
  private loggingService?: LoggingService; // <- must be added
 
  constructor() {
    this.loggingService = inject(LoggingService);
  }
}
```

你可以自行選擇使用哪種方式。

但在本專案中，我們將使用 constructor injection 的方式。