# 06. Assigning an Alias to Custom Events

在上一小節中，您學到了如何使用 `@Output` ，讓我們的元件能夠監聽自己創建的自定義事件，並使用 `EventEmitter` 類別進行事件的觸發。

現在，就像在 `@Input` 上一樣，您也可以為 `@Output` 指定別名。

比如在 [`app.component.html`](../../cmp-databinding/src/app/app.component.html) 中，也許您想將 `blueprintCreated` 事件改為 `bpCreated` ：

- [`app.component.html`](../../cmp-databinding/src/app/app.component.html)

```html
<div class="container">
  <app-cockpit
    ...
    (bpCreated)="onBlueprintAdded($event)"
  ...
</div>
```

所以在 [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts) 中，我們必須在 `@Output` 中指定 `bpCreated` ：

- [`cockpit.component.ts`](../../cmp-databinding/src/app/cockpit/cockpit.component.ts)

```ts
export class CockpitComponent implements OnInit {
  ...
  @Output('bpCreated')
  blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  ...
}
```

記住，這樣一來原本的名稱 `blueprintCreated` 將不再對外公開，現在在外界一律要改用 `bpCreated` 來存取該事件。

其他部分保持不變，像以前一樣正常運作。