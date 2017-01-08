import {Injectable, Inject} from '@angular/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import {Page, Storage, LocalStorage} from 'ionic-angular'
import {Subject, BehaviorSubject, Observable} from 'rxjs'

import { API_ROOT } from '../config'


@Injectable()
export class ResourceService {
  headers:Headers = new Headers()

  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json')
    //this.headers.append('jackblog', 'ionic2')
  }
  interceptor():RequestOptions{
    const opts:RequestOptions = new RequestOptions()
    opts.headers = this.headers
    const token = window.localStorage.getItem('token')
    if (token && !opts.headers.get('Authorization')) {
      opts.headers.append('Authorization',
        'Bearer ' + token.replace(/(^\")|(\"$)/g, ''))
    }
    return opts
  }
  getExpensesList(): Observable<any> {

   return this.http.get(API_ROOT + 'api/expenses', this.interceptor())
  }
  getReport(): Observable<any> {

   return this.http.get(API_ROOT + 'api/expenses/report', this.interceptor())
  }
  getExpensesListById(id,roomid): Observable<any> {

   return this.http.get(API_ROOT + 'api/expenses?id='+id+"&roomid="+roomid, this.interceptor())
  }
   getUser(): Observable<any> {

   return this.http.get(API_ROOT + 'api/account/user', this.interceptor())
  }
  
  addExpense(data: Object): Observable<any> {
    return this.http.post(API_ROOT + 'api/expenses', JSON.stringify(data), this.interceptor())
  }
   addmember(data)
  {
    return this.http.post(API_ROOT + 'api/account/addmember', JSON.stringify(data), this.interceptor())
   
  }
   changepassword(data)
  {
    return this.http.post(API_ROOT + 'api/account/changepassword', JSON.stringify(data), this.interceptor())
   
  }

   getCategories(): Observable<any> {

   return this.http.get(API_ROOT + 'api/expenses/categories', this.interceptor())
  }
  getHistory(month,roomid): Observable<any> {

   return this.http.get(API_ROOT + 'api/reports?month='+month+"&roomid="+roomid, this.interceptor())
  }
}