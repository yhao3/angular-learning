# 04. Using RxJS Operators to Transform Response Data

## Transforming Data with `Observable` Operators

資料轉換在處理 `Observable` 時是一項重要的任務。 雖然我們可以在 `subscribe()` 方法內進行資料轉換，但使用 `Observable` 運算子被視為良好的實踐方式。

`Observable` 運算子讓我們能夠透過不同的步驟將資料進行漏斗式轉換，這樣的程式碼撰寫方式更為清晰，並且能夠輕鬆調整或替換轉換步驟。 在本小節中，我們將探索使用 `Observable` 運算子，特別是 `map()` 運算子，在資料到達 `subscribe()` 方法之前對資料進行轉換的方法。

首先，讓我們了解 `pipe()` 方法的目的。`pipe()` 方法允許我們在訂閱之前對 `Observable` 資料應用多個運算子。 我們可以將其視為通過不同轉換的方式對資料進行通道化。

要使用 `map()` 運算子，我們首先需要從 `rxjs/operators` 模組中導入它。 `map()` 運算子允許我們對資料進行一些操作並返回新的資料。 返回的資料會自動重新封裝為 `Observable`，以便我們仍然可以對其進行訂閱。

以下是在 `pipe()` 方法中使用 `map()` 運算子的範例：

- [`app.component.ts`](../../http-app/src/app/app.component.ts)

```diff
...
+ import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}
  ...
  fetchPosts() {
    this.http
      .get('https://ng-complete-guide-1b8d7-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
+     .pipe(
+       map(responseData => {
+         const postsArray = [];
+         for (const key in responseData) {
+           if (responseData.hasOwnProperty(key)) {
+             postsArray.push({ ...responseData[key], id: key });
+           }
+         }
+         return postsArray;
+       })
+     )
-     .subscribe(responseData => {
+     .subscribe(posts => {
-       console.log(responseData);
+       console.log(posts);
+     }
    );
  }

}
```

在上述程式碼中，我們創建了一個空的 `postsArray` 陣列。使用 `for` 迴圈遍歷 `responseData` 物件中的每個鍵。 我們檢查該 key 是否屬於物件本身，以避免訪問其原型中的屬性。 對於每個 key，我們使用解構運算子 (`...`) 從嵌套物件中提取鍵值對，並添加一個 `id` 欄位到文章物件中，該欄位存儲鍵值。 最後，我們將新的文章物件推入 `postsArray` 陣列中。

現在我們可以發現 console 中輸出的資料已經被轉換為陣列，並且每個文章物件都有一個 `id` 欄位：

```
[
    {
        "content": "test...",
        "title": "Test",
        "id": "-NYpnBUl-mr7OSbcVtNn"
    }
]
```

## Conclusion

使用像 `map()` 這樣的運算子，我們可以輕鬆地以乾淨且高效的方式轉換資料。 這讓我們能夠使用所需的資料結構並執行特定於應用程式需求的操作。