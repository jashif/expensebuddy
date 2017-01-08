import { Component } from '@angular/core';
import { NavController,Platform,NavParams,Loading,Modal ,ViewController } from 'ionic-angular';
import { ExpenseService } from '../../providers/expense-service';
import { ResourceService } from '../../providers/resource-service';
import {ExpenseModel,ExpenseModelResponse } from '../../models/expense-model'
import {FormatDatePipe} from '../../providers/pipes';
/*
  Generated class for the UserexpenseviewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/userexpenseview/userexpenseview.html',
  providers:[ExpenseService,ResourceService],
  pipes:[FormatDatePipe]
})
export class UserexpenseviewPage {
totalAmount:number;
user:string;
id:string;
roomid:string;
expensesList:Array<ExpenseModel>=null;
  constructor(public platform: Platform,

      public navparams: NavParams,

      public nav: NavController,public exp:ExpenseService) 
      {
this.roomid=navparams.get('roomid');
this.user=navparams.get('name');
this.id=navparams.get('id');
console.log('roomid', navparams.get('roomid'));
console.log('id', navparams.get('id'));

this.loaddata();
      } 
dismiss()
       {
this.nav.pop();
    //this.viewCtrl.dismiss();

      }
      loaddata()
  {
    let loader = Loading.create({
      content: "Loading"
    });
    this.nav.present(loader).then(()=>
    {
      this.exp.getExpenseListbyid(this.id,this.roomid).then(x=>
{
  this.expensesList=x.expenses;
  this.totalAmount=x.totalAmount;
  loader.dismiss();
 
});
    });

  }  

}
