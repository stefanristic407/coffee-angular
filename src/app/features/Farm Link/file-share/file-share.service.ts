import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileShareService {
  pinnedData : any = [];
  filesTerm:any;
  filterTerm:any;
  constructor() { }
}
