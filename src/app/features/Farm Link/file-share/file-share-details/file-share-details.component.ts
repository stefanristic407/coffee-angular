import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DashboardserviceService } from 'src/services/dashboard/dashboardservice.service';
import { BsModalService } from 'ngx-bootstrap/modal/public_api';
import { FileShareService } from '../file-share.service';
import { VideoTableComponent } from './video-table/video-table.component';
import { FileShareDetailsService } from './file-share-details.service';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { GlobalsService } from 'src/services/globals.service';
@Component({
  selector: 'app-file-share-details',
  templateUrl: './file-share-details.component.html',
  styleUrls: ['./file-share-details.component.css']
})
export class FileShareDetailsComponent implements OnInit {
  sort:any;
  showSort:boolean = true;
  folderId: string;
  roasterId: string;
  folderName: any;
  description: any;
  folder_name : string;
folder_descr : string;
invite : any = "Invite people";
folderNameError: string;
descriptionError: string;
  router: Router;
  dashboard: DashboardserviceService;
  modalService: BsModalService;
  files: any;
  fileEvent: any;
  fileName: any;

  file_id: any;
  company_id: any;
  company_type: any;
  permission: any;
  user_id_value: any;


  country: any;
    
  countries: any[];
      
  filteredCountriesSingle: any[];


  selectedValue: string;
  selectedOption: any;
  
  typedValue: any;
  usersList: any[]=[];
  share_permission: any;
  sharedUserslists: any = [];
  sharedUsers: any;
  appLanguage: any;


  constructor(public cookieService : CookieService,
              public toastrService : ToastrService,
              public roasterService : RoasterserviceService,
              public fileService : FileShareService,
              private route : ActivatedRoute,
              public filedetailsService : FileShareDetailsService,
              private globals: GlobalsService) { 
                this.roasterId = this.cookieService.get('roaster_id');
                // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                  // if(this.route.snapshot.queryParams['folderId']){
                  //   this.folderId = decodeURIComponent(this.route.snapshot.queryParams['folderId']);
                  //   console.log(this.folderId)
                  //   }
                  this.route.queryParams.subscribe(params => {
                    this.filedetailsService.folderId = params['folderId'];
                    console.log(this.filedetailsService.folderId);
                    this.getFolderDetails();
                  });
                
                this.folderNameError = "";
                this.descriptionError = ""
  }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
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


this.sharedUsersLists()
  }

