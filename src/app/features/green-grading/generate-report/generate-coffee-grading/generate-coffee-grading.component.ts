import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generate-coffee-grading',
  templateUrl: './generate-coffee-grading.component.html',
  styleUrls: ['./generate-coffee-grading.component.css']
})
export class GenerateCoffeeGradingComponent implements OnInit {
  @Output() next = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  goNext(){
    console.log("coming here");
    this.next.emit('screen2');
    
  }

}
