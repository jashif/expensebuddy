import { Component } from '@angular/core';
import { NavController ,Toast,Alert} from 'ionic-angular';
import { Loginservice } from '../../providers/loginservice/loginservice';//ionic-angular';
import{HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {Events,Loading} from 'ionic-angular';
/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
user: {userName?: string, password?: string,emailId?:string,confirmPassword?:string} = {};
loader:Loading;
  submitted = false;
  constructor(public navCtrl: NavController, private login:Loginservice,public events:Events) {
this.user.userName="";
this.user.emailId="";this.user.password="";
this.user.confirmPassword="";
 this.loader = Loading.create(
        {
      content: "Registering",
      //dismissOnPageChange:true
        });
  }
showAlert(title,message,show) {
    let alert = Alert.create({
      title: title,
      subTitle: message,
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          if(show){
          this.gobk();}
        }
      }]
    });

 this.navCtrl.present(alert);
    
  }

   Register(form)
  {

    this.submitted = true;
    if (form.valid) 
    {
      var trigger = this.user.emailId,
    regexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
   var test = regexp.test(trigger);
if(!test)
{
this.showAlert("Error","Please enter valid email address",false);
return;
}
if(this.user.password!=this.user.confirmPassword)
{
  this.showAlert("Error","Password not matching",false);
return;
}

      this.loader = Loading.create(
        {
      content: "Registering",
      //dismissOnPageChange:true
        });
    
   this.navCtrl.present( this.loader);
    this.login.register(this.user).then(x=>{
      console.log((x));
this.submitted=false;
       this.loader.dismiss();
       this.showAlert("Success!",'Your Account is successfully created!',true);
      // this.presentToast("Your Account is successfully created");
      
      
    },(err)=>
    {
      this.submitted=false;
      console.log(err.json());
      this.presentToast("Error Occured");
      this.loader.dismiss();});
    }
}
 gobk()
{
  console.log("here");
this.loader.dismiss();
this.navCtrl.setRoot(LoginPage);
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
