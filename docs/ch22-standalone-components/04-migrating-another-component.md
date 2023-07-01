# 04. Migrating Another Component

## Turnning the `Welcome` Component into a Standalone Component

### Updating the `Welcome` Component

- [`welcome.component.ts`](../../standalone-app/src/app/welcome/welcome.component.ts)

```diff
import { Component } from '@angular/core';
+ import { DetailsComponent } from './details/details.component';

@Component({
+ standalone: true,
+ imports: [ DetailsComponent ],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
```

### Updating the `AppModule`

1. 由於 `welcome` 元件現在是獨立的，我們必須將它從 `AppModule` 中的 `declarations` 陣列中移除
2. 又因為我們需要在標準元件 [`app`](../../standalone-app/src/app/app.component.ts) 中使用 `welcome` 該獨立元件，所以我們必須將它加入到 `imports` 陣列中

- [`app.module.ts`](../../standalone-app/src/app/app.module.ts)

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetailsComponent } from './welcome/details/details.component';

@NgModule({
- declarations: [AppComponent, WelcomeComponent],
+ declarations: [AppComponent],
- imports: [BrowserModule, DetailsComponent],
+ imports: [BrowserModule, DetailsComponent, WelcomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Removing the Unnecessary Imports

最後，我們還可以把 `DetailsComponent` 從 `imports` 陣列中移除，因為現在我們沒有任何標準元件需要使用 `details` 元件了！

- [`app.module.ts`](../../standalone-app/src/app/app.module.ts)

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
- import { DetailsComponent } from './welcome/details/details.component';

@NgModule({
  declarations: [AppComponent],
- imports: [BrowserModule, DetailsComponent, WelcomeComponent],
+ imports: [BrowserModule, WelcomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```