import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-my-sample',
  templateUrl: './generate-my-sample.component.html',
  styleUrls: ['./generate-my-sample.component.css']
})
export class GenerateMySampleComponent implements OnInit {
  val3: 20;
  val4: 20;
  langChips : any = [];
  selectable = true;
  removable = true;
  constructor() { }

  ngOnInit(): void {
    
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      $(this).find('.btn').toggleClass('active_default');
      $(this).find('.btn').toggleClass('disable_default');
    });
  

  $('.toggle_butn').click(function () {
    $(this).find('.btn').toggleClass('active');
    $(this).find('.btn').toggleClass('taint_default');
    $(this).find('.btn').toggleClass('fault_default');
  });
  
}


addLang(value:any) {
  // const input = event.input;
  // const value = event.value;

  // Add our fruit
  if ((value || '').trim()) {
    this.langChips.push(value.trim());
  }

  // // Reset the input value
  // if (input) {
  //   input.value = '';
  // }

}

remove(lang: string): void {
  const index = this.langChips.indexOf(lang);

  if (index >= 0) {
    this.langChips.splice(index, 1);
  }
}
}
