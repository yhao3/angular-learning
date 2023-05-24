# 02. Setting Up the Application

## Create a new project

```shell
ng new course-project-1 --no-strict
```

> **Note**: 
> 請確保在 `ng new` 命令中也加上 `--no-strict` 以正確建立該應用程式，否則稍後可能會遇到問題（當然，我們將在課程中深入研究「Strict Mode」，不用擔心）！

## Clean up the app component

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```html
Hello World!
```

- [`app.component.ts`](../../course-project-1/src/app/app.component.ts)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

## Install Bootstrap 3 locally in the project

```shell
npm install --save bootstrap@3
```

## Add Bootstrap to the project

- [`angular.json`](../../course-project-1/angular.json)

```json
  ...
  "projects": {
    "course-project-1": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            "styles": [
              ...
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
        },
      }
    }
  }
}
```

## Test Bootstrap

- [`app.component.html`](../../course-project-1/src/app/app.component.html)

```html
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h2>Hello World!</h2>
    </div>
  </div>
</div>
```

## Start the application

```shell
ng serve
```