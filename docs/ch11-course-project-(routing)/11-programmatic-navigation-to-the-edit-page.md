# 11. Programmatic Navigation to the "Edit" Page

## Making the "`New Recipe`" Button Work

### 1. Adding `click` Event Binding to the "`New Recipse`" Button

- [`recipe-list.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.html)

```diff
<div class="row">
  <div class="col-xs-12">
-   <button class="btn btn-success">New Recipe</button>
+   <button class="btn btn-success" (click)="onNewRecipe()">New Recipe</button>
  </div>
</div>
...
```

### 2. Adding `onNewRecipe()` Method to the `RecipeListComponent` Class

- [`recipe-list.component.ts`](../../course-project-1/src/app/recipes/recipe-list/recipe-list.component.ts)

```diff
...
+ import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
+             private router: Router,
+             private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

+ onNewRecipe() {
+   this.router.navigate(['new'], {relativeTo: this.route});
+ }
}
```

## Making the "`Edit Recipe`" Button Work

### 1. Adding `click` Event Binding to the "`Edit Recipe`" Button

- [`recipe-detail.component.html`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.html)

```diff
...
<div class="row">
  <div class="col-xs-12">
    <div
      class="btn-group"
      appDropdown>
      ...
      <ul class="dropdown-menu">
        ...
-       <li><a style="cursor: pointer;">Edit Recipe</a></li>
+       <li><a style="cursor: pointer;" (click)="onEditRecipe()">Edit Recipe</a></li>
        ...
      </ul>
    </div>
  </div>
</div>
...
```

### 2. Adding `onEditRecipe()` Method to the `RecipeDetailComponent` Class

- [`recipe-detail.component.ts`](../../course-project-1/src/app/recipes/recipe-detail/recipe-detail.component.ts)

```diff
...
- import { ActivatedRoute, Params } from '@angular/router';
+ import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
+             private router: Router) { }
  ...
+ onEditRecipe() {
+   this.router.navigate(['edit'], {relativeTo: this.route});
+ }
}
```