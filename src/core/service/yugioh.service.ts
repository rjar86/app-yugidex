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

}
