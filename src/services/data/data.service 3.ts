import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
export const WS_ENDPOINT = environment.wsEndpoint;
  
@Injectable({
  providedIn: 'root'
})
export class DataService {
  service: any;
  constructor( private cookieService: CookieService) { }
  public connect(){ 
    var id = this.cookieService.get("roaster_id");
    this.service = webSocket(`${WS_ENDPOINT}/ro/${id}/messaging`);
    console.log(this.service);
    return this.service;
  }

  sendMessage(type: any, msg: any) {

  }

  getAllThreads(){
    var req = {};
    req['type'] = "threads";
    req['timestamp'] = this.getTimestamp();
    this.service.next(req);
  }
  close() { }

  isAuthenticated(){
    var authCheck = {};
		authCheck['timestamp'] = this.getTimestamp();
		authCheck['type'] = "auth";
		authCheck['data'] = {};
		authCheck['data']['user_token'] = this.cookieService.get("Auth");
  }
  //Internal Methods
  getTimestamp(){
    var date = new Date();
    var utcDateTime = date.getUTCDate() + "-" + date.getMonth() + "-" + date.getUTCFullYear();
    utcDateTime += " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds() + "." + date.getUTCMilliseconds();
    return utcDateTime;
  }
}