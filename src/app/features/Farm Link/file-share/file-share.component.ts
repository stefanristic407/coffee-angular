import { Component, OnInit, ɵɵresolveBody } from '@angular/core';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.remove-quiker-file').on('click', function(e) {
      e.preventDefault();
     
  });
  
  $('.custom-radio input[type="radio"]').on('change', function () {
      var $this = $(this);
      var $value = $(this).val();

      if ($this.is(':checked')) {
          $(this).parents('.custom-radio-container').find('.custom-radio').removeClass('active')
          $(this).parents('.custom-radio').addClass('active');

          if ($value == 'Only me') {
            $(this).parents('#createfolder').find('.invite-to').slideUp();
          }

          else {
            $(this).parents('#createfolder').find('.invite-to').slideDown();
          }
      }


  });
 
  //Custom select box
  $('body').on('click', '.Custom-select-input__selctedText', function() {
    var selctbox = $(this).parents('.Custom-select-input').find('.Custom-select-input-list').slideToggle();
    $(this).parents('.Custom-select-input').find('.Custom-select-input__selctedText').toggleClass('active')
  });

  $('body').on('click', ' .Custom-select-input-list__item', function() {
    var $val = $(this).text();
    var $setVal = $(this).parents('.Custom-select-input').find('input')
    $setVal.val($val);
    $(this).parents('.Custom-select-input').find('.Custom-select-input__selctedText').text($val)
    $(this).parents('.Custom-select-input').find('.Custom-select-input-list').slideToggle();
    $(this).parents('.Custom-select-input').find('.Custom-select-input__selctedText').toggleClass('active')
  });
}

  // Open Popup
  popupPrivew(e) {
    var PrivewPopup = document.querySelector('.priview-popup-fileshare')
    var SetImg = PrivewPopup.querySelector('.img')
    var url = e.target.getAttribute('src');
    SetImg.setAttribute('src', url)
    PrivewPopup.classList.add('active');
    document.body.classList.add('popup-open');   
    
    setTimeout(function(){
      PrivewPopup.querySelector('.priview-popup-fileshare__img').classList.add('active')
    },50);
  }

  // Close Popup
  popupClose() {
    var PrivewPopup = document.querySelector('.priview-popup-fileshare')
    PrivewPopup.classList.remove('active');
    document.body.classList.remove('popup-open');    
    PrivewPopup.querySelector('.priview-popup-fileshare__img').classList.remove('active')
  }

}

