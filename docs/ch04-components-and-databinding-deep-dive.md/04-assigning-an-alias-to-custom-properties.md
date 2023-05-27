# 04. Assigning an Alias to Custom Properties

在上一堂課中，我們學到了一個非常重要的事情。

我們學會了如何使用 `@Input` 來綁定到我們自己的屬性，這非常重要。

現在，您甚至可以進一步進行配置。

有時候，您可能不想在元件外部使用與元件內部相同的屬性名稱。

因此，在這個元件內部，您可能會說 `element` 正是我想要使用的屬性名稱，因為這是最合理的，但在外部，也就是在 [`app.component.html`](../../cmp-databinding//src/app/app.component.html) 的 `[element]="serverElement"` 中，您可能不想要使用 `element` 這個名稱，也許您想要綁定到 `srvElement` ，以明確表示它是一個伺服器元素：

- [`app.component.html`](../../cmp-databinding//src/app/app.component.html)

```html
<app-server-element
  *ngFor="let serverElement of serverElements"
  [srvElement]="serverElement">
</app-server-element>
```

然而，這當然不會起作用，因為現在您試圖綁定到一個屬性，Angular 不知道它是否可綁定，因為在這個元件中並沒有帶有 `@Input` 的 `srvElement` 屬性。

您必須通過 `@Input` 傳遞一個參數指定一個別名，該參數就是您希望在這個元件外部使用的屬性名稱：

- [`server-element.component.ts`](../../cmp-databinding//src/app/server-element/server-element.component.ts)

```ts
...
export class ServerElementComponent implements OnInit {

  @Input('srvElement')
  element: { type: string, name: string, content: string };
  ...
}
```

因此，在這裡可以添加 `srvElement` ，現在從外部，也就是從實現這個元件的元件中，如果您想要綁定到這個屬性，則必須指定 `srvElement` 。

需要注意的是，現在在外部 `element` 不再起作用了，從今以後必須使用 `srvElement` 。