sharedUsersLists(){
  this.roasterService.getSharedUserList(this.roasterId,this.filedetailsService.folderId).subscribe(
    response => {
      if(response['success'] == true){
        this.sharedUserslists = response['result'];
        this.sharedUsers = this.sharedUserslists.length;
        
      }else{
        this.toastrService.error("Error while getting the shared users");
      }
    }
  )
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



   
onSelect(event: TypeaheadMatch): void {
  this.selectedOption = event.item;
  console.log(this.selectedOption.id);
  this.user_id_value = this.selectedOption.id;
  this.company_id = this.selectedOption.organization_id;
  this.company_type = this.selectedOption.organization_type;
}

getUsersList(e :any){
  this.typedValue = e.target.value; 
  if(this.typedValue.length > 4){
  this.roasterService.getUsersList(this.typedValue).subscribe(
    data => {
      if(data['success']==true){
        this.usersList = data['result'];
      }else{
        this.toastrService.error("Error while fetching users list");
      }
    }
  )
}
}

  getFolderDetails(){
    console.log("calling from document file");
    this.roasterService.getFolderDetails(this.roasterId,this.filedetailsService.folderId).subscribe(
      data => {
        if(data['success']==true){
          this.folderName = data['result']['name'];
          this.description = data['result']['description'];
        }
        else{
          this.toastrService.error('Error while getting the folder details');
        }
      }
    )
  }

  documentUpload(event:any){
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent);
    this.fileName = this.files[0].name;
    let fileList: FileList = this.fileEvent;
    var parent_id = this.filedetailsService.folderId;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("file", file, file.name);
      formData.append('name',this.fileName);
      formData.append('file_module','File-Share');
      formData.append('parent_id',parent_id);
      this.roasterId = this.cookieService.get("roaster_id");
      formData.append(
        "api_call",
        "/ro/" + this.roasterId + "/file-manager/files"
      );
      formData.append("token", this.cookieService.get("Auth"));
      this.roasterService.uploadFiles(formData).subscribe(
        result =>{
          if(result['success']==true){
            this.toastrService.success("The file "+this.fileName+" uploaded successfully");
             // Calling the Grade info component by creating object of the component and accessing its methods
            //  setTimeout(()=>{
            //   let callFileandFolders = new DocumentTableComponent(this.router,this.cookieService,this.dashboard,this.roasterService,this.toastrService,this.route,this.modalService,this.fileService);
            // callFileandFolders.getFilesandFolders();
            // let callVideos=new VideoTableComponent(this.router,this.cookieService,this.dashboard,this.roasterService,this.toastrService,this.route,this.fileService,this.modalService)
            // },7000);
            // location.reload()
            this.filedetailsService.getFilesandFolders();
          }else{
            this.toastrService.error("Error while uploading the file");
          }
        }
      )
    }
  }
 


  
  createFolder(){
    if (
      this.folder_name == "" ||
      this.folder_name == null ||
      this.folder_name == undefined
    ) {
      this.folderNameError = "Please enter your password";
      document.getElementById("folder_name").style.border =
        "1px solid #D50000 ";
      setTimeout(() => {
        this.folderNameError = "";
      }, 3000);
    } 
    else if (
      this.folder_descr == "" ||
      this.folder_descr == null ||
      this.folder_descr == undefined
    ) {
      this.descriptionError = "Please enter your password";
      document.getElementById("folder_descr").style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.descriptionError = "";
      }, 3000);
    } 
    else{
      var data = {
        "name": this.folder_name,
        "description": this.folder_descr,
        "file_module": "File-Share",
        "parent_id" : parseInt(this.filedetailsService.folderId)
      }

      this.roasterService.createFolder(this.roasterId,data).subscribe(
        data => {
          console.log(data);
          if(data['success']==true){
            if(this.invite == "Invite people"){
              this.file_id = data['result'].id;
              var permission = document.getElementById('permission').innerHTML;
              if(permission == "Can view"){
                this.permission = "VIEW";
              }else if(permission == "Can edit"){
                this.permission = "EDIT";
              }
              var shareData = {
                "user_id" : this.user_id_value,
                "permission" : this.permission,
                "company_type" : this.company_type,
                "company_id" : this.company_id
              }
              console.log(shareData)
              this.roasterService.shareFolder(this.roasterId,this.file_id,shareData).subscribe(
                res => {
                  if(res['success']==true){
                  console.log(data);
                  this.fileService.getFilesandFolders();
              
                  this.toastrService.success("New folder "+this.folder_name+" has been created.");
    
                  this.folder_name = '';
                  this.folder_descr = '';
                  this.selectedOption = '';
                }
                else{
                  console.log(data);
                  this.toastrService.error("Error! while sharing the created folder");
                }
                }
              )
            }
            else{
              console.log(data);
              // Calling the Grade info component by creating object of the component and accessing its methods
              // setTimeout(()=>{
              //   let callFileandFolders = new DocumentTableComponent(this.router,this.cookieService,this.dashboard,this.roasterService,this.toastrService,this.route,this.modalService,this.fileService);
              // callFileandFolders.getFilesandFolders();
              // },5000);
              // location.reload()
              this.filedetailsService.getFilesandFolders();
              this.toastrService.success("New folder "+this.folder_name+" has been created.");

              this.folder_name = '';
              this.folder_descr = '';
              this.invite = "Invite people";
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
            }
          }
          else{
            this.toastrService.error("Error while creating Folder.");
          }
        }
      )

    }
  }

  shareFileAndFolder(){
    var file_id = this.filedetailsService.folderId;
    var share_permission = document.getElementById('share_permission').innerHTML;
    if(share_permission == "Can view"){
      this.share_permission = "VIEW";
    }else if(share_permission == "Can edit"){
      this.share_permission = "EDIT";
    }
    var shareData = {
      "user_id" : this.user_id_value,
      "permission" : this.share_permission,
      "company_type" : this.company_type,
      "company_id" : this.company_id
    }
    console.log(shareData)
    this.roasterService.shareFolder(this.roasterId,file_id,shareData).subscribe(
      res => {
        if(res['success']==true){
          this.sharedUsersLists();
          this.toastrService.success("The folder has been shared to the User sucessfully!")
        }
        else{
          this.toastrService.error("Error while sharing the folder to the user!");
        }
      
      })
  }

  removeAccess(item : any){
   
    if (confirm("Please confirm! you want to remove access?") == true) {
    
    var fileId = this.filedetailsService.folderId;
    var unShareData = {
      'user_id' : item.user_id,
      'company_type' : item.company_type,
      'company_id' : item.company_id
    }
    this.roasterService.unShareFolder(this.roasterId, fileId,unShareData).subscribe(
      data =>{
        if(data['success'] == true){
          this.sharedUsersLists();
          this.toastrService.success("Share access has been removed successfully.")
        }else{
          this.toastrService.error("Error while removing the access to the user");
        }
      }
    )
  }
}

changePermissions(term : any, item : any){
  var permission = term;
  var fileId = this.filedetailsService.folderId;
  var shareData = {
    "user_id": item.user_id,
    "permission": permission,
    "company_type": item.company_type,
    "company_id": item.company_id
  }
  this.roasterService.updatePermissions(this.roasterId,fileId,shareData).subscribe(
    data => {
      console.log(data)
      if(data['success'] == true){
        // this.sharedUsersLists();
        this.toastrService.success("Permission has been updated successfully.")
      }else{
        this.toastrService.error("Error while changing the Share permissions");
      }
    }
  )
}


}
