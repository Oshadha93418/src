import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AddNewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-item',
  templateUrl: 'add-new-item.html',
})
export class AddNewItemPage {
	task:any;
	status:any;
	tsk:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http) {
  	
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad AddNewItemPage');
  }

  insertTask(){

  	
  	this.http.post("http://localhost:8080/task/add?task="+this.task, null).subscribe(data => {
  	this.status = JSON.parse(data['_body']);
  	let alert = this.alertCtrl.create({
      title: 'Succesfull!',
      subTitle:this.status['msg'],
      buttons: ['OK']
    });
    alert.present();
  	}, error => {
  	let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle:error,
      buttons: ['OK']
    });
    alert.present();});
  }

  

}
