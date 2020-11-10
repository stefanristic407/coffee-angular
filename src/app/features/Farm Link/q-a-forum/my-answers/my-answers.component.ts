import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-answers',
  templateUrl: './my-answers.component.html',
  styleUrls: ['./my-answers.component.css']
})
export class MyAnswersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  moreMethod(){
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.getElementById("read_id");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
     

    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

  moreRead(){
    let dots = document.getElementById("dots_two");
    let moreText = document.getElementById("more_two");
    let btnText = document.getElementById("read_id_two");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
     

    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

}
