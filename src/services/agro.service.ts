import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from './users/userservice.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AgroService {
  appid = '593c1b38da7aca9aca05192c565760b4';

  constructor(
    private http: HttpClient,
  ) {}

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

  getHistoricalWeather(query: any = {}) {
    const polyid = '5fdb6975f936d5000742add0';
    query = this.checkTime(query);
    return this.http.get(
      `https://api.agromonitoring.com/agro/1.0/weather/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getHistoricalSoil(query: any = {}) {
    const polyid = '5fdb6975f936d5000742add0';
    query = this.checkTime(query);
    return this.http.get(
      `https://api.agromonitoring.com/agro/1.0/soil/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getHistoricalUv(query: any = {}) {
    const polyid = '5fdb6975f936d5000742add0';
    query = this.checkTime(query);
    return this.http.get(
      `https://api.agromonitoring.com/agro/1.0/uvi/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getHistoricalNdvi(query: any = {}) {
    const polyid = '5fdb6975f936d5000742add0';
    query = this.checkTime(query);
    return this.http.get(
      `https://api.agromonitoring.com/agro/1.0/ndvi/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }

  getImage(query: any = {}) {
    const polyid = '5fdb6975f936d5000742add0';
    query = this.checkTime(query);
    return this.http.get(
      `https://api.agromonitoring.com/agro/1.0/image/search?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }
}
