import { Component, OnInit, TemplateRef } from '@angular/core';
import { SourcingService } from '../sourcing.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";


@Component({
  selector: 'app-sourcing',
  templateUrl: './sourcing.component.html',
  styleUrls: ['./sourcing.component.css']
})
export class SourcingComponent implements OnInit {
  grade:any;
  crop:any;
  sort:any;
  origin: any;
  termSearch:any;
  weight:any;
  showGrade: boolean = true;
  showCrop:boolean = true;
  showSort:boolean = true;
  showWeight:boolean = true;
  modalRef: BsModalRef;
  variety:any;


  public data: any[] = [
		{  estatename: 'Finca La Pampa', rating: '4.45',origin:'Colombia', range: '980-1100m', cropyear: 'March - June',certificates:'3','image':'/assets/images/sourcing-image1.jpg' },
		{  estatename: 'Gesha', rating: '4.45',origin:'Colombia', range: '1500-1700m', cropyear: 'Jan - March',certificates:'2','image':'/assets/images/sourcing-image2.jpg' },
		{  estatename: 'Finca La Toboba', rating: '4.2',origin:'Ethopia', range: '1300-1400m', cropyear: 'August - Dec',certificates:'1','image':'/assets/images/sourcing-image3.jpg' },
		{  estatename: 'Asoproaaa', rating: '4.9', origin:'Brazil',range: '1000-1250m', cropyear: 'March - June',certificates:'1','image':'/assets/images/sourcing-image4.jpg' },
		{  estatename: 'Cafe Directo', rating: '4.6', origin:'Ethopia',range: '1500-1700m', cropyear: 'August - Dec',certificates:'2','image':'/assets/images/sourcing-image5.jpg' },
		{  estatename: 'La Isabela', rating: '4.1',origin:'Colombia', range: '980-1100m', cropyear: 'Jan - March',certificates:'3','image':'/assets/images/sourcing-image6.jpg' }
  ];
  
  public coffeedata: any[] = [
		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '7.4 USD',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Castillo', price: '5.53',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88.0' },
		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '8.92',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
		{  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Castillo', price: '7.4',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
		{  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '5.6',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82.0' },
		{  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '8.92',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84.0' }
  ];
  constructor(public sourcingService:SourcingService,private modalService: BsModalService,private router: Router) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  ngOnInit(): void {
    this.grade = '';
    this.crop = '';
    this.sort = '';
    this.origin = '';
    this.weight = 'kg';
    this.variety='';

     //Toggle Esstate active
	  $('.btn-switch').click(function() {
      var $group = $(this).closest('.cardpanel-detail');
      $('.btn-switch', $group).removeClass("active");
      $(this).addClass("active");
    });
    $(".activate-toggle").click(function() {
      $(".cardpanel-detail").fadeIn();
       $(".table-details").fadeOut();
        $(".remove-toggle").removeClass('active');
     // $(".cardpanel-detail").addClass('active')
    });
    $(".remove-toggle").click(function() {
      $(".table-details").fadeIn();
       $(".cardpanel-detail").fadeOut();
      $(".activate-toggle").removeClass('active');
      
    });

    /*  active class for header */
    $('.nav-links__item').removeClass('active');
    $('.nav-links__item').eq(1).addClass('active');



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



  }
  setGrade(data:any){
    this.grade=data;
  }
  setCrop(cropdata:any){
    this.crop=cropdata;
  }
  setSort(sortdata:any){
    this.sort=sortdata;
  }
  setOrigin(origindata:any){
    this.origin=origindata;
    console.log(this.origin)

  }
  setWeight(weightdata:any){
    this.weight=weightdata;
  }
  setVariety(varietydata:any){
    this.variety=varietydata;
  }
  toggleGrade(){
    this.showGrade=!this.showGrade;
    if(this.showGrade==false){
			document.getElementById('grade_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('grade_id').style.border="1px solid #d6d6d6";
		
		}
  }
  toggleCrop(){
    this.showCrop=!this.showCrop;
    if(this.showCrop==false){
			document.getElementById('crop_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('crop_id').style.border="1px solid #d6d6d6";
		
		}
  }
  toggleSort(){
    this.showSort=!this.showSort;
    if(this.showSort==false){
			document.getElementById('sort_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('sort_id').style.border="1px solid #d6d6d6";
		
		}
  }
  toggleWeight(){
    this.showWeight = !this.showWeight;
    if(this.showWeight==false){
			document.getElementById('weight_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('weight_id').style.border="1px solid #d6d6d6";
		
		}
  }
  estateList(){
    this.router.navigate(["/features/estate-details"]);
  }
  availableCoffeeList(){
    this.router.navigate(["/features/available-coffee-list"]);
  }
}
