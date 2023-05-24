# 03. Creating the Components

## Structure of the application

接下來我們將根據這個結構來建立我們的 components。

- Structure of the application

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

## Create the `header` component

### Create the `header` folder

```shell
mkdir src/app/header
```

### Create the `header` component manually

```shell
vi src/app/header/header.component.ts
```

- [`header.component.ts`](../../course-project-1/src/app/header/header.component.ts)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
```

### Create the `header` component template

```shell
vi src/app/header/header.component.html
```

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```html
<h1>The Header</h1>
```

### Register the `header` component in the `app` module

- [`app.module.ts`](../../course-project-1/src/app/app.module.ts)

```ts
...
import { HeaderComponent } from './header/header.component'; // <-- Add this line

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent // <-- Add this line
  ],
  ...
})
export class AppModule { }
```

### Use the `header` component in the `app` component

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```html
<app-header></app-header>
...
```

## Create the `recipes` component with CLI

```shell
ng generate component recipes --skip-tests
```

或者可以使用縮寫：

```shell
ng g c recipes --skip-tests
```

> **Note**: 
> `--skip-tests` 可以省略自動產生的測試檔案。

```
CREATE src/app/recipes/recipes.component.css (0 bytes)
CREATE src/app/recipes/recipes.component.html (22 bytes)
CREATE src/app/recipes/recipes.component.ts (206 bytes)
UPDATE src/app/app.module.ts (482 bytes)
```

## Create the `recipe-detail` sub-component with CLI

```shell
ng g c recipes/recipe-detail --skip-tests
```

因為 `recipe-detail` 是 `recipes` 的 sub-component，所以可以發現使用了 `recipes/recipe-detail` 這樣的路徑。 這代表了這個 component 是屬於 `recipes` 這個 component 的 sub-component。

## Create the `recipe-list` sub-component with CLI

```shell
ng g c recipes/recipe-list --skip-tests
```

## Create the `recipe-item` sub-component with CLI

```shell
ng g c recipes/recipe-list/recipe-item --skip-tests
```

`recipe-item` 是 `recipe-list` 的 sub-component，所以可以發現使用了 `recipes/recipe-list/recipe-item` 這樣的路徑。

## Create the `shopping-list` component with CLI

```shell
ng g c shopping-list --skip-tests
```

## Create the `shopping-edit` sub-component with CLI

```shell
ng g c shopping-list/shopping-edit --skip-tests
```