import { Component, OnInit, TemplateRef , Renderer2 } from '@angular/core';
import { SourcingService } from '../sourcing.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, NavigationExtras } from "@angular/router";
import {GlobalsService} from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { throttleTime } from 'rxjs/operators';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';

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
  appLanguage?: any;
  sourcingActive:any=0;
  filterGrade:'';
  filterCrop:'';
  filterOrigin:any=[];
  filterVariety:any=[];
  filterWeight:'';
  filterSearch:'';
  showOrigin:boolean = true;
  showVariety:boolean = true;
  
  // public data: any[] = [
	// 	{  estatename: 'Finca La Pampa', rating: '4.45',origin:'Colombia', range: '980-1100m', cropyear: 'March - June',certificates:'3','image':'/assets/images/sourcing-image1.jpg' },
	// 	{  estatename: 'Gesha', rating: '4.45',origin:'Colombia', range: '1500-1700m', cropyear: 'Jan - March',certificates:'2','image':'/assets/images/sourcing-image2.jpg' },
	// 	{  estatename: 'Finca La Toboba', rating: '4.2',origin:'Ethopia', range: '1300-1400m', cropyear: 'August - Dec',certificates:'1','image':'/assets/images/sourcing-image3.jpg' },
	// 	{  estatename: 'Asoproaaa', rating: '4.9', origin:'Brazil',range: '1000-1250m', cropyear: 'March - June',certificates:'1','image':'/assets/images/sourcing-image4.jpg' },
	// 	{  estatename: 'Cafe Directo', rating: '4.6', origin:'Ethopia',range: '1500-1700m', cropyear: 'August - Dec',certificates:'2','image':'/assets/images/sourcing-image5.jpg' },
	// 	{  estatename: 'La Isabela', rating: '4.1',origin:'Colombia', range: '980-1100m', cropyear: 'Jan - March',certificates:'3','image':'/assets/images/sourcing-image6.jpg' }
  // ];
  
//   public coffeedata: any[] = [
// 		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '7.4 USD',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
// 		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Castillo', price: '5.53',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88.0' },
// 		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '8.92',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
// 		{  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Castillo', price: '7.4',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
// 		{  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '5.6',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82.0' },
// 		{  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '8.92',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84.0' }
//   ];
  // appLanguage?: any;
  activeTab = this.sourcingService.currentView;
  roasterId: any;
  estateData: any;
  countryValue: any;
  monthName: any;
  listData: any;
	backValue: boolean;
	flavourName: any;
	coffeedata: any;
	harvestData: any;
	certiImage: any;
	certificate: any;
  harvestCertify: any;
  estateValue: any;

  constructor(public sourcingService:SourcingService,
    private modalService: BsModalService,private router: Router,
    public globals: GlobalsService,private renderer: Renderer2,
    private userService : UserserviceService,
    private cookieService : CookieService,
    private toastrService : ToastrService,
	public profile:RoasteryProfileService,
	public sourcing:SourcingService) {
      // this.renderer.listen('window', 'click',(e:Event)=>{ 
      //   if()
      //   this.modalRef.hide()
      // });
      this.roasterId  = this.cookieService.get('roaster_id');
     }

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
    this.appLanguage = this.globals.languageJson;
    // this.sourcingService.currentView =  "search";

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


// this.language();
  this.getAvailableEstates();
  this.getAvailableCoffee();
