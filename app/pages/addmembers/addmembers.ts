import { Component } from '@angular/core';
import { NavController,Alert,Modal,Platform,NavParams,Loading,ViewController ,Toast} from 'ionic-angular';
import { ExpenseService } from '../../providers/expense-service';
import { ResourceService } from '../../providers/resource-service';
/*
  Generated class for the AddmembersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/addmembers/addmembers.html',
  providers:[ExpenseService,ResourceService]
})
export class AddmembersPage {
member: {userName?: string,emailId?:string} = {};

 submitted = false;
  constructor(public platform: Platform,

      public navparams: NavParams,

      public viewCtrl: ViewController,public exp:ExpenseService,public nav:NavController)
      {
      //// this.member.userName="john";
      // this.member.emailId="jashif@gmail.com";
 //console.log('roomid', navparams.get('roomid'));

      }
      
      dismiss()
       {

    this.viewCtrl.dismiss();

      }
showAlert(title,message) {
    let alert = Alert.create({
      title: title,
      subTitle: message,
      buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    this.nav.present(alert);
  }
      addmember(form)
  {

    this.submitted = true;
    if (form.valid) 
    {

       var trigger = this.member.emailId,
    regexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
   var test = regexp.test(trigger);
if(!test)
{
this.showAlert("Error","Please enter valid email address");
return;
}
      let loader = Loading.create({
      content: "Adding member to room"
    });
    this.nav.present(loader);
    var users=Array<any>();
    users.push(this.member);
     var data = {
            Users: users,
            RoomId: this.navparams.get('roomid')
        }
    this.exp.addMember(data).then(x=>{
      console.log(JSON.stringify(x));
      this.submitted=false;
     this.dismiss();
     // this. events.publish('changetab', 1);
this.member.userName="";
this.member.emailId="";
       loader.dismiss();
       this.presentToast("Successfully Added, An Email Has been sent to your friend for using the application");
    },(err)=>
    {
      this.submitted=false;
      console.log(err.json());
      this.member.userName="";
this.member.emailId="";
      loader.dismiss();
    });
    }
      
    
}
presentToast(message) {
 
    let toast =Toast.create({
      message: message,
      position:'middle',
      duration: 3000
    });
    this.nav.present(toast);
  }

}
