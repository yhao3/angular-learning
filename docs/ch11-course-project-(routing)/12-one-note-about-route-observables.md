# 12. One Note about Route Observables

## Introduction

在前幾小節中，我們專注於在我們的 Angular 應用程式中實作路由功能。 我們成功地整合了各種元件，建立了流暢的導航流程。 在本講座中，我們將簡要複習 Angular 中的訂閱主題，並強調在使用自訂 `Observables` 物件時清理訂閱的重要性。

## Subscription Cleanup

在我們的 `RecipeDetail` 元件和 `RecipeEdit` 元件的實作過程中，我們使用了「訂閱」以處理來自父元件的動態資料。 需要注意的是，在某些情況下，例如使用我們自己創建且非由 Angular 管理的自訂 `Observables` 物件時，我們需要手動清理訂閱。

然而，在我們目前的實作中，不需要執行此清理作業。 Angular 將自動為我們處理清理。 然而，在您的專案中使用自訂 `Observables` 物件時，了解這一點非常重要。

## Conclusion

總結來說，我們已經討論了在 Angular 中使用自訂 `Observables` 物件時清理訂閱的重要性。 雖然在我們目前的設定中，Angular 會為我們處理清理工作，但對於未來的專案，記住這一點是很重要的。 通過了解訂閱和 `Observables` 物件的作用，我們可以確保進行高效且無錯誤的 Angular 開發。