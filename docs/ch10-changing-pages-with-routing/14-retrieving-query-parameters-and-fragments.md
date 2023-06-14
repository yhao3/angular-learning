# 14. Retrieving Query Parameters and Fragments

## Injecting the `ActivatedRoute`

- [`edit-server.component.ts`](../../routing-app/src/app/servers/edit-server/edit-server.component.ts)

```ts
...
import { ActivatedRoute } from '@angular/router';

...
export class EditServerComponent implements OnInit {
  ...
  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }
  ...
}
```

## Retrieving Snapshot

- [`edit-server.component.ts`](../../routing-app/src/app/servers/edit-server/edit-server.component.ts)

```ts
  ...
  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    ...
  }
  ...
```

## We Can Also Subscribe to Changes

- [`edit-server.component.ts`](../../routing-app/src/app/servers/edit-server/edit-server.component.ts)

```ts
  ...
  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams
      .subscribe();
    this.route.fragment
      .subscribe();
    ...
  }
  ...
```
