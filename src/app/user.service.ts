import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { User } from './user';
import { AccessRightEnum } from './access-right-enum.enum';

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
