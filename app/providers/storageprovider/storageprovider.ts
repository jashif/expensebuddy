import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Page, Storage, LocalStorage} from 'ionic-angular'
import 'rxjs/add/operator/map';

/*
  Generated class for the Storageprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Storageprovider {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }
  removekey(key)
  {
window.localStorage.removeItem(key)
  }
  
  getValue(key)
  {
  return window.localStorage.getItem(key)
  }
   addValue(key,value)
  {
   window.localStorage.setItem(key,value);
  }
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

