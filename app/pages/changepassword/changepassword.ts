import { Component } from '@angular/core';
import { NavController,Alert,Loading,NavParams,Storage,LocalStorage } from 'ionic-angular';
import{ExpenseService} from '../../providers/expense-service';
import { Storageprovider } from '../../providers/storageprovider/storageprovider';
import{LoginPage}from '../login/login'

/*
  Generated class for the ChangepasswordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/changepassword/changepassword.html',
})
export class ChangepasswordPage {

login: {oldpassword?: string, password?: string,userid?:string} = {};
userid:string;
  submitted = false;
  constructor(private nav: NavController,public exps:ExpenseService,public navparam:NavParams,public st:Storageprovider) {
    
    this.login.userid=st.getValue("userid");
  }
  changePassword(form)
  {
   
    if (form.valid) 
    {
 this.submitted = true;

 let loader = Loading.create({
      content: "Loading"
    });
  this.nav.present(  loader);
      this.exps.changePassword(this.login).then(x=>
      {  
        loader.dismiss();
         this.submitted = false;
         this.st.removekey("token");
         this.st.removekey("userid");
         this.st.removekey("roomid");
         this.showAlert("Success","Password changed Success, Please login back",false);
         
     //this.navCtrl.push(TabsPage);
      this.nav.setRoot(LoginPage);
      
      },(err)=>{
          loader.dismiss();
         this.submitted = false;
this.showAlert("Error","Failed to change your password",false);
        //this.presentToast("Login Failed!!!")
        
      });
    }
this.submitted = false;

  }
showAlert(title,message,goback) {
    let alert = Alert.create({
      title: title,
      subTitle: message,
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          if(goback)
          {
            this.nav.pop();
          }
        }
      }]
    });
    this.nav.present(alert);
  }
}
