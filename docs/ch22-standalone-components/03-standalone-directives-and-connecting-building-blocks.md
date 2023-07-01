# 03. Standalone Directives and Connecting Building Blocks

## Turning a Directive into a Standalone Directive

為了遷移我們的應用程式以使用獨立元件與指令，我們將繼續以 `highlight` 指令的範例進行。這個指令目前是由 `Shared` 模組所匯出，並且在 `details` 元件中使用，該元件已經是獨立元件。

要將 `highlight` 指令轉換為獨立指令，我們需要在 `@Directive` 的裝飾器物件中加入 `standalone` 標記：

- [`highlight.directive.ts`](../../standalone-app/src/app/shared/highlight.directive.ts)

```diff
import { Directive, ElementRef } from '@angular/core';

@Directive({
+ standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = '#5f5aee';
    this.element.nativeElement.style.color = 'black';
    this.element.nativeElement.style.padding = '0.5rem';
  }
}
```

透過將 `standalone` 標記設為 `true`，我們表示這個指令應該被視為一個獨立的建構元件。

## Removing the `SharedModule`

由於指令現在是獨立的，我們不再需要在任何 `NgModule` 中宣告它。在這個示範應用程式中，我們可以完全移除 `Shared` 模組，因為它不再需要。

```shell
cd src/app/shared
rm shared.module.ts
```

- [`app.module.ts`](../../standalone-app/src/app/app.module.ts)

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
- import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetailsComponent } from './welcome/details/details.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
- imports: [BrowserModule, SharedModule, DetailsComponent],
+ imports: [BrowserModule, DetailsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Importing the Standalone Directive

在 `details` 元件中，我們之前是透過匯入 `Shared` 模組來使用 `highlight` 指令。由於指令現在是獨立的，我們需要直接在 `details` 元件中匯入它。

> **Note**:
> 這一點在處理獨立元件與指令時非常重要！

- [`details.component.ts`](../../standalone-app/src/app/welcome/details/details.component.ts)

```diff
import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';
- import { SharedModule } from 'src/app/shared/shared.module';
+ import { HighlightDirective } from 'src/app/shared/highlight.directive';

@Component({
  standalone: true,
- imports: [SharedModule],
+ imports: [HighlightDirective],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  ...
}
```

## Conclusion

需要注意的是，在處理獨立元件、指令和其他建構元件時，僅僅加入 `standalone` 標記是不夠的。您還需要在要使用這些元件或指令的元件或模組中匯入它們。

在這個例子中，我們希望在 `details` 元件中使用 `highlight` 指令，因此我們將 `highlight` 指令匯入 `details` 元件的 `imports` 陣列中。

透過遷移另一個建構元件為獨立元件，我們使得應用程式更加具備模組化與彈性。