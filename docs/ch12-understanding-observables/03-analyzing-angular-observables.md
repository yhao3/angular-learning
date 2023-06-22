# 03. Analyzing Angular Observables

首先讓我們看到 [`user.component.ts`](../../obs-app/src/app/user/user.component.ts) 中的程式碼：

- [`user.component.ts`](../../obs-app/src/app/user/user.component.ts)

```typescript
...
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
```

在這裡我們已經設置了一個訂閱，以監聽路由參數的變化。

現在，這裡使用了一個可觀察對象（Observable params），它是一個我們訂閱的可觀察對象，這是你現在可以記住的一個概念。

可觀察對象是一種用於通知數據變化的結構。

請記住，可觀察對象就是那些數據流，每當有新的數據被發射出來時，我們的訂閱就會得到通知。

在這個例子中， `params` 就是這個可觀察對象。

它是一個路由參數的數據流，每當我們轉到一個新的頁面時，當 URL 中的參數發生變化時，這個數據流就會給我們一個新的路由參數。 然後在這個函數中，我們通過訂閱獲取新的參數，然後可以從中提取我們關心的參數，例如在這種情況下，從中提取 ID 參數。

這就是這個內建的可觀察對象是如何工作的，以及你可以如何思考它。

`params` 就是那個可觀察的數據流，它提供給我們新的值。

在 Angular 中會大量使用這樣的可觀察對象，而你永遠不需要自己創建它們。

你只需要訂閱它們，不需要創建它們，但為了理解它們，知道如何創建它們肯定是有好處的。

所以作為下一步，讓我們從頭開始建立我們自己的可觀察對象，並理解它的內部結構。