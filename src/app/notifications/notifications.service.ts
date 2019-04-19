import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../session.service';
import { PhotoService } from '../photo.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  baseUrl: string = "/api/Notification";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  public getNotificationsOfUser(): Observable<any> {
    const dataObservable = this.httpClient.get<any>(this.baseUrl + "/userNotifications?userId=" + this.sessionService.getUserId()).pipe(
      catchError(this.handleError)
    );

    return dataObservable;
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
