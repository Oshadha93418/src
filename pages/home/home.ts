import { Component } from '@angular/core';
import { NavController, MenuController, AlertController} from 'ionic-angular';
import { AddNewItemPage } from '../add-new-item/add-new-item';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	task_list:any [] = [{
  "name" : "Nodata"
  }];
  selctcheckbox:boolean;
  myInput:any;
  selectItems:any []=[];
  selectItem:any;
  i:any=0;
  isSelct:boolean;
  checkStatus:boolean;
  var:any;

  constructor(public alrtCtrl:AlertController, public navCtrl: NavController,private menu: MenuController,public http : Http) {
  	this.loadTaskList();
  }

  ionViewWillEnter(){
  		this.loadTaskList();
  		console.log("ran");
  }

  ionViewDidEnter() {
    // Use the id to enable/disable the menus
    this.menu.enable(true, 'menu');
  }

  //load un completed taskes
  loadTaskList(){
  	this.http.post("http://localhost:8080/task/list", null ).subscribe(data => {
    this.task_list = JSON.parse(data['_body']);
    }, error => {
    console.log(error);
    });

  }

//move to add new item page
  addNewItem(){
  	this.navCtrl.push(AddNewItemPage);

  }

  //Select taskc to Mark Complete
  markSelectItem(itm){
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


//ask permission berfore change state
permChangeState(){
    let count=0;
  for(let j=0;j<this.selectItems.length;j++){
              if(this.selectItems[j] != null){
                  count++;
              }
      }
  if(count >0){
        let alert = this.alrtCtrl.create({
          title: 'WARNING!',
          subTitle:"Do You Want To Change the State(s)?",
          buttons: [
        {
          text: 'Disagree',
          handler: () => {
            
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.changeState();
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

//make the tasks complete
  changeState(){
  	
  	for(let j=0;j<this.selectItems.length;j++){

  	this.http.post("http://localhost:8080/changeState/task?listId="+this.selectItems[j], null ).subscribe(data => {
    
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

  onInput(){
  		this.myInput;
  		this.http.post("http://localhost:8080/search/uncomptask?key="+this.myInput, null ).subscribe(data => {
    		this.task_list = JSON.parse(data['_body']);
    	}, error => {
    		console.log(error);
    	});

  }
}
