import { Component } from '@angular/core';



import { NavController,Alert,Toast } from 'ionic-angular';

import { Loginservice } from '../../providers/loginservice/loginservice';//ionic-angular';



import {Dialogs} from 'ionic-native'
import { Loading } from 'ionic-angular';


import { HomePage } from '../../pages/home/home';

import { SignupPage } from '../../pages/signup/signup';

@Component({

  templateUrl: 'build/pages/login/login.html'


})

export class LoginPage {

  login: {username?: string, password?: string} = {};

  submitted = false;



  constructor(public navCtrl: NavController,private userData:Loginservice) { 
    //this.login.username="jashif@live.com"
   // this.login.password="123456"
  }

presentLoading() {
   
  }


  onLogin(form) {

    this.submitted = true;



    if (form.valid) {

      var trigger = this.login.username,
    regexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
   var test = regexp.test(trigger);
if(!test)
{
this.showAlert("Please enter valid email address");
return;
}
    let loader = Loading.create({
      content: "Loading"
    });
  this.navCtrl.present(  loader);
      this.userData.login(this.login.username,this.login.password).then(x=>
      {  
        loader.dismiss();
         this.submitted = false;

     //this.navCtrl.push(TabsPage);
      this.navCtrl.setRoot(HomePage);
      
      },(err)=>{
        
          loader.dismiss();
         this.submitted = false;

        this.presentToast("Login Failed!!!")
        
      });


    }
 this.submitted = true;



  }

presentToast(message) {
  
    let toast = Toast.create({
      message: message,
      position:'middle',
      duration: 2000,
    });
 this.navCtrl.present(toast);//   toast.present();
  }


  onSignup() {

    this.navCtrl.push(SignupPage);

  }

showAlert(message) {
    let alert = Alert.create({
      title: 'Error',
      subTitle: message,
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
}