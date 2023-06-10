# 03. Using a Service for Cross-Component Communication

本小節的目標是將之前點擊單筆 `RecipeItemComponent` 時，打開 `RecipeDetailComponent` 的功能改為透過 `RecipeService` 來達成。

> 之前的作法請參考：[Ch05-03. Passing Data with Event and Property Binding](../ch05-course-project-(components-and-databinding)/03-passing-data-with-event-and-property-binding.md)

## Create a `recipeSelected` Event in `RecipeService`

- [`recipe.service.ts`](../../course-project-1/src/app/recipes/recipe.service.ts)

```ts
import { EventEmitter } from '@angular/core';
...

export class RecipeService {
  ...
  recipeSelected = new EventEmitter<Recipe>();
  ...
}
```

## Update RecipeItem Component

- [`recipe-item.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.ts)

```ts
import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input()
  recipe: Recipe;

  // @Output()
  // recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
```

1. 我們不再需要 `recipeSelected` 事件發射器，因為我們已經改在 `RecipeService` 中建立了 `recipeSelected` 發射器
2. 而是注入 `RecipeService` ，並使用 `RecipeService` 的 `recipeSelected` 發射器，並傳入 `recipe` 物件發射事件

## Update RecipeList Component

在 `RecipeList` 的模板中，我們不再需要監聽 `recipeSelected` 事件了。

- [`recipe-list.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
    ...
    <!-- <app-recipe-item
      *ngFor="let recipeElement of recipes"
      [recipe]="recipeElement"
      (recipeSelected)="onRecipeSelected(recipeElement)"></app-recipe-item> -->
    <app-recipe-item
      *ngFor="let recipeElement of recipes"
      [recipe]="recipeElement"></app-recipe-item>
    ...
```

而在 `RecipeList` 的 TypeScript 檔案中，我們也不再需要 `recipeWasSelected` 事件發射器與 `onRecipeSelected()` 方法了：

- [`recipe-list.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```ts
...
export class RecipeListComponent implements OnInit {

  // @Output()
  // recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
}
```

## Update Recipes Component

在 `Recipes` 的模板中，我們不再需要監聽 `recipeWasSelected` 事件了。

- [`recipes.component.html`](../../course-project-1/src/app/recipes/recipes.component.html)

```html
    ...
<!--<app-recipe-list
      (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list> -->
    <app-recipe-list></app-recipe-list>
```

而在 `Recipes` 的 TypeScript 檔案中，我將訂閱 `RecipeService` 的 `recipeSelected` 事件，並將 `selectedRecipe` 設定為 `recipeSelected` 事件發射的 `recipe` 物件。

- [`recipes.component.ts`](../../course-project-1/src/app/recipes/recipes.component.ts)

```ts
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this
      .recipeService
      .recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
      );
  }
}
```

而在 `Recipes` 的模板中，我們依然會將選中的 `selectedRecipe` 食譜傳入 `RecipeDetail` 元件中（這裡我們沒有更動任何程式碼）：

- [`recipes.component.html`](../../course-project-1/src/app/recipes/recipes.component.html)

```html
    ...
    <app-recipe-detail
      ...
      [recipe]="selectedRecipe"></app-recipe-detail>
    ...
```

如此一來，我們就完成了透過 `RecipeService` 來達成跨元件溝通的功能。