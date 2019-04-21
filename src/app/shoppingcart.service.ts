import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Photo } from './photo';
import { PhotoService } from './photo.service';
import { SessionService } from './session.service';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl: string = "/api/SaleTransaction";

  private shoppingCart: Photo[] = [];

  constructor(private photoService: PhotoService, private sessionService: SessionService, private httpClient: HttpClient) { }

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

  createSaleTransaction(photos: Photo[], userId: number): Observable<any> {
    let saleTransactionReq = {
      "photos": photos,
      "userId": this.sessionService.getCurrentUser().userId
    };

    return this.httpClient.post<any>(this.baseUrl + "/createSaleTransaction", saleTransactionReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
		let errorMessage: string = "";

		if (error.error instanceof ErrorEvent) {
			errorMessage = "An unknown error has occurred: " + error.error.message;
		}
		else {
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
		}

		console.error(errorMessage);

		return throwError(errorMessage);
	}
}
