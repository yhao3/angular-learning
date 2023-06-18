# 18. Configuring the Handling of Query Parameters

目前有個問題是，我們在 `servers/:id` 頁面中的 `allowEdit` 請求參數，一但進入 `servers/:id/edit` 頁面時，這個請求參數就會消失。

這導致目前 Server ID 為 `3` 的 `allowEdit` 值雖然在 `servers/3?allowEdit=1` 頁面被設為 `1` （可修改），但在 `servers/3/edit` 頁面中卻消失變成 `null` 導致它還是無法被修改。

我們需要做的是「將請求參數在切換到子路由時能夠被保留」。

這可以透過將 `queryParamsHandling` 設為 `'preserve'` 來達成：

- [`server.component.ts`](../../routing-app/src/app/servers/server/server.component.ts)

```ts
  ...
  onEdit() {
    ...
    this.router.navigate(..., {..., queryParamsHandling: 'preserve'});
  }
}
```