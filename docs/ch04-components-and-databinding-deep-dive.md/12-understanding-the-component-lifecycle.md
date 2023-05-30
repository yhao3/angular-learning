# 12. Understanding the Component Lifecycle

到目前為止，可能有一件事可能讓你感到陌生，不確定它的用途是什麼。

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
...
export class CockpitComponent implements OnInit {
  ...
  ngOnInit(): void {
  }
  ...
}
```

這個 "`ngOnInit`" 方法在透過 CLI 建立的新元件中有什麼作用呢？ 它在做什麼呢？

`ngOnInit` 是一個生命週期鉤子（Lifecycle hook），Angular 支援多個生命週期鉤子。

讓我們仔細看一下。

## Lifecycle

| Lifecycle hooks       | Description                                                              |
|-----------------------|--------------------------------------------------------------------------|
| ngOnChanges           | Called after a bound input property changes                              |
| ngOnInit              | Called once the component is initialized                                 |
| ngDoCheck             | Called during every change detection run                                 |
| ngAfterContentInit    | Called after content (ng-content) has been projected into view           |
| ngAfterContentChecked | Called every time the projected content has been checked                 |
| ngAfterViewInit       | Called after the component’s view (and child views) has been initialized |
| ngAfterViewChecked    | Called every time the view (and child views) have been checked           |
| ngOnDestroy           | Called once the component is about to be destroyed                       |

如果在 Angular 中建立了一個新元件（當然是 Angular 負責建立這些元件），當它找到我們的選擇器之一時，它將實例化該元件的新版本並將其添加到 DOM 中。

因此，一旦實例化了新元件，Angular 就會在創建過程中經歷幾個不同的階段。

而我們實際上可以利用這些階段並執行一些程式碼。

我們可以通過實現一些 Angular 會呼叫的方法來利用這些階段，如果它們存在的話。

### 1. `ngOnChanges`

第一個階段，我們可以利用的第一個鉤子是 `ngOnChanges` 。

實際上，這可能會被執行**多次**。

它在新元件創建時的開始時執行。

但之後，每當我們綁定的輸入屬性之一變化時，它也總是被呼叫。

我指的是用 "`@input`" 標記的屬性，所以每當這些屬性接收到新值時。

### 2. `ngOnInit`

現在第二個鉤子是 `ngOnInit` 。

這個方法在元件初始化完成後執行。

這並不意味著我們可以看到它。

它尚未添加到 DOM 中，可以說它尚未顯示，但是 Angular 已經完成了基本的初始化。

例如，現在可以訪問和初始化我們的屬性，就可以說是物件已經被創建了。

> **Note**: 
> 補充一下， `ngOnInit` 會在 constructor 之後運行。

### 3. `ngDoCheck`

然後，我們有 `ngDoCheck` 。

這也會執行多次。

實際上，這個方法**會被大量執行**，因為它會在每次「變更檢測」運行時執行。

「變更檢測」是 Angular 確定模板上的某些內容是否有變化的監控系統，或者應該說， component 內部是否有變化。

所以是否需要在模板中更改某些屬性的值，例如從一個值改變為兩個值，那個屬性在模板中的輸出。

當然，Angular 需要重新渲染模板的那部分。

而 `ngDoCheck` 是在 Angular 每次執行「變更檢測」時執行的鉤子。

重要的是，**每次檢查都執行**！ 所以不僅僅是只在有變化時執行。

很多時候， `ngDoCheck` 會運行，因為你點擊了某個按鈕，它並沒有改變任何內容，但它仍然是一個事件，對於事件，Angular 必須檢查是否有變化，因為不然它怎麼知道？ 你沒有告訴它，對吧？ 所以在某些觸發事件上，如你點擊某處、計時器觸發或者可觀察物件已解析，它將檢查你的程式碼並執行 `ngDoCheck` 。

現在，雖然這聽起來可能非常低效，但 Angular 以非常高效的方式執行此操作。

所以變更檢測在 Angular 中運作得非常好，並且不會消耗太多性能。

如果你想在每個變更檢測循環中執行某些操作，比如手動通知 Angular 一些它無法檢測到的變化，可以善加利用 `ngDoCheck` 這個鉤子，雖然這是一個非常進階的用法。

### 4. `ngAfterContentInit`

接下來，我們來看 `ngAfterContentInit` 。

這在透過 `ng-content` 投影的內容初始化後被呼叫。

所以不是元件本身的視圖，而是可以說是父元件的視圖，特別是通過 `ng-content` 添加到我們元件中的一部分。

### 5. `ngAfterContentChecked`

當變更檢測檢查我們投射到元件中的這個內容時，會執行一個 `ngAfterContentInit` 檢查。

### 6. `ngAfterViewInit`

然後，當我們自己元件的視圖完成初始化時，就達到了 `ngAfterViewInit` 。

也就是說，一旦我們的視圖已經呈現完成，就會執行 `ngAfterViewInit` 。

### 7. `ngAfterViewChecked`

而 `AfterViewChecked` ，當我們確定所有必須進行的更改都顯示在視圖中，或者 Angular 沒有檢測到任何變化時，就會被呼叫。

### 8. `ngOnDestroy`

最後，如果你銷毀一個元件，例如如果你將 `ngIf` 放在它上面，然後將其設置為 `false` ，從而將其從 DOM 中移除，那麼就會呼叫 `ngOnDestroy` 。

這是一個很好的地方可以進行一些清理工作，因為這會在物件本身被 Angular 銷毀之前呼叫。