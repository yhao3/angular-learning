# Understanding the Role of AppModule and Component Declaration

預設情況下，Angular 不會掃描所有文件。 因此，如果不告訴它我們創建的 `server` component 存在的話，它就不會知道。

因此我們必須在 `app.module.ts` 中的 `@NgModule` 告訴 Angular，我們創建了一個新的 component。

- `app.module.ts`

```ts
import { ServerComponent } from './server/server.component';  // (1)

@NgModule({
  declarations: [
    ...
    ServerComponent                                           // (2)
  ],
  ...
})
export class AppModule { }
```

> 1. import `ServerComponent` from `./server/server.component`
> 2. add `ServerComponent` to `declarations` array

現在我們成功註冊了 `ServerComponent`，下一節我們將正式使用我們創建的這個 component。
