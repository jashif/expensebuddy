import { Component } from '@angular/core';
import {NavOptions, NavController,Modal,Platform,NavParams ,ViewController,Loading} from 'ionic-angular';
import { ExpenseService } from '../../providers/expense-service';
import { Storageprovider } from '../../providers/storageprovider/storageprovider';
import {GetUserResponse ,UserResponse} from '../../models/expense-model'
import { AddmembersPage } from '../addmembers/addmembers';
import { AddexpensePage } from '../addexpense/addexpense';
import { UserexpenseviewPage } from '../userexpenseview/userexpenseview';
import * as native from 'ionic-native'

/*
  Generated class for the EpusersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/epusers/epusers.html',
})
export class EpusersPage {
  usershare:number;
  isAdmin:boolean;
  totalexpense:number;
users:Array<UserResponse>=null;
userresponse:GetUserResponse=null;
  constructor(private navCtrl: NavController,private expse:ExpenseService,public st:Storageprovider) {

this.totalexpense=0;
this.usershare=0;
  }
  ionViewWillEnter()
  {
   
this.loadUser(); 
//var i=this.navCtrl.last().index;
//this.navCtrl.remove(1,i);
  }
loadUser()
{
  
// let loader = this.loadingCtrl.create({
//       content: "Loading"
//     });
//     try{
//       loader.present();
//     }
//     catch(e){}
var op: native.SpinnerDialogIOSOptions={
   overlayOpacity:.5
};

native.SpinnerDialog.show("","Loading",null,op);
    this.expse.getUser().then(x=>{
      this.userresponse=x;
      this.usershare=0;
      this.totalexpense=0;
      this.isAdmin=x.isAdmin;
      this.st.addValue("userid",x.userid);
      this.st.addValue("roomid",x.roomid);
      console.log(x.isAdmin);

      this.users=x.members;
      x.members.forEach(element => {
       this.usershare=this.usershare+element.amountSpend;
       this.totalexpense=this.totalexpense+element.amountSpend;

       
     });
     this.usershare= Math.round( this.usershare/x.members.length);
    //  x.members.forEach(function(x){this.usershare+=x.amountSpend;});
       native.SpinnerDialog.hide();
    },
    (err)=>
    {
native.SpinnerDialog.hide();
    });

}
doRefresh(refresher)
{
   this.expse.getUser().then(x=>{
      this.userresponse=x;
      this.usershare=0;
      this.totalexpense=0;
      this.isAdmin=x.isAdmin;
      console.log(x.isAdmin);
      this.users=x.members;
     x.members.forEach(element => {
       this.usershare=this.usershare+element.amountSpend;
       this.totalexpense=this.totalexpense+element.amountSpend;
     });
     this.usershare=Math.round( this.usershare/x.members.length);
       refresher.complete();
    },
    (err)=>
    { refresher.complete();
    });

}
openModal()
{
  this.navCtrl.push(AddmembersPage, { roomid: this.userresponse.roomid });
  // profileModal.present();

  
}
gotoexpense()
{
this.navCtrl.push(AddexpensePage, { roomid: this.userresponse.roomid });
}
gotouserexpense(data:UserResponse)
{
  this.navCtrl.push(UserexpenseviewPage,{ roomid: this.userresponse.roomid ,id:data.id,name:data.name})
////let profileModal = this.modelct.create(UserexpenseviewPage, { roomid: this.userresponse.roomid ,id:data.id,name:data.name});
  // profileModal.present();
}
  
}
