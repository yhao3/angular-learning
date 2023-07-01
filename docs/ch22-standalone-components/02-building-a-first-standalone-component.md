# 02. Building a First Standalone Component

在這個講座中，我們將探討如何在 Angular 中建立獨立元件並了解其提供的好處。獨立元件有助於減少程式碼冗余並增強 Angular 應用中的重構能力。

## Building a Regular Component

我們以 [`details.component.ts`](../../standalone-app/src/app/welcome/details/details.component.ts) 這個常規元件作為範例。

要將常規元件轉換為「獨立元件」，你可以在傳遞給 `@Component` 裝飾器的物件中添加一個名為 `standalone` 的特殊屬性。這個 `standalone` 屬性應該是一個 boolean 值，並設置為 `true`。

> **Note**:
> `false` 是預設值，不需要額外添加。

- [`details.component.ts`](../../standalone-app/src/app/welcome/details/details.component.ts)

```diff
...
@Component({
+ standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  ...
}
```

## Changing the Component Declaration

當將 `standalone` 標誌設置為 `true` 時，該元件將變成「獨立元件」，你不再需要在任何 `NgModule` 中宣告它。所以，你應該從 `declarations` 陣列和先前宣告它的 `NgModule` 的導入語句中刪除它。

- [`app.module.ts`](../../standalone-app/src/app/app.module.ts)

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
- import { DetailsComponent } from './welcome/details/details.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
- declarations: [AppComponent, WelcomeComponent, DetailsComponent],
+ declarations: [AppComponent, WelcomeComponent],
  imports: [BrowserModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Making Angular Aware of Standalone Components

雖然元件現在是獨立的，但 Angular 仍然需要知道它以識別和使用它。你需要在「**要使用該獨立元件的元件**」中導入它，而不是在 `NgModule` 中宣告它。

例如在範例中，使用 `DetailsComponent` 的元件是 `WelcomeComponent`。因此，我們需要在 `WelcomeComponent` 中導入 `DetailsComponent`：

- [`welcome.component.ts`](../../standalone-app/src/app/welcome/welcome.component.ts)

```diff
import { Component } from '@angular/core';
+ import { DetailsComponent } from './details/details.component';

@Component({
+ imports: [DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
```

> **Warning**:
> 然而，要使用 `imports` 屬性，使用獨立元件的元件本身也必須是「獨立元件」。 否則將出現以下錯誤：
> ```
> 'imports' is only valid on a component that is standalone.(-992010)
> ```

因此如果要在「常規元件」中使用「獨立元件」，我們需要暫時移除 `imports` 屬性並尋找其他解決方案。

## Combining Standalone Components with NgModules

獨立元件的一個優勢是可以與 NgModules 結合，從而實現平滑的遷移過程。我們可以逐步將個別元件切換為獨立元件，同時仍然在 `NgModules` 中使用它們，而不需要重新編寫整個應用程式。

要在模組中使用獨立元件，我們將它添加到模組的 `imports` 陣列中。在 `AppModule` 的示例中，我們將獨立元件添加到 `declarations` 陣列中的位置，改為添加到 `imports` 陣列中：

- [`app.module.ts`](../../standalone-app/src/app/app.module.ts)

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
+ import { DetailsComponent } from './welcome/details/details.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
- imports: [BrowserModule, SharedModule],
+ imports: [BrowserModule, SharedModule, DetailsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

如此一來，獨立元件就可以在該模組及其元件中使用。根據需要，也可以將其他獨立元件、指令或管道添加到 `imports` 陣列中。

## Importing Modules in Standalone Components

獨立元件可以引入其他獨立元件、指令或模組，以在其模板中使用。如果獨立元件需要使用 `NgModule` 中的指令，我們可以將該 `NgModule` 本身引入到獨立元件中。

例如 `SharedModule` 就是一個 `NgModule`，且它包含一個 `highlight` 指令：

- [`shared.module.ts`](../../standalone-app/src/app/shared/shared.module.ts)

```ts
import { NgModule } from '@angular/core';

import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective],
})
export class SharedModule {}
```

因此如果我們想在 `DetailsComponent` 中使用 `highlight` 指令，我們就可以將 `SharedModule` 導入到 `DetailsComponent` 中：

- [`details.component.ts`](../../standalone-app/src/app/welcome/details/details.component.ts)

```diff
import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';
+ import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
+ imports: [SharedModule],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
```

通過將包含 `highlight` 指令的 `SharedModule` 導入到獨立元件中，該指令就可以在獨立元件的模板中使用並起作用了。

## Conclusion

Angular 中的獨立元件提供了一種減少程式碼冗余並增強重構過程的解決方案。通過將 `standalone` 標誌設置為 true 並使用「imports」屬性，你可以使元件獨立並在遷移過程中與 `NgModule` 順利整合。這為開發和維護 Angular 應用提供了一種靈活的方法。