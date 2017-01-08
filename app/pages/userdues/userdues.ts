import { Component } from '@angular/core';
import { NavController ,Loading} from 'ionic-angular';
import {DatePipe} from '@angular/common';
import {ExpenseService} from '../../providers/expense-service'
import {GetHistoryModel,UserReport,SetleMent} from '../../models/expense-model'
/*
  Generated class for the UserduesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/userdues/userdues.html',
})
export class UserduesPage {
settlements:Array<SetleMent>;
  constructor(private nav: NavController,public expse :ExpenseService) {

  }
ionViewWillEnter()
  {
   
this.loadReport(); 
  }
  loadReport()
  {
    var roomid=window.localStorage.getItem("roomid");
    var dt=new Date(Date.now());
    var month= dt.getMonth()+1;

     let loader = Loading.create({
      content: "Loading"
    });
    this.nav.present(loader);
    this.expse.getHistory(month,roomid).then(x=>
       {
         loader.dismiss();
         if(x!=null)
         {
         this.settlements=x.settlements;
          }

       },
       (rj)=>{
loader.dismiss();
       });
  }

}
