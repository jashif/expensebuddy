import { Component } from '@angular/core';
import { NavController, Loading, Platform} from 'ionic-angular';
import { ExpenseService } from '../../providers/expense-service';
import {DatePipe} from '@angular/common';
import {GetHistoryModel, SetleMent, UserReport} from '../../models/expense-model'

/*
  Generated class for the HistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {
  settlements: Array<SetleMent>;
  membersspend: Array<UserReport>;
  totalexpense: number;
  monthstring: string
  perusershare: number;
  months: Array<any>;
  noexpense: boolean;
  constructor(private nav: NavController, public exp: ExpenseService) {
    this.noexpense = false;

  }
  ionViewWillEnter() {

    this.loadHistory();
    //var i=this.navCtrl.last().index;
    //this.navCtrl.remove(1,i);
  }
  loadHistory() {
    var roomid = window.localStorage.getItem("roomid");
    var dt = new Date(Date.now());
    var month = dt.getMonth();


    //this.monthstring
    let loader = Loading.create({
      content: "Loading"
    });
    this.nav.present(loader);

    this.exp.getHistory(month, roomid).then((data) => {
      loader.dismiss();
      this.totalexpense = Math.round(data.totalexpense);
      this.perusershare = Math.round(data.perusershare);
      this.settlements = data.settlements;
      this.membersspend = data.membersspend;

      if (data.settlements.length == 0)
      { this.noexpense = true; }
      else
      { this.noexpense = false; }

    }, (err) => {
      loader.dismiss();
    });
  }
}
