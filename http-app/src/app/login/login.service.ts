import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Logout } from './logout.model';
import { AuthServerProvider } from '../core/auth/auth-session.service';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private location: Location,
              private authServerProvider: AuthServerProvider) { }

  login(): void {
    location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/oidc')}`;
  }

  logout(): void {
    this.authServerProvider.logout().subscribe((logout: Logout) => {
      window.location.href = logout.logoutUrl;
    });
  }

}
