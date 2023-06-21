# 08. Styling Active Recipe Item

- [`recipe-item.component.html`](../../course-project-1/src/app/recipes/recipe-list/recipe-item/recipe-item.component.html)

```diff
<a
  style="cursor: pointer;"
  [routerLink]="[index]"
+ routerLinkActive="active"
  class="list-group-item clearfix"
  >
  ...
```