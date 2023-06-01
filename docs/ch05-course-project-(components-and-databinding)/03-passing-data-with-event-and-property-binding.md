# 03. Passing Data with Event and Property Binding

本小節的目標是讓 `recipe-item` 被點擊後，能夠顯示 `recipe-detail` 的內容。

但如果你還記得元件之間的關係，你會發現 `recipe-item` 和 `recipe-detail` 之間其實有點複雜：

- [Structure of the application](../ch03-course-project-(the-basics)/03-creating-the-components.md)

```
app
├── header
├── recipes
│   ├── recipe-detail
│   └── recipe-list
│       └── recipe-item
└── shopping-list
    └── shopping-edit
```

也就是說 `recipe-item` 與 `recipe-detail` 若要通信的話，就必須透過經過以下流程：

```
                        recipes ⤵
            recipe-list ⤴       recipe-detail
recipe-item ⤴
```

在這裡我們會先使用 Event Binding 與 Property Binding 來實作這個功能，但之後我們會使用更優雅的方式來重構這個功能。

至於使用 Event Binding 與 Property Binding 實作的關鍵在於：

- 往上的箭頭（⤴）：使用到 Event Binding
- 往下的箭頭（⤵）：使用到 Property Binding。

所以我們可以分析出以下實作流程：

1. `recipe-item` -> `recipe-list`：使用 Event Binding
2. `recipe-list` -> `recipes`：使用 Event Binding
3. `recipes` -> `recipe-detail`：使用 Property Binding

## 1. In `recipe-item` Component

### 1.1 Listening to Click Events in the `recipe-item` template

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```html
<a
  href="#"
  class="list-group-item clearfix"
  (click)="onSelected()">
  ...
</a>
```

### 1.2 Implementing the `onSelected()` Method and Emitting the `recipeSelected` Event to the `recipe-list` Component

- [`recipe-item.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.ts)

```ts
import { ..., EventEmitter, ..., Output } from '@angular/core';
...
export class RecipeItemComponent {
  ...
  @Output()
  recipeSelected = new EventEmitter<void>();

  onSelected() {
    this.recipeSelected.emit();
  }
}
```

## 2. In `recipe-list` Component

### 2.1 Listening to the `recipeSelected` Event

- [`recipe-list.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```html
    ...
    <app-recipe-item
      *ngFor="let recipeElement of recipes"
      [recipe]="recipeElement"
      (recipeSelected)="onRecipeSelected(recipeElement)"></app-recipe-item>
    ...
```

### 2.2 Implementing the `onRecipeSelected()` Method and Emitting the `recipeWasSelected` Event to the `recipes` Component

- [`recipe-list.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```ts
import { ..., EventEmitter, Output } from '@angular/core';
...
export class RecipeListComponent {

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();
  ...
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
```

### 2.3 Updating the `recipes` Property with Dummy Data

- [`recipe-list.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```ts
...
export class RecipeListComponent {
  ...
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];
  ...
}
```

## 3. In `recipes` Component

### 3.1 Maintaining the `selectedRecipe` Property in the `recipes` Component

- [`recipes.component.ts`](../../course-project-1/src/app/recipes/recipes.component.ts)

```ts
...
import { ..., Recipe } from './recipe.model';
...
export class RecipesComponent {

  selectedRecipe: Recipe;
}
```

### 3.2 Listening to the `recipeWasSelected` Event and Assigning the `selectedRecipe` Property as the Event's data (`$event`)

- [`recipes.component.html`](../../course-project-1/src/app/recipes/recipes.component.html)

```html
<div class="row">
  <div class="col-md-5">
    <app-recipe-list
      (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail></app-recipe-detail>
  </div>
</div>
```

### 3.3 Passing the `selectedRecipe` Property to the `recipe-detail` Component

- [`recipes.component.html`](../../course-project-1/src/app/recipes/recipes.component.html)

```html
<div class="row">
  <div class="col-md-5">
    <app-recipe-list
      (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail
      *ngIf="selectedRecipe; else infoText"
      [recipe]="selectedRecipe"></app-recipe-detail>
    <ng-template #infoText>
      <p>Please select a Recipe!</p>
    </ng-template>
  </div>
</div>
```

## 4. In `recipe-detail` Component

### 4.1 Using `@Input()` to Receive Recipe Data from the `recipes` Component

- [`recipe-detail.component.ts`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.ts)

```ts
import { ..., Input } from '@angular/core';
import { Recipe } from '../recipe.model';

...
export class RecipeDetailComponent {

  @Input()
  recipe: Recipe;

}
```

### 4.2 Displaying the `recipe` Property in the `recipe-detail` template

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```html
<div class="row">
  <div class="col-xs-12">
      <img
        [src]="recipe.imagePath"
        alt="{{ recipe.name }}"
        class="img-responsive"
        style="max-height: 250px;">
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h1>{{ recipe.name }}</h1>
  </div>
</div>
...
<div class="row">
  <div class="col-xs-12">
    {{ recipe.description }}
  </div>
</div>
...
```