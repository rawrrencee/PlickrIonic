import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Photo } from './photo';
import { PrivacyLevelEnum } from './privacy-level-enum.enum';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl: string = "/api/Photo";

  constructor(private httpClient: HttpClient) { }

  retrieveAllPhotos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllPhotos").pipe(
      catchError(this.handleError)
    );
  }

  retrievePublicPhotos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrievePublicPhotos").pipe(
      catchError(this.handleError)
    );
  }

  retrievePrivatePhotos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrievePrivatePhotos").pipe(
      catchError(this.handleError)
    );
  }

  retrieveFriendsOnlyPhotos(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveFriendsOnlyPhotos").pipe(
      catchError(this.handleError)
    );
  }

  retrieveFriendsOnlyAndPublicPhotosByUser(userId: Number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveFriendsOnlyAndPublicPhotosByUser?userId=" + userId).pipe(
      catchError(this.handleError)
    );
  }

  retrieveProfilePagePhotos(userId: Number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveProfilePagePhotos?userId=" + userId).pipe(
      catchError(this.handleError)
    );
  }

  retrieveUserPhotos(userId: Number): Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + "/retrieveUserPhotos?userId=" + userId).pipe(
      catchError(this.handleError)
    );
  }

  retrievePhotoDetails(photoId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/photoDetails?photoId=" + photoId).pipe(
      catchError(this.handleError)
    );
  }

  retrievePhotoByInteractionId(interactionId: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrievePhotoFromInteraction?interactionId=" + interactionId).pipe(
      catchError(this.handleError)
    );
  }

  editPhotoDetails(photoToEdit: Photo): Observable<any> {
    let editPhotoDetailsReq = {
      "photo": photoToEdit
    };
    return this.httpClient.put<any>(this.baseUrl + "/editPhotoDetails", editPhotoDetailsReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  retrieveComments(photoId: Number){
    return this.httpClient.get<any>(this.baseUrl + "/retrieveComments?photoId=" + photoId).pipe(
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

