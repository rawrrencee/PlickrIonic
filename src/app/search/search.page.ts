import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shoppingcart.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit {

  shoppingCart = [];
  items = [];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private router: Router, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.items = this.shoppingCartService.getProducts();
    this.shoppingCart = this.shoppingCartService.getCart();
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

}
