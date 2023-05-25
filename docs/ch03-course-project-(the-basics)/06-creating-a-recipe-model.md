# 06. Creating a Recipe Model

現在我想處理我的食譜。

我想要將食譜清單填滿一些內容。

首先我們在 [`recipe-list-component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts) 中添加一個空陣列：

- [`recipe-list-component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```ts
...
export class RecipeListComponent {
  recipes = [];
}
```

而在這裡，我想要定義一個食譜的外觀。

在整個應用程式中，我們將大量使用食譜

因此我們應該明確定義一個食譜的外觀，以確保無論在哪個元件中使用時我們都在討論相同的結構，相同類型的物件。

為此，我將建立一個模型（Model）。

## What is a Model

那麼什麼是模型呢？

一個模型只是一個 TypeScript 檔案。

所以在 `recipes` 資料夾中，因為它將是 `recipes` 模型，我將新增另一個檔案。 它叫做 [`recipe.model.ts`](../../course-project-1/src/app/recipes/recipe.model.ts)。

> **Note**: 
> `.model` 是可選的，但你應該對檔案內容註解。 這樣，就很清楚這個檔案將包含什麼。

那這個檔案應該是什麼樣子呢？

首先，我將 export 一個 TypeScript 類別，一個簡單命名為 `Recipe` 的 TypeScript 類別：

- [`recipe.model.ts`](../../course-project-1/src/app/recipes/recipe.model.ts)

```ts
export class Recipe {
}
```

現在你可能會想，我們是否要添加類似這樣的東西，在這裡添加 `@Model` ，但我們不會這麼做，沒有這樣的註解。

而且我們不需要這樣做，因為我們可以在 TypeScript 中使用原生語法。

模型最終只是對我們所創建的物件的藍圖。

而 TypeScript 類別正好能夠做到這一點。

類別可以被實例化，因此我們可以基於這個類別提供的設定創建新的物件。

所以我們可以在這個類別中定義一個食譜的外觀，讓我們這樣做！

- [`recipe.model.ts`](../../course-project-1/src/app/recipes/recipe.model.ts)

```ts
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string){
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}
```
這就是我們的食譜模型，讓我們在下一堂課中使用它。