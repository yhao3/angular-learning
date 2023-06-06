# 10. Building a Structural Directive

現在我們理解了星號的作用之後，我們可以撰寫自己的結構性指令。

## 1. Creating a `unless` Directive via Angular CLI

讓我們創建一個新的指令，我將使用 CLI 進行操作。

我將它命名為 `unless`，因此我基本上要創建 `ngIf` 指令的相反，因此這個 `unless` 指令只有在條件為 `false` 時才會添加某些內容，而 `ngIf` 則是在條件為 `true` 時才會執行：

```shell
ng g d unless
```

```
CREATE src/app/unless.directive.spec.ts (224 bytes)
CREATE src/app/unless.directive.ts (141 bytes)
UPDATE src/app/app.module.ts (690 bytes)
```

這裡我會刪除用於測試的 `spec` 檔案，然後在 `unless` 指令中獲取選擇器，這樣就可以了。

## 2. Add `@Input` Decorator to Get the Condition as Input

現在在這裡，我需要將條件作為輸入獲取。

所以我要添加 `@Input` 裝飾器。

請記住，最後我們將使用方括號 `[]` 進行屬性綁定，因為 Angular 會幫我們轉換它。

我們當然需要從 `@angular/core` 中導入 `@Input`。

然後在這裡，我想要綁定到一個名為 `unless` 的屬性，這是我們得到的簡單條件：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
import { ..., Input } from '@angular/core';
...
export class UnlessDirective {

  @Input()
  unless;
  ...
}
```

## 3. Add a Setter to Execute a Method Whenever the Condition Changes

但是，每當這個條件發生變化時，也就是每當這裡的某個輸入參數發生變化時，我想要執行一個方法，因此我可以使用 `set` 關鍵字來實作一個 setter 。

這會將這個 `unless` 屬性轉換為一個方法，雖然從技術上講，這仍然是一個屬性，它只是一個在屬性發生變化時執行的 setter 方法，當然，這個屬性在這個指令之外發生變化時也會發生變化。

因此，除非指令明確傳遞的條件發生變化或者這個條件的某個參數發生變化，`unless` 都需要接收這個屬性通常作為輸入值。

我們知道這將是一個 boolean 值，因為它最終將成為我們的條件。 所以我們也可以將參數命名為 `condition` ：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
...
export class UnlessDirective {

  @Input()
  set unless(condition: boolean) {

  }
  ...
}
```

然後我們可以檢查 `condition` 是否不為 `true`，這是我想要顯示某些內容的情況，因為 `unless` 是 `ngIf` 的相反，如果 `condition` 為 `true`，那麼我就不想顯示任何內容：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
...
export class UnlessDirective {

  @Input()
  set unless(condition: boolean) {
    if (!condition) {

    } else {

    }
  }
  ...
}
```

這就是我們獲取條件的方式，以及如何使用它來顯示內容。

## 4. Accessing the Template and the Place Where We Want to Render It

請記住，我們的 `UnlessDirective` 最終會位於一個 `ng-template` component 中，因為如果我們使用星號，Angular 最終就會將其轉換為 `ng-template`。

因此，我們可以訪問這個 `ng-template` 模板，我們還需要訪問我們想要渲染的檔案中的位置。

而幸運的是兩者都可以被注入！

### 4.1 Injecting the `TemplateRef` to Access the Template

通過添加 `templateRef` 注入模板。 類型是 `TemplateRef` ：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
import { ..., TemplateRef } from '@angular/core';         // (1)
...
export class UnlessDirective {
  ...
  constructor(private templateRef: TemplateRef<any>) { }  // (2)

}
```

1. 我們需要從 `@angular/core` 中導入 `TemplateRef`
2. `TemplateRef` 是一個泛型，你可以在泛型中簡單地指定為 `any`

> **Note**:
> 就像 `ElementRef` 為我們提供了訪問指令所在元素的能力一樣，`TemplateRef` 也是如此，但是類型是泛型。

### 4.2 Injecting the `ViewContainerRef` to Access the Place Where We Want to Render the Template

