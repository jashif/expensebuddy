import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';

import {UserToken,RegisterResponse} from '../../models/usertoken/usertoken';
import {BaseResponse} from '../../models/expense-model';
import {Page, Storage, LocalStorage} from 'ionic-angular'
import { API_ROOT } from '../../config'
import {Dialogs} from 'ionic-native'
import 'rxjs/add/operator/map';
//import { Events, LocalStorage, Storage } from 'ionic-angular';


/*
  Generated class for the Loginservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Loginservice {

storage = new Storage(LocalStorage);

url:string;
token:UserToken=null;
  constructor(public http: Http) {

  // this.url="http://expensebuddy.azurewebsites.net/";

  }
  
  login(username:string,password:string)
  {
      var headers = new  Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      var data = "grant_type=password&username=" + username + "&password=" + password;
      return new Promise((resolve,reject) => {
      // We're using Angular Http provider to request the users,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the users and resolve the promise with the new data.
      this.http.post(API_ROOT+"token",data)
        .map(res => <UserToken>(res.json()))
        .subscribe(x => {
          // we've got back the raw users, now generate the core schedule users
          // and save the users for later reference
          this.token = x;
          this.storage.set("token",x.access_token);
           this.storage.set("userid",username);
          resolve(this.token);
        },(err)=>
        {
          reject(err);
          
         // Dialogs.alert(err.json() && err.json().error_msg || 'Error')
      });


    });
  }
  register(regdata)
  {
    
       return new Promise<RegisterResponse>((resolve,reject) => {
      // We're using Angular Http provider to request the users,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the users and resolve the promise with the new data.
      this.http.post(API_ROOT+"api/account/register",regdata)
        .map(res => <RegisterResponse>(res.json()))
        .subscribe(x => {
          // we've got back the raw users, now generate the core schedule users
          // and save the users for later reference
          //this.token = x;
          //this.storage.set("token",x.access_token);
          resolve(x);
        },(err)=>{reject(err);});
    });

    
  }
 

}

