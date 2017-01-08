import { Component } from '@angular/core';
import {DatePipe} from '@angular/common'
import { NavController } from 'ionic-angular';
import { ExpenseService } from '../../providers/expense-service';
import { FormatDatePipe} from '../../providers/pipes';
import {ExpenseModel,ExpenseModelResponse } from '../../models/expense-model'
import { Loading,Alert } from 'ionic-angular';
/*
  Generated class for the ExpensesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/expenses/expenses.html',
  pipes:[FormatDatePipe]
})
export class ExpensesPage {
expensesList:Array<ExpenseModel>=null;
datas:Array<string>=null;
  constructor(private navCtrl: NavController,private expenseser:ExpenseService) {
 this.datas=[];

  }
  ngOnInit()
  {
    this.loaddata();
  }
  loaddata()
  {
    let loader = Loading.create({
      content: "Loading"
    });
    try { this.navCtrl.present(loader); } catch (e) { }
this.expenseser.getExpenseList().then(x=>
{
  this.expensesList=x;
  loader.dismiss();
 
},(err)=>{loader.dismiss();});
  }
doRefresh(refresher)
{
  
this.expenseser.getExpenseList().then(x=>
{
  this.expensesList=x;
  refresher.complete();
});
 
}
}
