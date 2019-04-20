import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPhotoDetailsPage } from './edit-photo-details.page';

const routes: Routes = [
  {
    path: '',
    component: EditPhotoDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPhotoDetailsPage]
})
export class EditPhotoDetailsPageModule {}
