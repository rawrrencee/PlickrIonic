import { Injectable } from '@angular/core';
import { Photo } from './photo';
import { PhotoService } from './photo.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl: string = "/api/SaleTransaction";

  private shoppingCart: Photo[] = [];

  constructor(private photoService: PhotoService) { }

  getCart() {
    return this.shoppingCart;
  }

  addPhoto(photo) {
    this.shoppingCart.push(photo);
  }

  deleteFromCart(i) {
    console.log(i);
    if (i === 0) {
      this.shoppingCart.shift();
    } else {
      this.shoppingCart.splice(i, 1);
    }
  }

  incrementByOne(i) {
    this.shoppingCart.push(i);
  }

  decreaseByOne(i) {
    if (i === 0) {
      this.shoppingCart.shift();
    } else {
      this.shoppingCart.slice(i, 1);
    }
  }
}
