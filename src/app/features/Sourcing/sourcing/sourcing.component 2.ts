import { Component, OnInit, TemplateRef } from '@angular/core';
import { SourcingService } from '../sourcing.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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


  public data: any[] = [
		{  estatename: 'Finca La Pampa', rating: '4.45',origin:'Colombia', range: '980-1100m', cropyear: 'March - June',certificates:'3','image':'/assets/images/sourcing-image1.jpg' },
		{  estatename: 'Gesha', rating: '4.45',origin:'Colombia', range: '1500-1700m', cropyear: 'Jan - March',certificates:'2','image':'/assets/images/sourcing-image2.jpg' },
		{  estatename: 'Finca La Toboba', rating: '4.2',origin:'Ethopia', range: '1300-1400m', cropyear: 'August - Dec',certificates:'1','image':'/assets/images/sourcing-image3.jpg' },
		{  estatename: 'Asoproaaa', rating: '4.9', origin:'Brazil',range: '1000-1250m', cropyear: 'March - June',certificates:'1','image':'/assets/images/sourcing-image4.jpg' },
		{  estatename: 'Cafe Directo', rating: '4.6', origin:'Ethopia',range: '1500-1700m', cropyear: 'August - Dec',certificates:'2','image':'/assets/images/sourcing-image5.jpg' },
		{  estatename: 'La Isabela', rating: '4.1',origin:'Colombia', range: '980-1100m', cropyear: 'Jan - March',certificates:'3','image':'/assets/images/sourcing-image6.jpg' }
  ];
  
  public coffeedata: any[] = [
		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '$7.4 USD / kg',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Bourbon', price: '$5.53USD / kg',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88' },
		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
		{  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Bourbon', price: '$7.4 USD / kg',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
		{  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '$5.6 USD / kg',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82' },
		{  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84' }
  ];
  constructor(public sourcingService:SourcingService,private modalService: BsModalService,) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  ngOnInit(): void {
    this.grade = '';
    this.crop = '';
    this.sort = '';
    this.origin = '';
    this.weight = '';

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

  }
  setWeight(weightdata:any){
    this.weight=weightdata;
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
}
