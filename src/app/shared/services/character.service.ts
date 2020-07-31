import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Character } from '../../shared/interfaces/character.interface';
import { Observable, throwError } from 'rxjs';
import { TrackHttpError } from '../models/trackHttpError';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  searchCharacters(query = '', page = 1): Observable<TrackHttpError | Character[]> {
    const filter =  `${environment.baseUrlAPI}/?name=${query} &page=${page}`;
    return this.http.get<Character[]>(filter)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  // tslint:disable-next-line:typedef
  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  private handleHttpError(error: HttpErrorResponse): Observable<TrackHttpError> {
    const dataError = new TrackHttpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error ocured retrienving data !!!';

    return throwError(dataError);
  }
}
