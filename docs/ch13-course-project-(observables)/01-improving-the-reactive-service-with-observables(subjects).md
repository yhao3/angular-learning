# 01. Improving the Reactive Service with Observables (Subjects)

## Improving Shopping List

- [`app.component.ts`](../../course-project-1/src/app/app.component.ts)

```diff
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

-  loadedFeature = 'recipe';
-
-  onNavigate(feature: string) {
-    this.loadedFeature = feature;
-  }
}
```

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```diff
- <app-header (featureSelected)="onNavigate($event)"></app-header>
+ <app-header></app-header>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

- [`shopping-list.service.ts`](../../course-project-1/src/app/shopping-list/shopping-list.service.ts)

```diff
- import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
+ import { Subject } from 'rxjs';

export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

- ingredientsChanged = new EventEmitter<Ingredient[]>();
+ ingredientsChanged = new Subject<Ingredient[]>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
-   this.ingredientsChanged.emit(this.ingredients.slice());
+   this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
-   this.ingredientsChanged.emit(this.ingredients.slice());
+   this.ingredientsChanged.next(this.ingredients.slice());
  }
}
```

- [`shopping-list.component.ts`](../../course-project-1/src/app/shopping-list/shopping-list.component.ts)

```diff
- import { Component, OnInit } from '@angular/core';
+ import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
+ import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
- export class ShoppingListComponent implements OnInit {
+ export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
+ private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
-   this.shoppingListService.ingredientsChanged.subscribe(
+   this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

+ ngOnDestroy(): void {
+   this.subscription.unsubscribe();
+ }
}
```

## Updating Recipes

- [`recipe.service.ts`](../../course-project-1/src/app/recipes/recipe.service.ts)

```diff
- import { EventEmitter, Injectable } from '@angular/core';
+ import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    ...
  ];

- recipeSelected = new EventEmitter<Recipe>();
  ...
}
```

所以在這裡，我們實際上可以完全捨棄 `recipeSelected` 的使用，

但如果你像之前那樣使用它，也就是我們之前用它來選擇不同的食譜，你會將它使用為一個 `Subject`。

在我們的案例中，如我剛才提到的，我們可以簡單地捨棄它的使用，並因此，在我們的 [`recipes.component.ts`](../../course-project-1/src/app/recipes/recipes.component.ts) 中也不需要注入 `RecipeService` ：

- [`recipes.component.ts`](../../course-project-1/src/app/recipes/recipes.component.ts)

```diff
import { Component, OnInit } from '@angular/core';
- import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

- selectedRecipe: Recipe;

- constructor(private recipeService: RecipeService) {
+ constructor() {
  }

  ngOnInit() {
-   this
-     .recipeService
-     .recipeSelected
-     .subscribe(
-       (recipe: Recipe) => {
-         this.selectedRecipe = recipe;
-       }
-     );
  }
}
```

經過所有這些整理，我們現在只在一個地方使用 `Subject` ，

就是在購物清單中，而不是在食譜中，因為我們現在沒有這樣的使用案例。

有了這個，至少在我們目前所涉及的範圍內，我們的應用程式看起來很好，並且與之前一樣正常運作。