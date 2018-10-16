import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalePlace } from "../model/salePlace.model";

@Injectable()
export class SalePlaceService {
  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/salePlaces';

  getSalePlaces() {
    return this.http.get<SalePlace[]>(this.baseUrl);
  }

  getSalePlaceByUuid(uuid: string) {
    console.log(this.baseUrl + '/?uuid=' + uuid);
    return this.http.get<SalePlace>(this.baseUrl + '/?uuid=' + uuid);
  }

  createSalePlace(salePlace: SalePlace) {
    return this.http.post(this.baseUrl, salePlace);
  }

  updateSalePlace(salePlace: SalePlace) {
    return this.http.put(this.baseUrl + '/' + salePlace.uuid, salePlace);
  }

  deleteSalePlace(uuid: string) {
    return this.http.delete(this.baseUrl + '/' + uuid);
  }
}