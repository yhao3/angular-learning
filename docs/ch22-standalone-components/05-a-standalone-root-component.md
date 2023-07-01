# 05. A Standalone Root Component

## Turnning the `App` Component into a Standalone Component

### Updating the `App` Component

- [`app.component.ts`](../../standalone-app/src/app/app.component.ts)

```diff
import { Component } from '@angular/core';
+ import { WelcomeComponent } from './welcome/welcome.component';

@Component({
+ standalone: true,
+ imports: [WelcomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
```

### Removing the `AppModule`

於我們已成功將 `app.component` 遷移到獨立元件，因此可以刪除整個 `app.module.ts` 檔案，因為它已不再需要。

```shell
rm src/app/app.module.ts
```

## Updating the `main.ts` File

由於 `app.component` 是應用程式的重要元件且充當根元件，我們還必須在 `main.ts` 檔案中更新啟動程式碼。

在 `main.ts` 檔案中，刪除先前用於模組啟動的程式碼，並用來自 `@angular/platform-browser` 的 `bootstrapApplication()` 函式取而代之。

- [`main.ts`](../../standalone-app/src/main.ts)

```diff
import { enableProdMode } from '@angular/core';
- import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

- import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
+ import { bootstrapApplication } from '@angular/platform-browser';
+ import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

- platformBrowserDynamic().bootstrapModule(AppModule)
-   .catch(err => console.error(err));
+ bootstrapApplication(AppComponent);
```