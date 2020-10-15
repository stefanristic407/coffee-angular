import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SourcingService {
  currentView : string = "search";
  constructor(private http: HttpClient) {
   }

   getImages() {
    return this.http.get<any>('assets/photos.json')
      .toPromise()
      .then(res => res.data)
      .then(data => { return data; });
    }
}
