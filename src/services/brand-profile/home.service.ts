import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {environment} from 'src/environments/environment';
import {Constants} from 'src/services/brand-profile/constants';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService, 
    private constants: Constants) { }

  // User Home Save services
  
}
