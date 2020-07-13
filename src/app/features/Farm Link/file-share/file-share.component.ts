import { Component, OnInit, ɵɵresolveBody } from '@angular/core';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.remove-quiker-file').on('click', function (e) {
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
    $('body').on('click', '.Custom-select-input__selctedText', function () {
      var selctbox = $(this).parents('.Custom-select-input').find('.Custom-select-input-list').slideToggle();
      $(this).parents('.Custom-select-input').find('.Custom-select-input__selctedText').toggleClass('active')
    });

    $('body').on('click', ' .Custom-select-input-list__item', function () {
      var $val = $(this).text();
      var $setVal = $(this).parents('.Custom-select-input').find('input')
      $setVal.val($val);
      $(this).parents('.Custom-select-input').find('.Custom-select-input__selctedText').text($val)
      $(this).parents('.Custom-select-input').find('.Custom-select-input-list').slideToggle();
      $(this).parents('.Custom-select-input').find('.Custom-select-input__selctedText').toggleClass('active')
    });


/* pagination start */
    let listCount = 0;
    let elLen;
    let newliLen;

    $(document).ready(function () {
      var pLen = $('.pagination-content').length;
      console.log(pLen)
      for (var x = 0; x < pLen; x++) {
        var elements = $('.pagination-content').eq(x).find(".pagination-content-list .pagination-content-list__item");
        var index = 0;
        elLen = elements.length;
        newliLen = Math.floor(elLen / 4) + 1;
        var showNextFour = function (index) {
          if (index >= elements.length) {
            index = 0;
          }


          elements.hide().slice(index, index + 4).show();

        }
        showNextFour(listCount);

         // $('.responsive-pagination-list')
         if(newliLen >5) {
          for (var i = 1; i <= 5; i++) {
            var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
            $('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
            $('.pagination-content').eq(x).find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').addClass('active');
          }
    
         }

         else {
          for (var i = 1; i <= newliLen; i++) {
            var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
            $('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
            $('.pagination-content').eq(x).find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').addClass('active');
          }
         }
    
      }

    });


    //Next page
    $('body').on('click', '.responsive-pagination__next', function () {
      var step = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active');
      var steps = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item');
      var stepNext = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active').next('.responsive-pagination-list__item');
      var stepLastVal = parseInt($(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:last-child').text());
      $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
      var pageNew = parseInt($('.page-new').text());
      var pagefind = stepLastVal - pageNew;



      var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
      elLen = elements.length;
      newliLen = Math.floor(elLen / 4) + 1;
      var index = 0;
      var showNextFour = function (index) {
        if (index >= elements.length) {
          index = 0;
        }

        elements.hide().slice(index, index + 4).show();

      }


      listCount = listCount + 4;
      showNextFour(listCount);

      var stepValue = stepNext.text();
      if (stepLastVal < newliLen) {
        stepNext.removeClass('active');
        stepNext.prev('.responsive-pagination-list__item').addClass('active');

        if(newliLen > 5) {
          for (var i = 0; i <= 4; i++) {
            var newStep = parseInt(steps.eq(i).text());
  
            if (pageNew == (stepLastVal - 1)) {
              return false;
            }
  
            else {
              steps.eq(i).text(newStep + 1);
            }
          }
        }

        else {
          for (var i = 0; i <= newliLen; i++) {
            var newStep = parseInt(steps.eq(i).text());
  
            if (pageNew == (stepLastVal - 1)) {
              return false;
            }
  
            else {
              steps.eq(i).text(newStep + 1);
            }
          }
        }
        
      }


      else {
        step.removeClass('active');
        stepNext.addClass('active')


        if (stepNext.is(':last-child')) {
          $(this).addClass('disable');

        }

      }


      

    });



    //Prev page
    $('body').on('click', '.responsive-pagination__prev', function () {
      var step = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active:last');
      var steps = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item');
      var stepPrev = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active').prev('.responsive-pagination-list__item');
      var stepFirst = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child');
      var stepLastVal = parseInt($(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:last-child').text());
      var activeFirst = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').hasClass('active');


     
      listCount = listCount - 4;

      var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
      elLen = elements.length;
      newliLen = Math.floor(elLen / 4) + 1;
      var index = 0;
      var showNextFour = function (index) {
        if (index >= elements.length) {
          index = 0;
        }

        elements.hide().slice(index, index + 4).show();

      }


      showNextFour(listCount);

      if(newliLen > 5) {
     
        for (var i = 0; i <= 4; i++) {
          var newStep = parseInt(steps.eq(i).text());
  
 
  
          if (stepLastVal <= 5) {
            stepPrev.addClass('active');
            step.removeClass('active');
          }
  
          else {
            steps.eq(i).text(newStep - 1);
          }
        }
      }

      else {
        for (var i = 0; i <= newliLen; i++) {
          var newStep = parseInt(steps.eq(i).text());
  
  
  
          if (stepLastVal <= newliLen) {
            stepPrev.addClass('active');
            step.removeClass('active');
          }
  
          else {
            steps.eq(i).text(newStep - 1);
          }
        }
      }

      

      if (stepFirst.text() == '1' && stepFirst.hasClass('active')) {
        $(this).addClass('disable');
        $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
      }


    });




    $('body').on('click', '.responsive-pagination-list__item', function () {
      $(this).parents('.pagination-content').find('.responsive-pagination-list__item').not(this).removeClass('active');
      $(this).addClass('active');
      var liStep = parseInt($(this).text());
      listCount = 4;
      if (liStep == 1) {
        $(this).parents('.pagination-content').find('.responsive-pagination__prev').addClass('disable');
        $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
        liStep = 0;
        listCount = 0;
        console.log(listCount)

        var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
        elLen = elements.length;
        newliLen = Math.floor(elLen / 4) + 1;
        var index = 0;
        var showNextFour = function (index) {
          if (index >= elements.length) {
            index = 0;
          }

          elements.hide().slice(index, index + 4).show();

        }


        showNextFour(listCount);
      }

      else {
        $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
        $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
        listCount = (liStep * listCount) - 4;
        console.log(listCount)

        var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
        elLen = elements.length;
        newliLen = Math.floor(elLen / 4) + 1;
        var index = 0;
        var showNextFour = function (index) {
          if (index >= elements.length) {
            index = 0;
          }

          elements.hide().slice(index, index + 4).show();

        }


        showNextFour(listCount);
      }


      if (liStep == newliLen) {
        $(this).parents('.pagination-content').find('.responsive-pagination__next').addClass('disable');
      }


    });
    /* pagination ends */

  // Footer links
  
  $('body').on('click', '.footer-links__item', function () {
    $(this).parents('.footer-links').find('.footer-links__item').not(this).removeClass('active');
    $(this).addClass('active');
    $('.footer-links__item').find('.ft-dropdown').not(this).removeClass('active')

    $(this).find('.ft-dropdown').addClass('active')

    setTimeout(function(){
      $('.ft-dropdown').removeClass('active');
     }, 3500);
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

    setTimeout(function () {
      PrivewPopup.querySelector('.priview-popup-fileshare__img').classList.add('active')
    }, 50);
  }

  // Close Popup
  popupClose() {
    var PrivewPopup = document.querySelector('.priview-popup-fileshare')
    PrivewPopup.classList.remove('active');
    document.body.classList.remove('popup-open');
    PrivewPopup.querySelector('.priview-popup-fileshare__img').classList.remove('active')
  }

}

