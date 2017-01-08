import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the StatusPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/status/status.html',
})
export class StatusPage {
 datas:Array<string>=null;
  constructor(private navCtrl: NavController) {
this.datas=[];
this.datas.push("test");
  }

}
