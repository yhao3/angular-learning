import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EditServerComponent } from './edit-server.component';
import { Observable } from 'rxjs';

export class CanEditServerComponentDeactivateGuard implements CanDeactivate<EditServerComponent> {

  canDeactivate(component: EditServerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!component.allowEdit) {
      return true;
    }
    if ((component.serverName !== component.server.name || component.serverStatus !== component.server.status) || !component.changeSaved) {
      return confirm('Do you want to discard the changes?');
    }
  }
}
