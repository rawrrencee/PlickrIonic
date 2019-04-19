import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonInfiniteScroll } from '@ionic/angular';

import { ShoppingCartService } from '../shoppingcart.service';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: [
    'search.page.scss',
    'search.responsive.scss']
})
export class SearchPage implements OnInit {

  shoppingCart = [];
  items = [];
  photos: Photo[];
  photosLoaded: Photo[];
  currentIndexLoaded: number = 0;
  lastIndexLoaded: number = 0;
  count: number = 0;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private router: Router, private location: Location, private shoppingCartService: ShoppingCartService, private photoService: PhotoService) { }

  ngOnInit() {
    this.items = this.shoppingCartService.getProducts();
    this.shoppingCart = this.shoppingCartService.getCart();
    this.photos = [];
    this.photosLoaded = [];
    this.updatePhotos();
  }

  addToCart(product) {
    this.shoppingCartService.addProduct(product);
  }

  openShoppingCart() {
    this.router.navigate(['shoppingcart']);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    window.location.reload();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2500);
  }

  loadData(event) {
    setTimeout(() => {
      if (this.photosLoaded.length == this.photos.length) {
        console.log('Disabled');
        event.target.disabled = true;
      }
      for (let i = this.lastIndexLoaded; i < this.photos.length; i++) {
        if (this.count == 9) {
          this.lastIndexLoaded = i;
          console.log('last index loaded=' + this.lastIndexLoaded);
          this.count = 0;
          break;
        }
        if (i + this.count >= this.photos.length) {
          while (i < this.photos.length) {
            this.photosLoaded[i] = this.photos[i];
            i++;
          }
          this.lastIndexLoaded = i;
          console.log('last index loaded:' + this.lastIndexLoaded);
          this.count = 0;
          break;
        }
        this.photosLoaded[i] = this.photos[i];
        this.count++;
      }
      console.log('Done');
      event.target.complete();
    }, 500);
  }

  updatePhotos() {
    this.photoService.retrievePublicPhotos().subscribe(
      response => {
        this.photos = response.photos;
        for (let photo of this.photos) {
          if (this.lastIndexLoaded == 9) {
            this.currentIndexLoaded = 9;
            break;
          }
          this.photosLoaded[this.lastIndexLoaded] = this.photos[this.lastIndexLoaded];
          this.lastIndexLoaded++;
        }
      },
      error => {
        console.log('Search Page> View All Photos (search.page.ts): ' + error);
      }
    );
  }

  viewPhotoDetails(event, photo) {
    this.router.navigate(["/photo/viewPhotoDetails/" + photo.photoId]);
  }

}
