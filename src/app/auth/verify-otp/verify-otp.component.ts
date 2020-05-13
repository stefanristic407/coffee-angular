import { Component, OnInit } from '@angular/core';
declare var $ : any;
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var counter = 60;
    var interval = setInterval(function() {
        counter--;
        if (counter <= 0) {
                clearInterval(interval);
            $('#timer').html("<span>00:00</span>");  
            return;
        }else{
            $('#time').text(counter);
        }
    }, 1000);
  }
  getCodeBoxElement(index) {
    return <HTMLInputElement>document.getElementById('codeBox' + index);
  }
   onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log("keyup is coming here ", eventCode);
    if (this.getCodeBoxElement(index).value.length == 1) {
      if (index !== 4) {
        this.getCodeBoxElement(index+ 1).focus();
      } else {
        this.getCodeBoxElement(index).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode == 8 && index !== 1) {
      this.getCodeBoxElement(index - 1).focus();
    }
  }
   onFocusEvent(index) {
     console.log("focusing here");     
    for (let item = 1; item < index; item++) {
      const currentElement = this.getCodeBoxElement(item);
      if (!currentElement.value) {
          currentElement.focus();
          break;
      }
    }
  }

}
