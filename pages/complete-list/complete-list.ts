import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http'
/**
 * Generated class for the CompleteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complete-list',
  templateUrl: 'complete-list.html',
})
export class CompleteListPage {
	com_task_list:any [] = [{
  "name" : "Nodata"
  }];
  selectItems:any []=[];
  selectItem:any;
  i:any=0;
  isSelct:boolean;
  myInput:any;
  checkStatus:boolean;
  var:any;

  constructor(public alrtCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams,private menu: MenuController,public http : Http) {
  	this.loadTaskList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteListPage');
    this.menu.enable(true, 'menu');
  }
  //load tasks from database already completed
   loadTaskList(){
  	this.http.post("http://localhost:8080/comptask/list", null ).subscribe(data => {
    this.com_task_list = JSON.parse(data['_body']);
    }, error => {
    console.log(error);
    });

  }
  //Select taskc to delete
  delSelectItem(itm){
    this.selectItem = itm;
  		if(this.selectItems.length<=0){

          this.selectItems[this.i]=this.selectItem;
          this.i++;
      }
      else if (this.selectItems.length > 0){
        for(let j=0;j<this.selectItems.length;j++){
              if(this.selectItems[j] == this.selectItem){
                  this.selectItems[j]=null;
                  this.selectItem = null;
              }

        }
          if(this.selectItem != null){
          this.selectItems[this.i]=this.selectItem;
          this.i++;
          }
          
          console.log(this.selectItems);
      }

  }
  
  //Before Deleting Ask permission
  permdelItems(){
   let count=0;
  for(let j=0;j<this.selectItems.length;j++){
              if(this.selectItems[j] != null){
                  count++;
              }
      }
  if(count >0){  
    let alert = this.alrtCtrl.create({
          title: 'WARNING!',
          subTitle:"Do You Want To Delete Task(s)?",
          buttons: [
        {
          text: 'Disagree',
          handler: () => {
            
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.delItems();
          }
        }
      ]
    });
    alert.present();
    }
    else{
        let alert = this.alrtCtrl.create({
          title: 'WARNING!',
          subTitle:"Select Tasks to Marke Complete!",
          buttons: ['Ok']
    });
    alert.present();
    }
  }

  //Delete Taskes
  delItems(){
  	for(let j=0;j<this.selectItems.length;j++){
  			this.http.post("http://localhost:8080/delete/task?listId="+this.selectItems[j], null ).subscribe(data => {
		     
         this.loadTaskList();
		    }, error => {
		    console.log(error);
		    });
          
  	}
    this.i=0;
    for(let j=0;j<this.selectItems.length;j++){
                  this.selectItems[j]=null;
        }

  }
  //search Tasks
  onInput(){
  		this.myInput;
  		this.http.post("http://localhost:8080/search/comptask?key="+this.myInput, null ).subscribe(data => {
    		this.com_task_list = JSON.parse(data['_body']);
    	}, error => {
    		console.log(error);
    	});

  }

}
