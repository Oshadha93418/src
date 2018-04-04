import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CompleteListPage } from '../pages/complete-list/complete-list';
import { AddNewItemPage } from '../pages/add-new-item/add-new-item';
import { IntroPage } from '../pages/intro/intro';

import { HttpModule } from '@angular/http';

@NgModule({

  declarations: [
    MyApp,
    HomePage,
    CompleteListPage,
    AddNewItemPage,
    IntroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CompleteListPage,
    AddNewItemPage,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
