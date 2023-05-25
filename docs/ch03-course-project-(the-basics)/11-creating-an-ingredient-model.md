# 11. Creating an Ingredient Model

我們在應用程式中會大量使用食材，所以擁有一個模型是合理的。

那麼，我們應該將這個食材模型存放在哪裡呢？

我們將食譜模型存放在 "`recipes`" 資料夾中，因為它屬於那裡的功能。

但是食材模型應該存放在哪裡呢？

我相信它應該存放在一個新的資料夾中。

在 "`app`" 資料夾中，我將創建一個 "`shared`" 資料夾。

它將包含我們應用程式中跨不同功能共享的功能或元素。

就像這個食材，我們將在購物清單和食譜部分都會使用到。

- Create a new folder named "`shared`" in the "`app`" folder

```shell
take src/app/shared
```

所以在這裡我將建立一個新的檔案，並將這個檔案命名為 "`ingredient.model.ts`"：

- [`ingredient.model.ts`](../../course-project-1/src/app/shared/ingredient.model.ts)

```ts
export class Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
```

現在我們就可以在這個 `shopping-list` component 中使用這個 `Ingredient` 模型。