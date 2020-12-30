import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-grade-sample',
  templateUrl: './grade-sample.component.html',
  styleUrls: ['./grade-sample.component.css']
})
export class GradeSampleComponent implements OnInit {
  roaster_id: any;
  grade_origin:any;
  grade_estate:any;
  grade_species:any;
  grade_id:any;

  constructor(private userService:UserserviceService, 
    private toasterService: ToastrService, private router: Router,
    public globals: GlobalsService,private cookieService : CookieService) {
      this.roaster_id = this.cookieService.get('roaster_id');
    }

  ngOnInit(): void {
  }
  addExternalReport(){
    var data={
      "origin": this.grade_origin,
      "estate_name": this.grade_estate,
      "species": this.grade_species,
      "sample_id": this.grade_id
    }
    this.userService.addExternalCuppingReport(this.roaster_id,data).subscribe(
      res=>{
		if (res['success'] == true){
			this.toasterService.success('External cupping report added successfully.');
			this.router.navigate(['/features/grade-service']);
		}
		else{
			this.toasterService.error("Error while adding reports.")
		}
      }
    )
  }
}
