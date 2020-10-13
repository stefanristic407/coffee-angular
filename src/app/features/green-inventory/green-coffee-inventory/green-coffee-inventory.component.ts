import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-green-coffee-inventory',
  templateUrl: './green-coffee-inventory.component.html',
  styleUrls: ['./green-coffee-inventory.component.css']
})
export class GreenCoffeeInventoryComponent implements OnInit {
  data :any = {};
  mainData : any = {};
  dtOptions: DataTables.Settings = {
		language: { "search": '' }
  };
  appLanguage: any ={};
  greenActive:any =0;
  loader:boolean;
  public gridData: any[] = [
    { id: '65837', availibility_Name: 'Origanic washed Micro-lot', estate_Name: 'Finca La Pampa', origin: 'Brazil', variety: 'Bourborn',quandity: '278 Bags', cup_Score: '84.5', Actions: 'View' },
    { id: '43284', availibility_Name: 'Blend washed', estate_Name: 'Gesha', origin: 'Guatemala', variety: 'Bourborn',quandity: '297 bags', cup_Score: '88', Actions: 'View' },
    { id: '45627', availibility_Name: 'FTO blend', estate_Name: 'Finca La Toboba', origin: 'Spain', variety: 'Bourborn',quandity: '567 bags', cup_Score: '81.5', Actions: 'View' },
    { id: '34638', availibility_Name: 'Mebratu', estate_Name: 'Asopraaaa', origin: 'Brazil', variety: 'Bourborn',quandity: '953 bags', cup_Score: '85.4', Actions: 'View' },
    { id: '23238', availibility_Name: 'FTO Semi washed', estate_Name: 'Cafe Directo', origin: 'Sweden', variety: 'Bourborn',quandity: '110 bags', cup_Score: '82', Actions: 'View' },
    { id: '14842', availibility_Name: 'Blend', estate_Name: 'La Isabela', origin: 'Vietnam', variety: 'Bourborn',quandity: '450 bags', cup_Score: '84', Actions: 'View' },
		
  ];
  estatetermStatus ;
  estatetermOrigin ;
  estatetermType ;
  displayNumbers ;
  coffeetermOriginMob ; 
  showOrigin: boolean = true;
  showDisplay:boolean =true;
  showStatus: boolean = true;
  constructor(private globals: GlobalsService) { this.data = 
    [
    { id: '65837', availibility_Name: 'Origanic washed Micro-lot', estate_Name: 'Finca La Pampa', origin: 'Brazil', variety: 'Bourborn',quandity: '278 Bags', cup_Score: '84.5', Actions: 'View' },
    { id: '43284', availibility_Name: 'Blend washed', estate_Name: 'Gesha', origin: 'Guatemala', variety: 'Bourborn',quandity: '297 bags', cup_Score: '88', Actions: 'View' },
    { id: '45627', availibility_Name: 'FTO blend', estate_Name: 'Finca La Toboba', origin: 'Spain', variety: 'Bourborn',quandity: '567 bags', cup_Score: '81.5', Actions: 'View' },
    { id: '34638', availibility_Name: 'Mebratu', estate_Name: 'Asopraaaa', origin: 'Brazil', variety: 'Bourborn',quandity: '953 bags', cup_Score: '85.4', Actions: 'View' },
    { id: '23238', availibility_Name: 'FTO Semi washed', estate_Name: 'Cafe Directo', origin: 'Sweden', variety: 'Bourborn',quandity: '110 bags', cup_Score: '82', Actions: 'View' },
    { id: '14842', availibility_Name: 'Blend', estate_Name: 'La Isabela', origin: 'Vietnam', variety: 'Bourborn',quandity: '450 bags', cup_Score: '84', Actions: 'View' },
    // { id: '', avalibility_Name: '', estate_Name: '', origin: '', variety: '',quandity: '', cup_Score: '', Actions: '' },

  ];
  this.mainData = this.data;

}

