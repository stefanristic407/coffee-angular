import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-share-details',
  templateUrl: './file-share-details.component.html',
  styleUrls: ['./file-share-details.component.css']
})
export class FileShareDetailsComponent implements OnInit {
  sort:any;
  showSort:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.sort = '';

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

  setSort(sortdata:any){
    this.sort=sortdata;
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

}
