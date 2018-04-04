import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CompleteListPage } from '../pages/complete-list/complete-list';
import { AddNewItemPage } from '../pages/add-new-item/add-new-item';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;

  rootPage:any = IntroPage;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen, public menu: MenuController) {

  this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Add New Item', component: AddNewItemPage },
      { title: 'Completed List', component: CompleteListPage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

