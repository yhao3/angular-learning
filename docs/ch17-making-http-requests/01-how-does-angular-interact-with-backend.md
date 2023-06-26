# 01. How Does Angular Interact with Backend?

在 Angular 應用程式中，連接到資料庫涉及與伺服器端的 API 進行通訊以存儲和檢索資料。 值得注意的是，Angular 不直接連接到資料庫，並且在 Angular 應用程式中存儲資料庫憑證是極度不安全的。 在這堂課中，我們將探討 Angular 如何與伺服器端的 API 互動以管理資料庫操作。

## Avoiding Direct Database Connections

由於 Angular 是一個前端 JavaScript 應用程式，任何人都可以檢查和閱讀程式碼。 因此，在 Angular 應用程式中存儲資料庫憑證是非常重要的。 將敏感資訊存儲在前端程式碼中將危及應用程式的安全性。

## Communicating with a Server-Side API

要將 Angular 連接到資料庫，您需要向伺服器端 API 發送 HTTP 請求，並收到相應的 HTTP 回應。 伺服器端 API 充當與資料庫的接口，可以使用 REST 或 GraphQL 等技術來實現。 在本課程中，我們將專注於使用 REST API，這是一種廣泛使用的 API 格式。

伺服器端 API 的行為類似於網站，但返回的不是 HTML，而是通常以 JSON 格式返回的資料。

## Server-Side Code and Database Interaction

雖然 Angular 不處理伺服器端 API 的創建，但它可以與 API 進行通訊以執行資料庫操作。 在伺服器端，您可以編寫與資料庫互動的程式碼，用於存儲和檢索資料。 重要的是要理解，Angular 充當客戶端應用程式，而伺服器端程式碼處理資料庫互動。

除了資料庫存取之外，還有許多原因需要與伺服器通訊，例如上傳檔案或將分析資料發送到後端。 在本章節中，我們將重點介紹 Angular 與伺服器端 API 之間進行資料存儲和檢索的基本原則。