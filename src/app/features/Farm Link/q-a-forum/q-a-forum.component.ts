import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q-a-forum',
  templateUrl: './q-a-forum.component.html',
  styleUrls: ['./q-a-forum.component.css']
})
export class QAForumComponent implements OnInit {
  showSort:boolean = true;
  sort:any;

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


  /* toggleSort */
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
