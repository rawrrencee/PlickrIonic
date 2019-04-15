import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private data = [
    {
      category: 'Featured Photos',
      expanded: true,
      products: [
        { id: 0, name: 'Daisuji Keisuke', price: '8' },
        { id: 1, name: 'Momo Dango', price: '5' },
        { id: 2, name: 'Daijobu', price: '9' },
        { id: 3, name: 'Kuro', price: '7' }
      ]
    },
    {
      category: 'Up and Coming',
      products: [
        { id: 4, name: 'Best Photo of the Year', price: '8' },
        { id: 5, name: 'Child Stock Photo', price: '6' }
      ]
    },
    {
      category: 'Discounted',
      products: [
        { id: 6, name: 'Mornings', price: '8' },
        { id: 7, name: 'Rolling Stones', price: '5' },
        { id: 8, name: 'Dijin Bonita', price: '9' }
      ]
    }
  ];

  private shoppingCart = [];

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.shoppingCart;
  }

  addProduct(product) {
    this.shoppingCart.push(product);
  }
}
