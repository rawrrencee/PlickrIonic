import { Component } from '@angular/core';
import { PhotoCaptureService } from '../photo-capture.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private photoCaptureService : PhotoCaptureService) {
  }

  openCamera() {
    this.photoCaptureService.openCamera();
  }

}
