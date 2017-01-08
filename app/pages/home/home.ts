
import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams,Alert } from 'ionic-angular';
import { AddexpensePage } from '../addexpense/addexpense';
import { ExpensesPage } from '../expenses/expenses';
import { StatusPage } from '../status/status';
import { EpusersPage } from '../epusers/epusers';
import { AboutusPage } from '../aboutus/aboutus';
import { UserduesPage } from '../userdues/userdues';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { HistoryPage } from '../history/history';
import { LoginPage } from '../login/login';
import {Events, Tabs} from 'ionic-angular';

import { Storageprovider } from '../../providers/storageprovider/storageprovider';


interface PageObj {

  title: string;

  component: any;

  icon: string;

  index?: number;

}
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  mySelectedIndex: number = 0;
  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  appPages: PageObj[] = [

    { title: 'Roomies', component: HomePage, icon: 'person', index: 0 },

    { title: 'Activities', component: HomePage, index: 1, icon: 'logo-usd' },

    { title: 'My Dues', component: HomePage, index: 2, icon: 'cash' },

    { title: 'History', component: HomePage, index: 3, icon: 'archive' },

    { title: 'Change Password', component: HomePage, index: 4, icon: 'ios-contact' },

    { title: 'About', component: HomePage, index: 5, icon: 'information-circle' },
    { title: 'Log out', component: HomePage, index: 6, icon: 'log-out' }

  ];
  @ViewChild('tabmain') tab: Tabs;
  constructor(public navCtrl: NavController, public events: Events, public navparam: NavParams,public st:Storageprovider) {
    // set the root pages for each tab
    this.tab1Root = EpusersPage;
    this.tab2Root = ExpensesPage;
    this.tab3Root = UserduesPage;
    this.mySelectedIndex = navparam.data.tabIndex || 0;
    this.events.publish('showmenu', true);
    //    events.subscribe('changetab', (index) => {
    //   console.log('index', index);this.tabToShow=index[0];
    //   console.log(this.tabToShow);

    // });
    // this.tab4Root = AboutusPage;

  }
  ionViewWillEnter() {
    //this.tab.select(this.tabToShow);
  }
  openPage(page: PageObj) {

    switch (page.index) {
      case 0:
      case 1:
      case 2:
        //this.tabToShow=page.index;
        this.navCtrl.setRoot(page.component, { tabIndex: page.index });
        //this.tab.select(this.tabToShow);
        break;


      case 3:
        this.navCtrl.push(HistoryPage);
        break;
      default: break;

      case 4:
        this.navCtrl.push(ChangepasswordPage);
        break;
      case 5:
        this.navCtrl.push(AboutusPage);
        break;
      case 6:
      let alert = Alert.create({
      title: 'Log out',
      subTitle: "Are you sure you want to log out",
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
         this.st.removekey("token");
         this.st.removekey("userid");
         this.st.removekey("roomid");
          this.navCtrl.setRoot(LoginPage);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      }]
    });

   this.navCtrl.present( alert);
        break;

    }

  }
}
