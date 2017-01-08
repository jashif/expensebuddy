import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Page, Storage, LocalStorage,Events} from 'ionic-angular'
import { HomePage } from '../../pages/home/home';
import { ExpensesPage } from '../../pages/expenses/expenses';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the WelcomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/welcome/welcome.html',
})
export class WelcomePage {
   slides: any;
storage = new Storage(LocalStorage);
  constructor(private navCtrl: NavController,public events:Events) {
this.slides = [

      {

        title: 'Welcome to <b>Expense Tracker</b>',

        description: 'The <b>Expense Tracker App</b> is a app to manage your room expenses with your friends.The application will allow users to add their room expenses which includes grocery, utilities etc.',

        image: 'images/logo.png',

      },

      {

        title: 'What will Expense Tracker do?',

        description: 'The <b>Expense Tracker</b> will calculate the room expenses and gives a detail report of each members contribution and also provides a easy to way settle your dues with friends',

        image: 'images/logo.png',

      }

    ];
  }

  Enter()
  {
  const token = window.localStorage.getItem('token');
    if(token)
  {
  this.navCtrl.setRoot(HomePage,{tabIndex: 0});
  this.events.publish('user:login');
}
else
{
  this.navCtrl.setRoot(LoginPage);
}
  }

}
