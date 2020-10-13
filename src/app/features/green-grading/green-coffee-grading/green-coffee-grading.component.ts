import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-green-coffee-grading',
  templateUrl: './green-coffee-grading.component.html',
  styleUrls: ['./green-coffee-grading.component.css']
})
export class GreenCoffeeGradingComponent implements OnInit {
  cupping_type:any='';
  cupping:any;
  showCupping:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.cupping = '';

  }
  setCupping(cuppdata:any){
    this.cupping=cuppdata;
  }
  toggleCupping(){
    this.showCupping=!this.showCupping;
    if(this.showCupping==false){
			document.getElementById('cupping_id').style.border="1px solid #d6d6d6";
		}
		else{
			document.getElementById('cupping_id').style.border="1px solid #d6d6d6";
		
		}
  }
}
