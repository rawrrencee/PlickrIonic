import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PhotoCaptureService } from '../photo-capture.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private photoCaptureService : PhotoCaptureService,
    private router: Router) {
  }

  uploadPhoto() {
    this.router.navigate(['photo/uploadphoto']);
  }

}
