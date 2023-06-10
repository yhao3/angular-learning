# 11. A Different Way of Injecting Services

如果您使用的是 Angular 6+（請檢查您的 `package.json` 以確定），您可以以不同的方式提供全局應用程式服務。

您可以在 `@Injectable()` 中設置以下配置，而不是將服務類添加到 `AppModule` 的 `providers[]` 陣列中：

```typescript
@Injectable({providedIn: 'root'})
export class MyService { ... }
```

這與以下程式碼完全相同：

```typescript
export class MyService { ... }
```
以及

```typescript
import { MyService } from './path/to/my.service';
 
@NgModule({
    ...
    providers: [MyService]
})
export class AppModule { ... }
```

使用這種語法完全是 optional 的，傳統的語法（使用 `providers[]` ）也能正常運作。

然而， **新語法**確實提供了一個優勢：Angular 可以在幕後懶加載服務，並自動刪除冗餘程式碼。

這可以提高性能和加載速度 - 不過這主要對於較大的服務和應用程式才會有明顯效果。