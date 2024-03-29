import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { SessionService } from './session.service';
import { User } from './user';
import { UserTypeEnum } from './user-type-enum.enum';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class UserService {

	baseUrl: string = "/api/User";



	constructor(private httpClient: HttpClient) {
	}



	userLogin(email: string, password: string): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + "/userLogin?email=" + email + "&password=" + password).pipe
			(
				catchError(this.handleError)
			);
	}

	registerUser(newUser: User): Observable<any> {
		let registerUserReq = {
			"newUser": newUser
		};

		return this.httpClient.post<any>(this.baseUrl + "/registerUser", registerUserReq, httpOptions).pipe(
			catchError(this.handleError)
		);
	}

	retrievePhotoUploader(photoId: number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + "/retrievePhotoUploader?photoId=" + photoId).pipe(
			catchError(this.handleError)
		);
	}

	retrieveUserByPhoto(photoId: number): Observable<any> {
		return this.httpClient.get<any>(this.baseUrl + "/retrieveUserFromPhoto?photoId=" + photoId).pipe(
		  catchError(this.handleError)
		);
	}

	retrieveFriends(userId: Number): Observable<any>{
		return this.httpClient.get<any>(this.baseUrl + "/retrieveFriends?userId=" + userId).pipe(
		  catchError(this.handleError)
		);
	}

	retrieveFollowingsList(userId: Number): Observable<any>{
		return this.httpClient.get<any>(this.baseUrl + "/retrieveFollowingsList?userId=" + userId).pipe(
		  catchError(this.handleError)
		);
	}

	retrieveFollowersList(userId: Number): Observable<any>{
		return this.httpClient.get<any>(this.baseUrl + "/retrieveFollowersList?userId=" + userId).pipe(
		  catchError(this.handleError)
		);
	}

	retrieveUserByUserByUserId(userId: Number): Observable<any>{
		return this.httpClient.get<any>(this.baseUrl + "/retrieveUserByUserByUserId?userId=" + userId).pipe(
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
