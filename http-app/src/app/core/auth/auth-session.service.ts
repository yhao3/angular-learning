import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/login/logout.model';


@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient) {}

  logout(): Observable<Logout> {
    return this.http.post<Logout>('http://localhost:9000/api/logout', {});
  }
}
