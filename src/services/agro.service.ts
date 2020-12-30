import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from './users/userservice.service';

@Injectable({
  providedIn: 'root',
})
export class AgroService {
  appid = '593c1b38da7aca9aca05192c565760b4';

  constructor(
    private http: HttpClient,
  ) {}

  getHistoricalWeather(query: any = {}) {
    const polyid = '5fdb6975f936d5000742add0';
    return this.http.get(
      `http://api.agromonitoring.com/agro/1.0/weather/history?appid=${this.appid}&polyid=${polyid}&start=${query.start}&end=${query.end}`
    );
  }
}
