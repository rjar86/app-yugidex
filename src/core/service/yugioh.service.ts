import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YugiohCard } from '../models/card.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YugiohService {

  private apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(private _http: HttpClient) { }

  getAllCards() {
    return this._http.get<any>(this.apiUrl).pipe(
      map(res => res.data as YugiohCard[])
    )
  }

  getCardById(id: string) {
    return this._http
      .get<any>(`${this.apiUrl}?id=${id}`)
      .pipe(map(res => res.data[0] as YugiohCard));
  }

  getRelatedCards(type: string, race?: string) {
    let query = `${this.apiUrl}?type=${encodeURIComponent(type)}`;

    if (race) {
      query += `&race=${encodeURIComponent(race)}`;
    }

    return this._http.get<any>(query).pipe(
      map(res => res.data as YugiohCard[])
    );
  }
  getCardsByArchetype(archetype: string) {
    return this._http
      .get<any>(`${this.apiUrl}?archetype=${encodeURIComponent(archetype)}`)
      .pipe(map(res => res.data));
  }

  getCardsByTypeAndRace(type: string, race?: string) {
    let url = `${this.apiUrl}?type=${encodeURIComponent(type)}`;
    if (race) url += `&race=${encodeURIComponent(race)}`;

    return this._http.get<any>(url).pipe(
      map(res => res.data)
    );
  }

  searchCards(query: string, page = 1, pageSize = 20) {
    let url = `${this.apiUrl}?num=${pageSize}&offset=${(page - 1) * pageSize}`;

    if (query) {
      url += `&fname=${encodeURIComponent(query)}`;
    }

    return this._http.get<any>(url).pipe(
      map(res => res.data)
    );
  }




}