  ngOnInit(): void {
   
    this.language();
    //Toggle Esstate active
  // $('.btn-switch').click(function() {
  // var $group = $(this).closest('.cardpanel-detail');
  // $('.btn-switch', $group).removeClass("active");
  // $(this).addClass("active");
  // });
  // $(".activate-toggle").click(function() {
  // $(".cardpanel-detail").fadeIn();
  //  $(".table-details").fadeOut();
  //   $(".remove-toggle").removeClass('active');
  //  // $(".cardpanel-detail").addClass('active')
  // });
  // $(".remove-toggle").click(function() {
  // $(".table-details").fadeIn();
  //  $(".cardpanel-detail").fadeOut();
  // $(".activate-toggle").removeClass('active');
  
  // });


    //Auth checking
    // if (this.cookieService.get("Auth") == "") {
    //   this.router.navigate(["/auth/login"]);
    // }

    this.dtOptions = {
      //ajax: this.data,
      data: this.data,
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
      processing: false,
      language: { search: "" },
      columns:[
        // {title: '<input type="checkbox" value="">' , data: null, className: "select-checkbox", defaultContent:'<input type="checkbox" value="">'},
        {
          title:'<label class="bestate-check "><input type="checkbox"  name="estate_all" [checked]="isAllCheckedEstate()" (change)="checkAllEstate($event)"><span class="estatecheckmark"></span></label>',

          defaultContent:'<label class="bestate-check"><input type="checkbox" name="sizecb[]" value="data.id" [(ngModel)]="data.state"  /><span class="estatecheckmark"></span>' , 
        },
        {
          title: this.appLanguage.order_id,
          data: 'id'
        }, {
          title: this.appLanguage.availibility_name,
          data: 'availibility_Name'
        }, 
        {
          title: this.appLanguage.estate_name,
          data: 'estate_Name',
          
        }, 
        {
          title: this.appLanguage.origin,
          data: 'origin'
        },

        {
          title: this.appLanguage.variety,
          data: 'variety'
        },
        {
          title: this.appLanguage.quantity,
          data: 'quandity',
          
        }, 
        {
          title: this.appLanguage.cup_score,
          data: 'cup_Score'
        },
      
        {
          title: this.appLanguage.action,
          defaultContent: this.appLanguage.view,
          className: "view-order"
        },
        {
          title: "",
          defaultContent: '<a class="menu-arrow"  placement="left" ><p><img class="ellipse-image" src="assets/images/more-opns-file.png" alt=""></p></a>'
          // className: "view-order"
        }
  ],
  

  rowCallback: (row: Node, data: any, index: number) => {
    const self = this;
    // $('td', row).click(function(){
    //   self.router.navigate(["/features/coffee-details"]);
    // })
  }
  
    };
    this.estatetermStatus = '';
    this.estatetermOrigin = '';
    this.estatetermType = '';
  this.displayNumbers = '10';
  this.coffeetermOriginMob = '';

    $(document).ready(function () {
      $(".dataTables_length").ready(function () {
        $(".dataTables_length").hide()
        $(".dataTables_info").hide();
        
      });
      $("input[type='search']").ready(function () {
        // $(".dataTables_filter>label").css("color","#FFF");
        $("input[type='search']").attr("placeholder", "Search by order id, estate name");
      });
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

  }
  language(){
   
    this.appLanguage = this.globals.languageJson;
   this.greenActive++;

  }
	toggleOrigin() {
		this.showOrigin = !this.showOrigin;
		if(this.showOrigin==false){
			document.getElementById('origin_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('origin_id').style.border="1px solid #d6d6d6";
		
		}
   }
   toggleStatus() {
		this.showStatus = !this.showStatus;
		if(this.showStatus==false){
			document.getElementById('status_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('status_id').style.border="1px solid #d6d6d6";
		
		}
   }
   toggleDisplay(){
		this.showDisplay = !this.showDisplay;
		if(this.showDisplay==false){
		  document.getElementById('display_id').style.border="1px solid #30855c";
	  }
	  else{
		  document.getElementById('display_id').style.border="1px solid #d6d6d6";
	  
	  }
	  }

}
