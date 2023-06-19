# 24. Using a Fake Auth Service

## Add Login and Logout Buttons

- [`home.component.html`](../../routing-app/src/app/home/home.component.html)

```html
...
<button class="btn btn-default" (click)="onLogin()">Login</button>
<button class="btn btn-default" (click)="onLogout()">Logout</button>
```

## Implementing the `onLogin()` and `onLogout()` Methods

- [`home.component.ts`](../../routing-app/src/app/home/home.component.ts)

```ts
...
import { AuthService } from '../auth.service';

...
export class HomeComponent implements OnInit {

  constructor(...,
              private authService: AuthService) { }   // (1)
  ...
  onLogin() {                                         // (2)
    this.authService.login();
    alert('You are now logged in!');
  }
  onLogout() {                                        // (3)
    this.authService.logout();
    alert('You are now logged out!');
  }
}
```

> 1. Inject the `AuthService` into the `HomeComponent`.
> 2. Implement the `onLogin()` method.
> 3. Implement the `onLogout()` method.