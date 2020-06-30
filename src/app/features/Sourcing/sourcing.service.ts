import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourcingService {
  crop:any;

  constructor() {
    this.crop='';
   }
}
