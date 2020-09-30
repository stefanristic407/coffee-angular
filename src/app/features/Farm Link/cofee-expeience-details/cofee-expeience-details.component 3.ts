import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cofee-expeience-details',
  templateUrl: './cofee-expeience-details.component.html',
  styleUrls: ['./cofee-expeience-details.component.css']
})
export class CofeeExpeienceDetailsComponent implements OnInit {
  date1: Date;

  constructor() { }

  ngOnInit(): void {
    
    $("body").on("change", ".custom-label__inputs", function () {
      var $this = $(this);
  
      if ($this.is(':checked')) {
          $this.parents('.custom-label').addClass('active');
          var totalChecked = $('.roastery-tags__checkboxes').find('.custom-label.active').length;
          console.log(totalChecked)
  
          if (totalChecked == 5) {
              $('.roastery-tags__checkboxes').find('.custom-label').find('.custom-label__inputs').prop('disabled', true);
              $('.roastery-tags__checkboxes').find('.custom-label.active').find('.custom-label__inputs').prop('disabled', false);
          }
      }
  
      else {
          $this.parents('.custom-label').removeClass('active');
          $('.roastery-tags__checkboxes').find('.custom-label').find('.custom-label__inputs').prop('disabled', false);
          $('.roastery-tags__checkboxes').find('.custom-label.active').find('.custom-label__inputs').prop('disabled', false);
      }
  });

  }

  


  

}
