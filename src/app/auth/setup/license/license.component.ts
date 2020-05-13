import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sewn-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  array : number[] = [0];
 licenseDetails : any ;
//  showLicenseDiv :boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addCert(){
    this.array.push(this.array.length);
  }
  delete(i){
    const index: number = this.array.indexOf(i);
    this.array.splice(index,1);
  }

  // uploadLicense(){
  //   this.showLicenseDiv = true;

  // }


}
