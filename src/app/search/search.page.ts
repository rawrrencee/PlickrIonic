import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private photoService: PhotoService) { }

  ngOnInit() {
    this.items = this.shoppingCartService.getProducts();
    this.shoppingCart = this.shoppingCartService.getCart();
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

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  updatePhotos() {
    this.photoService.retrievePublicPhotos().subscribe(
      response => {
        this.photos = response.photos;
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
