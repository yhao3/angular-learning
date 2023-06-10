# 07. Understanding the Hierarchical Injector

在上一節最後我們發現點擊按鈕之後有部分功能沒有按照預期運作，其實原因是因為我們沒有正確地使用 Angular 的依賴注入器來注入服務。

## What is a Hierarchical Injector

- `AppModule`: Same Instance of Service is available **Application-wide**
- `AppComponent`: Same Instance of Service is available for **all Components** (but **not for other Services**)
- `Any other Component`: Same Instance of Service is available for **the Component and all its child components**

事實上，Angular 的依賴注入器實際上是一個「階層式的注入器」。

這意味著，如果我們在應用程式的某個地方提供一個服務，比如在一個 component 上，Angular 框架知道如何為該 component 創建該服務的實例，而且，重要的是，它的「 所有子 components 」也是如此。

因此該 component 及其所有子 components 以及子 component 的子 components 將收到**相同的服務實例**。

## `AppModule` is the Highest Level

我們還可以在其他地方提供服務。

最高層級就是 `AppModule` 。

`AppModule` 擁有一個提供者陣列，我們可以在其中提供服務：

```typescript
@NgModule({
  ...
  providers: [],
  ...
})
export class AppModule { }
```

如此一來該服務的類別的**同一個實例**在我們整個應用程式中都可用，包括所有 components 、所有指令和所有其他可能注入該服務的服務。

> **Note**: 我們也可以將服務注入到服務中，我會在後面再談這個問題。

## `AppComponent` is the Second Highest Level

下一個層級是 `AppComponent` 。

在那裡， `AppComponent` 及其所有子 components 都擁有相同的服務實例。

這對於任何 components 都是如此。

所以，即使我們有 `AppComponent` 的子 component ，如果我們在該子 component 上提供服務，該子 component 的所有子 component 都將擁有相同的實例，包括該子 component 本身，但不包括 `AppComponent` 。

> **Note**:
> The instances are not propagated upwards!
> 實例不會向上傳播！ 它們只在 component 樹中「向下」傳遞。

## Any other Component is the Lowest Level

因此，最低層級就是沒有子 component 的單個 component 。

如果我們在那裡提供一個服務，該 component 將擁有自己的服務實例，而且。

好吧，它沒有任何子 component ，所以這個實例只對該 component 可用。

如果在更高的層級上提供了相同的服務，它實際上會覆蓋掉。

這正是我們所做的。

所以讓我們在下一節中深入研究它。