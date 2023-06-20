import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ProtectedComponent } from './protected-component';
import { Observable } from 'rxjs';

export class CanDeactivateGuard implements CanDeactivate<ProtectedComponent> {

  canDeactivate(component: ProtectedComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}
