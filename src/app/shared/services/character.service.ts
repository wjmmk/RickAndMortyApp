import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Character } from '../../shared/interfaces/character.interface';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  searchCharacters(query = '', page = 1) {
    const filter =  `${environment.baseUrlAPI}/?name=${query} &page=${page}`;
    return this.http.get<Character[]>(filter);
  }

  // tslint:disable-next-line:typedef
  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`);
  }
}
