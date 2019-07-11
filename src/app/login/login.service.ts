import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
loginurl = 'http://localhost:3001/login';
  constructor(private httpclient: HttpClient) { }
  loginUser(user, options?: {}): Observable<any> {
  return this.httpclient.post(this.loginurl, user, options);
  }
}
