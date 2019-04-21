import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ShoppingCartService } from '../shoppingcart.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {

  selectedItems = [];

  resultSuccess: boolean;
  resultError: boolean;
  message: string;

  total = 0;

  constructor(private shoppingCartService: ShoppingCartService, public sessionService: SessionService, ) { }

  ngOnInit() {
    let items = this.shoppingCartService.getCart();
    let selected = {};
    for (let item of items) {
      if (selected[item.photoId]) {
        selected[item.photoId].count++;
      } else {
        selected[item.photoId] = { ...item, count: 1 };
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }

  onDeleteItem(i) {
    const index = this.selectedItems.indexOf(i);
    if (index > -1) {
      this.shoppingCartService.deleteFromCart(index);
      this.selectedItems.splice(index, 1);
      console.log(this.selectedItems);
    }
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }

  onIncreaseQty(i) {
    const index = this.selectedItems.indexOf(i);
    this.selectedItems[index].count++;
    this.shoppingCartService.incrementByOne(i);
    this.selectedItems = Object.keys(this.selectedItems).map(key => this.selectedItems[key]);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }

  onDecreaseQty(i) {
    const index = this.selectedItems.indexOf(i);
    this.selectedItems[index].count--;
    this.shoppingCartService.decreaseByOne(index);
    if (this.selectedItems[index].count === 0) {
      this.onDeleteItem(i);
    }
    this.selectedItems = Object.keys(this.selectedItems).map(key => this.selectedItems[key]);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }

  createSaleTransaction(selectedItems) {
    this.shoppingCartService.createSaleTransaction(selectedItems, this.sessionService.getCurrentUser().userId).subscribe(
      response => {
      },
      error => {
        this.resultError = true;
        this.resultSuccess = false;
        this.message = "An error has occurred while creating a sales transaction: " + error;
      }
    )
  }
}
