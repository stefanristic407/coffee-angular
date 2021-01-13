import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AgroService {
  appid = '593c1b38da7aca9aca05192c565760b4';
  apiUrl = 'https://api.agromonitoring.com/agro/1.0/';

  constructor(private http: HttpClient) {}

  checkTime(query: any) {
    // Check time
    if (query.end <= query.start) {
      const temp = query.start;
      query.start = query.end;
      query.end = temp;
    }
    query.sart = Math.min(query.start, moment().subtract(1, 'hours').unix());
    query.end = Math.min(query.end, moment().subtract(1, 'hours').unix());
    return query;
  }

  getHistoricalWeather(polyid, query: any = {}) {
    query = this.checkTime(query);
    return this.http.get(
      `${this.apiUrl}weather/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getHistoricalSoil(polyid, query: any = {}) {
    query = this.checkTime(query);
    return this.http.get(
      `${this.apiUrl}soil/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getHistoricalUv(polyid, query: any = {}) {
    query = this.checkTime(query);
    return this.http.get(
      `${this.apiUrl}uvi/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getHistoricalNdvi(polyid, query: any = {}) {
    query = this.checkTime(query);
    return this.http.get(
      `${this.apiUrl}ndvi/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getImage(polyid, query: any = {}) {
    query = this.checkTime(query);
    return this.http.get(
      `${this.apiUrl}image/search?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }
}
