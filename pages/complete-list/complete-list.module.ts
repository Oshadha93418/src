import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteListPage } from './complete-list';

@NgModule({
  declarations: [
    CompleteListPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteListPage),
  ],
})
export class CompleteListPageModule {}
