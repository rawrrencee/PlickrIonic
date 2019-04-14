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
	
	
	
	constructor(private httpClient: HttpClient)
	{		
	}
	
	
	
	userLogin(email: string, password: string): Observable<any>
	{
		return this.httpClient.get<any>(this.baseUrl + "/userLogin?email=" + email + "&password=" + password).pipe
		(
			catchError(this.handleError)
		);
	}

	registerUser(newUser: User): Observable<any> {
		let registerUserReq = {
			"newUser": newUser
		};

		return this.httpClient.put<any>(this.baseUrl + "/registerUser", registerUserReq, httpOptions).pipe(
			catchError(this.handleError)
		);
	}
	
	
	
	private handleError(error: HttpErrorResponse)
	{
		let errorMessage: string = "";
		
		if (error.error instanceof ErrorEvent) 
		{		
			errorMessage = "An unknown error has occurred: " + error.error.message;
		} 
		else 
		{		
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
		}
		
		console.error(errorMessage);
		
		return throwError(errorMessage);		
	}
}
