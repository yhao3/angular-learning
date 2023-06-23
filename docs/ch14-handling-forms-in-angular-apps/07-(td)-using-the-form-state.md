# 07. (TD) Using the Form State

## Disable the Submit Button Until the Form is Valid

- [`app.component.html`](../../forms-td-app/src/app/app.component.html)

```diff
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        ...
        <button
          class="btn btn-primary"
          type="submit"
+         [disabled]="!f.valid"
        >Submit</button>
      </form>
    </div>
  </div>
</div>
```

## Styling Invalid Form Controls

- [`app.component.css`](../../forms-td-app/src/app/app.component.css)

```diff
...
+ input.ng-invalid.ng-touched {
+   border: 1px solid red;
+ }
```