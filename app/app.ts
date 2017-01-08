import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Events, Platform, Nav} from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {Page, Storage, LocalStorage, MenuController} from 'ionic-angular'
import { HomePage } from './pages/home/home';

import { WelcomePage } from './pages/welcome/welcome';
import { LoginPage } from './pages/login/login';
import { Loginservice } from './providers/loginservice/loginservice';//ionic-angular';
import {ResourceService} from './providers/resource-service';
import {ExpenseService} from './providers/expense-service';
import { Storageprovider } from './providers/storageprovider/storageprovider';
import { AddexpensePage } from './pages/addexpense/addexpense';
import { ExpensesPage } from './pages/expenses/expenses';
import { StatusPage } from './pages/status/status';
import { EpusersPage } from './pages/epusers/epusers';
import { AboutusPage } from './pages/aboutus/aboutus';
import { UserduesPage } from './pages/userdues/userdues';
import { ChangepasswordPage } from './pages/changepassword/changepassword';
import { HistoryPage } from './pages/history/history';

@Component({
  templateUrl: 'build/app.html',
  providers: [Loginservice, ExpenseService, ResourceService, Storageprovider]

})
export class MyApp {
  rootPage: any = null;
  @ViewChild(Nav) nav: Nav;
  isLogged: boolean;
 
  constructor(public platform: Platform, private menu: MenuController, public events: Events) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.rootPage = WelcomePage;
    });
    this.isLogged = false;
    this.events.subscribe('showmenu', () => {
      this.isLogged = true;
    });
    //this.menu.enable(true,'loggedInMenu');
  }
  
}

ionicBootstrap(MyApp, [Loginservice, ExpenseService, ResourceService, Storageprovider], {

  prodMode: true,

  platforms: {

    android: {

      tabsPlacement: 'top',

      tabsHideOnSubPages: true,

      tabsHighlight: true

    }

  }

});
