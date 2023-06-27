# 16. Changing the Response Body Type

在 Angular 中，您不僅可以配置 Response 的觀察模式（observe mode），還能配置 HTTP 請求的 Response 類型。 Response 類型決定 Angular 如何解釋接收到的回應資料。

預設情況下，Angular 假設回應資料是 JSON 格式，這意味著回應的主體（body）應包含有效的 JSON，Angular 會自動將其解析為 JavaScript 物件。

- The default response type is `json`

```ts
this.http.post<{ [key: string]: Post }>(
  'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
  postData,
  {
    observe: 'response',
    responseType: 'json' // default response type
  }
)
```

然而，您也可以指定其他回應類型。例如，如果回應資料是純文字，您可以將回應類型配置為 "`text`"，保持它作為文字而不將其轉換為 JavaScript 物件。 在下載文件的情況下，回應類型可以設定為 "`blob`"。

- We can also set the response type to specific type. e.g. `text`

```ts
this.http.post(
  'https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
  postData,
  {
  observe: 'response',
  responseType: 'text'
  }
)
```

