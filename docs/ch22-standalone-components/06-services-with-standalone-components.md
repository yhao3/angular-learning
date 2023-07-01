# 06. Services with Standalone Components

在本小節中，我們將探討如何在獨立元件中使用服務。 讓我們簡要了解在 Angular 中提供服務的不同方法。

## Using Services with Standalone Components

在示範應用程式中，我們有一個 `analytics` 服務，它被定義為一個使用 `@Injectable` 裝飾的類別。這個服務使用 `providedIn` 屬性設置為 `'root'`，提供給應用程式的所有元件。這確保所有元件和指令都可以注入並操作相同的服務實例：

- [`analytics.service.ts`](../../standalone-app/src/app/shared/analytics.service.ts)

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  registerClick() {
    console.log('Clicked!');
  }
}
```

這種方法與獨立元件無縫配合，因為不需要進行任何調整。服務可以被注入到獨立元件中，它們可以與共享的服務實例進行交互。

## Alternative Ways of Providing Services

除了上述推薦的方法外，還有其他提供服務的替代方法：

### 1. 將服務添加到模組的提供者陣列中

除了使用 `providedIn` 屬性之外，您可以將服務添加到模組的 `providers` 陣列中。這將使服務對該模組中的所有元件和指令可用，並創建一個服務的單一實例。

### 2. 將服務添加到元件中

另一種方法是在元件的裝飾器物件中使用 `providers` 屬性將服務添加到元件中。這允許該元件擁有自己的服務實例。如果同一個服務用於多個元件實例，則每個實例將擁有自己獨立的服務實例，而沒有共享狀態。

- [`details.component.ts`](../../standalone-app/src/app/welcome/details/details.component.ts)

```diff
...

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
+ providers: [AnalyticsService],
})
export class DetailsComponent {
  ...
}
```

> **Warning**:
> 這種方法很少使用，因為它會為每個元件實例產生獨立的服務實例，並且它們之間沒有共享狀態！

## Providing Services Globally without `providedIn`

如果您不想使用 `providedIn` 屬性將服務全域提供，則可以恢復將服務添加到提供者陣列的舊功能。在沒有模組的應用程式中，您可以進入 `bootstrap` 應用程式函式並添加第二個物件，其中包含一個 `providers` 屬性，這樣可以在全域提供服務。

- [`main.ts`](../../standalone-app/src/main.ts)

```diff
import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
+ import { AnalyticsService } from './app/shared/analytics.service';

if (environment.production) {
  enableProdMode();
}

- bootstrapApplication(AppComponent);
+ bootstrapApplication(AppComponent, {
+   providers: [AnalyticsService]
+ });
```

通過將服務添加到 `bootstrapApplication` 函式的 `providers` 陣列中，您可以實現在模組中擁有提供者陣列的等效行為。然而，建議使用 `providedIn` 語法來提供服務。

## Conclusion

在這堂講座中，我們探討了在 Angular 中如何在獨立元件中使用服務。我們討論了使用 `providedIn` 屬性全域提供服務並在元件之間共享單一實例的推薦方法。我們還提到了其他方法，例如將服務添加到模組的提供者陣列或特定元件中。

了解這些不同的方法使您在處理 Angular 中的服務和獨立元件時具有靈活性。