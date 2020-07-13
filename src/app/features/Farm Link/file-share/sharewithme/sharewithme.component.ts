// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  share with me.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';

@Component({
  selector: 'app-sharewithme',
  templateUrl: './sharewithme.component.html',
  styleUrls: ['./sharewithme.component.css']
})
export class SharewithmeComponent implements OnInit {
  rangeDates: any;

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
					"files": '<img class="dwnd-img pr-2" src="assets/images/file-fld.png" alt="upload-icon">' + "Finca Guadalupe Zajú - Bran..",
					"orderid": "#129979", 
          "modified": "24/09/2019  3:06 pm"+ '<p class="by-txt"> by SEWN team</p>', 
          "owner": "Finca Guadalupe Zajú",
          "type": "Folder",
          "action": '<img class="img" src="assets/images/more-opns-file.png">'
				},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-fld.png" alt="upload-icon">' + 'Finca La Pampa - Brand asse..', orderid: '#221669', modified: '-', owner:'Finca La Pampa', type: 'Folder'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'Roastery Machine Manuals', orderid: '-', modified: '-', owner:'Löfbergs', type: 'Document'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-floder.png" alt="upload-icon">' + 'Viay - Brand assets', orderid: '#127908', modified: '24/01/2020  11:05pm',owner:'Viay', type: 'CSV'},
				{ files: '<img class="dwnd-img pr-2" src="assets/images/file-video.png" alt="upload-icon">' + 'Simha coffee?', orderid: '#727520', modified: '17/03/2020  7:17am', owner:'Simha', type: 'mp4'}
			
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
            title: 'Owner',
            data: 'owner',
            
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
        self.router.navigate(["/features/file-share-details"]);			})
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

    openCalendar(event: any){
      this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }

    filterDate(event: any){
      if(this.rangeDates[0] != null && this.rangeDates[1] != null){
        var months = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var fDate = new Date(this.rangeDates[0]);
        var fromDate = JSON.stringify(fDate);
        fromDate = fromDate.slice(1,11);
        var fSplit = fromDate.split("-");
        
        var fDateString = fSplit[2] + " " + months[parseInt(fSplit[1])-1] + " " + fSplit[0];
        var tDate = new Date(this.rangeDates[1]);
        var toDate = JSON.stringify(tDate);
        toDate = toDate.slice(1,11);
        var tSplit = toDate.split("-");
        var tDateString = tSplit[2] + " " + months[parseInt(tSplit[1])-1] + " " + tSplit[0];
        console.log(tDate.getTime());
        console.log(fDate.getTime());
        this.showDateRange = fDateString + " - " + tDateString;
        
  
  
        $.fn.dataTable.ext.search.push(
          function (settings, data, dataIndex) {
            var min = new Date(fDateString).getTime();
            var max = new Date(tDateString).getTime();
            var startDate = new Date(data[3]).getTime();
            console.log(startDate);
            if (min == null && max == null) return true;
            if (min == null && startDate <= max) return true;
            if (max == null && startDate >= min) return true;
            if (startDate <= max && startDate >= min) return true;
            return false;
          }
        );
        this.datatableElement.dtInstance.then(table => {
          table.draw();
        });
  
      }
    }
  
   

}