//   this.sourcing.certificateList();
  }

  getAvailableEstates(){
    this.userService.getAvailableEstates(this.roasterId).subscribe(
      data => {
        if(data['success'] == true){
          console.log(data['result']);
          this.estateData = data['result'];
        }else{
          this.toastrService.error("Error while getting estates");
        }
      }
    )
  }

  
  redirectToLots(data:any){
  this.backValue = true;
  this.listData = data.estate_id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "dataLots": encodeURIComponent(this.backValue),
        "listData": this.listData
      }
    }

    this.router.navigate(['/features/estate-details'], navigationExtras);
    // this.listData = data.estate_id;
    // console.log(this.listData);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "listData": this.listData,
    //   }
    // }
    // this.router.navigate(["/features/estate-details"], navigationExtras);
    // this.sourcingService.activeLandlots = "land-lots"; //making lots tab active
  }

  search(activeTab){
    this.activeTab = activeTab;
    this.sourcingService.currentView = activeTab ;
  }

  result(activeTab){
    this.activeTab = activeTab;
    this.sourcingService.currentView = activeTab ;
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
//   language(){
//     this.appLanguage = this.globals.languageJson;
//        this.sourcingActive++;
//     }
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
	toggleOrigin(){
		this.showOrigin = !this.showOrigin;
		if(this.showOrigin==false){
				document.getElementById('origin_id').style.border="1px solid #30855c";
			}
		else{
			document.getElementById('origin_id').style.border="initial";
			document.getElementById('origin_id').style.borderRight="1px solid #d6d6d6";
		}
	}
	toggleVariety(){
		this.showVariety = !this.showVariety;
		if(this.showVariety==false){
				document.getElementById('variety_id').style.border="1px solid #30855c";
			}
		else{
			document.getElementById('variety_id').style.border="initial";
			document.getElementById('variety_id').style.borderRight="1px solid #d6d6d6";
		}
  	}
	  
  estateList(data : any){
	this.listData = data.estate_id;
	this.certificate=data.certificates;
    console.log(this.certificate);
    let navigationExtras: NavigationExtras = {
      queryParams: {
		"listData": this.listData
		// certificate:JSON.stringify(this.certificate)
      }
      // skipLocationChange: true
    }
    this.router.navigate(["/features/estate-details"], navigationExtras);
    this.sourcingService.currentView = "search" ;
  }
  
  availableCoffeeList(item:any){
	this.harvestData = item.harvest_id;
    // console.log(this.harvestData);
    this.harvestCertify=item['estate']['certificates'];
    this.estateValue=item['estate'].id;
    console.log(this.harvestCertify);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "harvestData": this.harvestData,
        "estateId":this.estateValue
        // certificateHarvest:JSON.stringify(this.harvestCertify)
      }
      // skipLocationChange: true
    }
	this.router.navigate(["/features/available-coffee-list"],navigationExtras);    
	// this.sourcingService.currentView = "result" ;
  }

  GetMonthName(month:number){
    switch(month){
      case 1:
        this.monthName = "Jan";
        break;
    case 2:
        this.monthName = "Feb";
        break;
    
    case 3:
        this.monthName = "Mar";
        break;
    
    case 4:
        this.monthName = "Apr";
        break;
    case 5:
        this.monthName = "May";
        break;
    case 6:
        this.monthName = "Jun";
        break;
    case 7:
        this.monthName = "Jul";
        break;
    case 8:
        this.monthName = "Aug";
        break;
    case 9:
        this.monthName = "Sept";
        break;
    case 10:
        this.monthName = "Oct";
        break;
    case 11:
        this.monthName = "Nov";
        break;
    case 12:
        this.monthName = "Dec";
        break;
    default:
      this.monthName = '';
      break;    
    }
    return this.monthName;
  }
  GetCountry(data:any){
    // console.log(data.toUpperCase());
    this.countryValue=this.profile.countryList.find(con =>con.isoCode == data.toUpperCase());
    return this.countryValue.name;
    // console.log(this.countryValue.name);
  }
  setFilterValue(name:any,value:any){
    let filterValue=[];
    switch(name){
		case 'grade':
			this.filterGrade=value;
			console.log(this.filterGrade);

			break;
		case 'weight':
			this.filterWeight=value;
			console.log(this.filterWeight);

			break;
		case 'crop':
			this.filterCrop=value;
			console.log(this.filterCrop);

			break;
	}
	this.filterCall();
  }
  filterCall(){
	  const filterParams = [];
	  if(this.filterVariety.length){
		filterParams.push(`variety=${this.filterVariety}`)
	  } if( this.filterCrop){
		filterParams.push(`crop_year=${this.filterCrop}`)
	  } if(this.filterOrigin.length){
		filterParams.push(`origin=${this.filterOrigin}`)
	  } if( this.filterSearch){
		filterParams.push(`name=${this.filterSearch}`)
	  }
	  if(filterParams.length){
		const queryParams = '?' + filterParams.join('&');
		console.log(queryParams);
		this.userService.getAvailableEstates(this.roasterId,queryParams).subscribe(
			data => {
				if(data['success'] == true){
					console.log(data['result']);
					this.estateData = data['result'];
				}else{
					this.toastrService.error("Error while getting estates");
				}
			}
		)
	  }
  }

  selectVariety(event,value){
	  if(event.target.checked){
		if(!this.filterVariety.includes(value)){
			this.filterVariety.push(value);
		}
	  }
	  else{
		if(this.filterVariety.includes(value)){
			const index= this.filterVariety.indexOf(value);
			this.filterVariety.splice(index,1);
			
		}
	  }
  }

  selectOrigin(event,value){
	  console.log(event);
	if(event.target.checked){
		if(!this.filterOrigin.includes(value)){
			this.filterOrigin.push(value);
		}
	  }
	  else{
		if(this.filterOrigin.includes(value)){
			const index= this.filterOrigin.indexOf(value);
			this.filterOrigin.splice(index,1);
			
		}
	  }
  }
  clearFilter(){
	//   for(let i =0;i < this.filterVariety.length;i++){
	// 	this.filterVariety[i].isChecked = val;
	//   }
	this.filterOrigin=[];
	this.filterVariety=[];
	this.getAvailableEstates();
	// this.getAvailableGreenCoffee();
  }
  getAvailableCoffee(){
	this.userService.getAvailableGreenCoffee(this.roasterId).subscribe(
		result=>{
			if(result['success']==true){
				this.coffeedata = result['result'];
				console.log(this.coffeedata);
			}
		}
	)
  }
  getFlavourName(flavourid:any){
    if(this.sourcing.flavourList){
      this.flavourName = this.sourcing.flavourList.find(flavour => flavour.id == flavourid).name;
      return this.flavourName;
      }
    }
    getCertificateData(data:any){
		// this.sourcing.estateCertificates.forEach(element => {
		// 	if(element.id== data.type_id){
		// 		return '<img src='+element.image_url;
		// 	}
		if(data.type_id > 0){
			this.certiImage=this.sourcing.finalCertify.filter(certify=>certify.id == data.type_id);
			// return this.certiImage;
			if(this.certiImage !=''){
				// console.log(this.certiImage[0].image_url); 
				return this.certiImage[0].image_url;
			}
		}
    }
}
