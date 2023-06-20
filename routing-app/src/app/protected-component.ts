import { Observable } from 'rxjs';

export interface ProtectedComponent {
  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}
