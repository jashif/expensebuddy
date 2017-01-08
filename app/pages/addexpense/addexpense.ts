import { Component } from '@angular/core';
import { NavController,Alert } from 'ionic-angular';
import { ExpenseService } from '../../providers/expense-service';//ionic-angular';
import { ExpensesPage } from '../expenses/expenses';
import {ExpenseCategory} from '../../models/expense-model'
import {Events,Loading,Toast} from 'ionic-angular';
/*
  Generated class for the AddexpensePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/addexpense/addexpense.html',
})
export class AddexpensePage {

categories:Array<ExpenseCategory>;
expensemodel: {name?: string, amount?: number,description?:string} = {};
 submitted = false;
  constructor(private navCtrl: NavController,private expse:ExpenseService,public events:Events) {

this.loadCategories();
////this.expensemodel.amount=100;
//this.expensemodel.description="25 Eggs from Relaince";
  }

  loadCategories()
  {

    this.expse.getCategories().then((x)=>{
      this.categories=x;
       this.expensemodel.name=x[0].name;
    },(rej)=>{

    });
  }
 addexpense(form)
  {

    this.submitted = true;
    if (form.valid) 
    {
       let loader = Loading.create({
      content: "Loading"
    });
   this.navCtrl.present(loader);
    this.expse.addExpense(this.expensemodel).then(x=>{
      
       this.submitted=false;
       this.expensemodel.amount=0;
       this.expensemodel.description="";
      this.expensemodel.name=this.categories[0].name;

        loader.dismiss();
        loader.destroy();
       this.showAlert();
       //this.events.publish()
      //this. events.publish('changetab', 1);
      
    },(err)=>{
      this.submitted=false;
      this.presentToast("An Error Occured while adding the data");
      this.expensemodel.amount=0;
       this.expensemodel.description="";
       this.expensemodel.name="Grocery";
       loader.dismiss();});
    }
    else  
     {
       this.submitted=false;
     }
}
showAlert() {
    let alert = Alert.create({
      title: 'Success!',
      subTitle: 'Your Expense Added!',
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
        }
      }]
    });

   this.navCtrl.present( alert);
    
  }
presentToast(message) {
 
    let toast =Toast.create({
      message: message,
      position:'middle',
      duration: 3000
    });
    this.navCtrl.present( toast);
  }
}
