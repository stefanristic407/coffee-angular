import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generate-green-coffee',
  templateUrl: './generate-green-coffee.component.html',
  styleUrls: ['./generate-green-coffee.component.css']
})
export class GenerateGreenCoffeeComponent implements OnInit {
  cupping_type:any='';
  cupping:any;
  showCupping:boolean = true;
  @Output() next = new EventEmitter<any>();


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
  goNext(){
    this.next.emit('screen3');
  }

}
