import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPhotoDetailsPage } from './view-photo-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPhotoDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPhotoDetailsPage]
})
export class ViewPhotoDetailsPageModule {}
