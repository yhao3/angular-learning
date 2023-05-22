# 03. Creating a new Component

## Create `server.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {}
```

> **Note**:
> 注意 `templateUrl` 是相對路徑，即相對於 `app.component.ts` 的路徑。

## Create `server.component.html`

```html
<p>The Server Component</p>
```

下一章節，我們將正式使用我們創建的這個 component。
