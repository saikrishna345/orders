import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../Model/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  ordersurl = 'http://localhost:3000/orders-list';
  constructor(private httpclient: HttpClient) { }

orderlistview(): Observable<any> {
    return this.httpclient.get(this.ordersurl);
}

orderlistviewbyid(id: number, options?: {} ): Observable<any> {
  return this.httpclient.get(`${this.ordersurl}/${id}`, options);
}

orderPost(order, options?: {}) {
return this.httpclient.post(`${this.ordersurl}`, order, options);
}

orderUpdate(id: number, order, options?: {}) {
  return this.httpclient.put(`${this.ordersurl}/${id}`, order, options);
}

orderDelete(id: number, options?: {}) {
 return this.httpclient.delete(`${this.ordersurl}/${id}`, options );
}
}
