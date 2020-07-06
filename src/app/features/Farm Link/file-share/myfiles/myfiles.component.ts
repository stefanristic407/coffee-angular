// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  My files.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
	datatableElement: DataTableDirective;
	showDateRange: any;

	@ViewChild('calendar')
  	calendar: any;
	//dtInstance:DataTables.Api;

	// Static Estate Orders Data List
	public data: any;
	public mainData: any[];
	title = 'angulardatatables';
	dtOptions: DataTables.Settings = {
		language: { "search": '' }
	};

  constructor(public router: Router,
		public cookieService: CookieService,
		public dashboard: DashboardserviceService) {
			this.data = {};
			this.data = 
				[{ 
					"files": '<img class="dwnd-img pr-2" src="assets/images/file-fld.png" alt="upload-icon">' + "SEWN Guidelines",
					"orderid": "#129979", 
					"modified": "24/09/2019  3:06 pm"+ '<p class="by-txt"> by SEWN team</p>', 
          "type": "Folder",
          "action": '<img class="img" src="assets/images/more-opns-file.png">'
				},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-fld.png" alt="upload-icon">' + 'SEWN Sales & Concept prese..', orderid: '#221669', modified: '-', type: 'Folder'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'SEWN service offerings', orderid: '-', modified: '-',  type: 'Document'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-floder.png" alt="upload-icon">' + 'Löfbergs - Brand assets', orderid: '#127908', modified: '24/01/2020  11:05pm', type: 'CSV'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-floder.png" alt="upload-icon">' + 'Löfbergs - Machineries', orderid: '-', modified: '27/02/2020  4:17pm', type: 'CSV'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-video.png" alt="upload-icon">' + 'What is coffee?', orderid: '#727520', modified: '17/03/2020  7:17am', type: 'mp4'}
			
			];
			this.mainData = this.data;
		 }


     ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
  
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
            title: 'Files',
            data: 'files'
          }, {
            title: 'Order ID',
            data: 'orderid'
          }, 
          {
            title: 'Modified',
            data: 'modified',
            
          }, 
          {
            title: 'Type',
            data: 'type'
          },
          {
            title: "Actions",
            defaultContent: '<img class="img" src="assets/images/more-opns-file.png">'
          }
		],
		

		rowCallback: (row: Node, data: any, index: number) => {
			const self = this;
			$('td', row).click(function(){
				self.router.navigate(["/features/file-share-details"]);
			})
		}
		
      };
  
      $(document).ready(function () {
        $(".dataTables_length").ready(function () {
          $(".dataTables_length").hide()
          $(".dataTables_info").hide();
          
        });
        $("input[type='search']").ready(function () {
          // $(".dataTables_filter>label").css("color","#FFF");
          $("input[type='search']").attr("placeholder", "Search Files");
        });
      });
    }

}