我們需要的第二個信息是視圖容器。

那麼我們應該在哪裡渲染它？

模板是「什麼」，現在聚焦的問題是「在哪裡」？

所以我將它命名為 `vcRef` 。 類型是 `ViewContainerRef`，也從 `@angular/core` 導入：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
import { ..., ViewContainerRef } from '@angular/core';
...
export class UnlessDirective {
  ...
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
```

這標記了我們在檔案中「放置此指令的位置」。 Angular 標記了這個位置。

> **Note**:
> 如果你在開發者工具中進行檢查，你就可以看到這一點。

## 5. Rendering the Template in the Desired Place

有了這兩個注入之後，當條件發生變化時，我們可以使用 `vcRef` 調用 `createEmbeddedView()` 方法，它創建一個視圖並將其放入這個視圖容器中。

而這個視圖就是我們注入的 `templateRef` 。

而當條件為 `true` 時，那麼我們只需調用 `clear()` 方法從 DOM 中移除這個位置的所有內容：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
...
export class UnlessDirective {

  @Input()
  set unless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
```

有了這些，我們的自定義指令就設置好了。

## 6. Registering the Directive

當然，我們需要確保指令在 `app.module.ts` 中被註冊，但是 Angular CLI 已經為我們完成了這個步驟：

- [`app.module.ts`](../../directives/src/app/app.module.ts)

```ts
...
import { UnlessDirective } from './unless.directive';

@NgModule({
  declarations: [
    ...
    UnlessDirective
  ],
  ...
})
export class AppModule { }
```

## 7. Using the Directive

現在，在 `app` component 中，我們可以使用我們自己的指令來替換這裡的 `ngIf` ：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
        ...
        <div *ngIf="!onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{odd: even % 2 !== 0}"
            [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
        <ng-template [ngIf]="!onlyOdd">
          <div>
            <li
              class="list-group-item"
              [ngClass]="{odd: even % 2 !== 0}"
              [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
              *ngFor="let even of evenNumbers">
              {{ even }}
            </li>
          </div>
        </ng-template>
        ...
```

我將註釋掉這裡的所有內容，只複製原始的 `div` ：

- [`app.component.html`](../../directives/src/app/app.component.html)

```html
        ...
        <!-- ... -->
        <div *appUnless="onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{odd: even % 2 !== 0}"
            [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
            *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
        ...
```

所以，在這裡，我們不需要檢查 `onlyOdd` 是否為 `false`，請記住，`unless` 指令將已經檢查相反的情況。

所以在這裡，我們只需要傳遞 `onlyOdd`。

## 8. Fixing the Binding Error

但現在我們會得到一個無法綁定到 `appUnless` 的錯誤，因為它不是一個已知的屬性：

```
NG0303: Can't bind to 'appUnless' since it isn't a known property of 'div' (used in the 'AppComponent' component template).
1. If 'div' is an Angular component and it has the 'appUnless' input, then verify that it is a part of an @NgModule where this component is declared.
2. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.
```

為什麼會出現這個錯誤？

我們之所以會出現這個錯誤，是因為我們正在嘗試進行屬性綁定，使用了 `@input` 進行自定義屬性綁定，屬性名稱為 `unless`。

請記住，星號會自動將其轉換為這種 `ng-template` 語法，然後我們嘗試對指令名稱 `appUnless` 進行屬性綁定。

所以，我們必須確保這裡的 `unless` 屬性與指令名稱完全相同，也就是與選擇器名稱相同！

因此，我們需要將 `unless` 屬性改名為 `appUnless` ：

- [`unless.directive.ts`](../../directives/src/app/unless.directive.ts)

```ts
...
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input()
  set appUnless(condition: boolean) {
    ...
  }
  ...
}
```

現在，這樣就可以正常工作了，你可以看到，如果我按下 ` Only show odd numbers ` 按鈕切換，我們得到的行為與之前相同，即使我註釋掉了 `ngIf` 區塊，並使用自己的 `appUnless` 指令。

這就是我們自己的自定義結構性指令的構建方式。