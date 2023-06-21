# 10. Retrieving Route Parameters

- [`recipe-edit.component.ts`](../../course-project-1/src/app/recipes/recipe-edit/recipe-edit.component.ts)

```diff
- import { Component } from '@angular/core';
+ import { Component, OnInit } from '@angular/core';
+ import { ActivatedRoute } from '@angular/router';

...
- export class RecipeEditComponent {
+ export class RecipeEditComponent implements OnInit {

+ id: number;
+ isEditMode = false;

+ constructor(private route: ActivatedRoute) { }

+ ngOnInit(): void {
+   this.route.params
+     .subscribe(
+       (params) => {
+         this.id = +params['id'];
+         this.isEditMode = params['id'] != null;
+       }
+     );
+ }
}
```