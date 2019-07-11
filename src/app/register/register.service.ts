import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
registerurl = 'http://localhost:3001/users';
constructor(private httpclient: HttpClient) { }
  registerUser(user, options?: {}): Observable<any> {
    return this.httpclient.post(this.registerurl, user, options );
  }


}
