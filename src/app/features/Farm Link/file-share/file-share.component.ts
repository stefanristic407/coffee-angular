import { Component, OnInit } from '@angular/core';

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

      if ($this.is(':checked')) {
          $(this).parents('.custom-radio-container').find('.custom-radio').removeClass('active')
          $(this).parents('.custom-radio').addClass('active');
      }


  });
  }

}
