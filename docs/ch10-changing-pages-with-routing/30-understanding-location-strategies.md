# 30. Understanding Location Strategies

## Understanding URL Routes

當檢視我們的應用程式時，我們可以識別出多個路由，例如 `/users`、`/servers` 等等。

然而，必須認識到，儘管這些路由在 localhost 開發環境中可能運作正常，但在真實的網頁伺服器上運行時可能無法正常運作。 這是伺服器在解析和處理 URL 時所扮演的角色所導致的。

## Configuring the Server

在我們的本地開發設置中，我們使用了一個特殊的設定來進行開發伺服器。 為了確保您的 Angular SPA 應用程式在真實伺服器上正確運作，複製以下這個設定是必要的：

> **Note**:
> 進一步關於這個設定的細節將在「部署」章節進行討論。

具體來說，托管您的應用程式的伺服器需要在遇到 `404` 錯誤時配置為返回 `index.html` 檔案。 這個檔案作為 Angular 應用程式的起始點。 值得注意的是，URL 會先被「伺服器」處理，而不是 Angular。

例如，如果我們有一個路由 `/servers`，托管我們網頁應用程式的伺服器將尋找對應的 `/servers` 路由。 然而，在大多數情況下，這樣的路由不存在，因為只有一個名為 `index.html` 的檔案包含了我們的 Angular 應用程式。 我們希望 Angular 負責路由，但如果伺服器認為這是一個 `404` 錯誤，它將顯示一個錯誤頁面，阻止 Angular 接管。

為了克服這個問題，確保您的網頁伺服器在這些情況下返回 `index.html` 檔案是至關重要的。 然而，如果由於任何原因這個設置不起作用，或者如果您需要支援不處理客戶端路由（Angular 處理的）的舊瀏覽器，則提供了另一種方法。 這種較舊的技術在幾年前很常見，涉及在路由中使用 Hash (`#`) 符號。

## Enabling Hash Mode Routing

要啟用 Hash 路由模式，請按照以下步驟進行：

1. 在您的 `app-routing.module.ts` 中註冊路由的地方，將第 2 個參數作為 JavaScript 物件傳遞給 `forRoute` 方法。 這個物件允許您配置路由的各種設置。 其中一個關鍵的設置為是否使用哈希配置（`useHash`），可以設置為 `true`。
2. 啟用此配置並保存更改後，您將看到 URL 中添加了一個 `#` 符號（`#`）。例如，當點擊 "`servers`" 路由時，您將看到 `#` 符號將 URL 的不同部分分隔開來。
3. Hash 模式路由通知網頁伺服器僅考慮 `#` 符號之前的 URL 部分。 隨後，伺服器將忽略 `#` 符號之後的所有內容。 這種方法允許 Angular 作為客戶端應用程式處理 `#` 符號之後的部分的路由。

### Passing a second argument as a JavaScript object to the `forRoute` method In app routing module

首先，我們需要在 `app-routing.module.ts` 中註冊路由的地方，將第 2 個參數作為 JavaScript 物件傳遞給 `forRoute` 方法。 這個物件允許您配置路由的各種設置。 其中一個關鍵的設置為是否使用哈希配置（`useHash`），可以設置為 `true` ：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
@NgModule({
  imports: [
-   RouterModule.forRoot(appRoutes)
+   RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  ...
})
export class AppRoutingModule { }
```

> **Note**:
> 預設情況下，這個值是 `false`，因此不需要額外指定。


啟用此配置並保存更改後，您將看到 URL 中添加了一個 `#` 符號。 例如，當點擊 "`servers`" 路由時，您將看到 `#` 符號將 URL 的不同部分分隔開來：
   
```
localhost:4200/#/servers
```

Hash 模式路由通知網頁伺服器僅考慮 `#` 符號之前的 URL 部分。 隨後，伺服器將忽略 `#` 符號之後的所有內容。 這種方法允許 Angular 作為客戶端應用程式處理 `#` 符號之後的部分的路由。

如果之前的方法對您的特定情況不起作用，Hash 模式路由可以作為一種可行的解決方案。 然而，強烈建議使用 HTML 歷史記錄模式，它提供了沒有 `#` 符號的更乾淨和美觀的路由。 HTML 歷史記錄模式與網頁應用程式中常見的標準 URL 形式非常相似。

要切換回 HTML 歷史記錄模式，我們只需要還原程式碼或將 `useHash` 設置為 `false` 即可。 這將使 URL 看起來更乾淨，並且不會使用 `#` 符號，提升了使用者體驗：

- [`app-routing.module.ts`](../../routing-app/src/app/app-routing.module.ts)

```diff
...
@NgModule({
  imports: [
-   RouterModule.forRoot(appRoutes, {useHash: true})
+   RouterModule.forRoot(appRoutes)
  ],
  ...
})
export class AppRoutingModule { }
```

按照這些步驟，您可以無縫地配置 Angular 應用程式的路由並根據您的需求選擇最適合的模式。

## Summary

路由在 Angular 應用程式中扮演著重要的角色，使組件和視圖之間的導航變得順暢。 在將應用程式部署到實際的網頁伺服器上時，了解 URL 如何由伺服器處理和處理是至關重要的。 通過配置伺服器返回 `index.html` 檔案並探索 Hash 模式和 HTML 歷史記錄模式等路由選項，您可以確保 Angular 應用程式中有效且使用者體驗佳的路由。