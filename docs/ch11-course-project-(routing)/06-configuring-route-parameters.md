---
tags: ['ActivatedRoute']
---

# 06. Configuring Route Parameters

## Removing the Unnecessary code

### 1. Refactoring Recipe Detail Component

- [`recipe-detail.component.ts`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.ts)

```diff
- import { Component, Input } from '@angular/core';
+ import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

- @Input()
  recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
```

### 2. Refactoring Recipe Item Component

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```diff
<a
  style="cursor: pointer;"
  class="list-group-item clearfix"
- (click)="onSelected()">
+ >
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img
      [src]="recipe.imagePath"
      alt="{{ recipe.name }}"
      class="img-responsive"
      style="max-height: 50px;">
  </span>
</a>
```

- [`recipe-item.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.ts)

```diff
import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
- import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input()
  recipe: Recipe;

- constructor(private recipeService: RecipeService) { }

- onSelected() {
-   this.recipeService.recipeSelected.emit(this.recipe);
- }
}
```

## Implementing the Recipe Detail Activated Route

- [`recipe-detail.component.ts`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.ts)

```diff
- import { Component } from '@angular/core';
+ import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
+ import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
+ id: number;

- constructor(private recipeService: RecipeService) { }
+ constructor(private recipeService: RecipeService,
+             private route: ActivatedRoute) { }

+ ngOnInit(): void {
+   this.route.params
+     .subscribe(
+       (params: Params) => {
+         // The `+` operator converts a string to a number.
+         this.id = +params['id'];
+         this.recipe = this.recipeService.getRecipe(this.id);
+       }
+     );
+ }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
```

- [`recipe.service.ts`](../../course-project-1/src/app/recipes/recipe.service.ts)

```diff
...
@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Cheeseburger.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];
  ...
+ getRecipe(index: number) {
+   return this.recipes[index];
+ }
  ...
}
```

## Testing the Route Parameters

現在當我們訪問 [`http://localhost:4200/recipes/0`](http://localhost:4200/recipes/0) 時，會顯示 `recipes` 陣列中第一筆 `Tasty Schnitzel` 食譜的詳細資料；訪問 [`http://localhost:4200/recipes/1`](http://localhost:4200/recipes/1) 時，會顯示 `recipes` 陣列中第二筆 `Big Fat Burger` 食譜的詳細資料。

下一節中，我們會實作食譜列表中「選擇食譜時顯示該食譜的詳細資料」之 link 功能。