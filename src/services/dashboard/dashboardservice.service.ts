import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {

  constructor() { }

  tableFilters(filters: any, data: any){
    var resultData = [];
    resultData = data.filter(function(item){
      for (var key in filters){
        if(filters[key] != ''){
          if(item[key] === undefined || item[key].toLowerCase() != filters[key].toLowerCase()){
            return false; 
          }
        } 
      }
      return true;
    });
    return resultData;
  }
}
