import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YourServicesService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) { }


 
  getMyFiles(): Observable<any> {
    const data = {};
    const roasterId = this.cookieService.get('roaster_id');
    data['api_call'] = `/ro/${roasterId}/file-manager/all-files?file_module=Virtual-Tour&type_in=VIDEO,IMAGE`;
    data['token'] = this.cookieService.get('Auth');
    data['method'] = 'GET';
    const url = `${environment.apiURL}/ro/api`;
    return this.http.post(url, data);
  }

  addFile(data: any): Observable<any> {
    const roasterId = this.cookieService.get('roaster_id');
    data.append('api_call', `/ro/${roasterId}/file-manager/files`);
    data.append('token', this.cookieService.get('Auth'));
    data.append('method', 'POST');
    const url = `${environment.apiURL}/ro/filesfolders`;
    const httpOptions = {
      headers: new HttpHeaders({ Accept: 'application/json' })
    };
    return this.http.post(url, data, httpOptions);
  }

  

}
