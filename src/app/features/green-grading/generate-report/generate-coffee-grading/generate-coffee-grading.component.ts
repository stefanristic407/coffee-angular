import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenerateReportService } from '../generate-report.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-coffee-grading',
  templateUrl: './generate-coffee-grading.component.html',
  styleUrls: ['./generate-coffee-grading.component.css']
})
export class GenerateCoffeeGradingComponent implements OnInit {
  @Output() next = new EventEmitter<any>();
  roaster_id: any;
  cupping_id: any;
  evaluatorData: any;
  evaluatorName: any;
  fullblack_num:any;
  fullblack_equ:any;
  fullsour_num:any;
  fullsour_equ:any;
  driedpod_num:any;
  driedpod_equ:any;
  fungus_num:any;
  fungus_equ:any;
  matter_num:any;
  matter_equ:any;
  insect_damage_num:any;
  insect_damage_equ:any;
  category_1_defects:any;
  moisture_content:any;
  water_activity:any;
  odor:any;
  cate2_black_num:any;
  cate2_black_equ:any;
  cate2_sour_num:any;
  cate2_sour_equ:any;
  cate2_dried_num:any;
  cate2_dried_equ:any;
  cate2_floater_num:any;
  cate2_floater_equ:any;
  cate2_unripe_num:any;
  cate2_unripe_equ:any;
  cate2_withered_num:any;
  cate2_withered_equ:any;
  cate2_shells_num:any;
  cate2_shells_equ:any;
  cate2_cut_num:any;
  cate2_cut_equ:any;
  cate2_hull_num:any;
  cate2_hull_equ:any;
  cate2_insect_num:any;
  cate2_insect_equ:any;
  cat2_defects:any;
  total_defects:any;
  totalColors:any=[];

  constructor(public generateService:GenerateReportService,private userService:UserserviceService, private cookieService : CookieService,private toastrService: ToastrService, private router : Router) {
    this.roaster_id = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    this.getEvaluatorData();
  }

  getEvaluatorData(){
    this.cupping_id= this.generateService.cuppingDetails.cupping_report_id;
	  this.userService.getEvaluatorsList(this.roaster_id,this.cupping_id).subscribe(
		  res=>{
			  if(res['success'] == true){
				  this.evaluatorData=res['result'][0];
				  this.evaluatorName=this.evaluatorData.evaluator_name;
			  }
		  }
	  )
  }

  selectColor(event,value){
		if(event.target.checked){
			if(!this.totalColors.includes(value)){
				this.totalColors.push(value);
			}
			// this.colorString=this.totalColors.toString();
		}
		else{
			if(this.totalColors.includes(value)){
				const index= this.totalColors.indexOf(value);
				this.totalColors.splice(index,1);
			}
			// this.colorString=this.totalColors.toString();
		}
  }
  
  private validateInput(){
		let flag = true;
		if (this.moisture_content == '' || this.water_activity == '' || this.odor == '' || this.totalColors == '' || this.total_defects == ''){
			flag = false;
		}
		return flag;
	}

  
	goNext(){
  this.cupping_id= this.generateService.cuppingDetails.cupping_report_id;
	let flag = this.validateInput();
		if(flag){
			var data={
				"full_black_no": this.fullblack_num,
				"full_black_eqv": this.fullblack_equ,
				"full_sour_no": this.fullsour_num,
				"full_sour_eqv": this.fullsour_equ,
				"dried_cherry_no": this.driedpod_num,
				"dried_cherry_eqv": this.driedpod_equ,
				"fungus_damaged_no": this.fungus_num,
				"fungus_damaged_eqv": this.fullsour_equ,
				"foreign_matter_no": this.matter_num,
				"foreign_matter_eqv": this.matter_equ,
				"severe_insect_damage_no": this.insect_damage_num,
				"severe_insect_damage_eqv": this.insect_damage_equ,
				"partial_black_no": this.cate2_black_num,
				"partial_black_eqv": this.cate2_black_equ,
				"partial_sour_no": this.cate2_sour_num,
				"partial_sour_eqv": this.cate2_sour_equ,
				"parchment_no": this.cate2_dried_num,
				"parchment_eqv": this.cate2_dried_equ,
				"floater_no": this.cate2_floater_num,
				"floater_eqv": this.cate2_floater_equ,
				"immature_no": this.cate2_unripe_num,
				"immature_eqv": this.cate2_unripe_equ,
				"withered_no": this.cate2_withered_num,
				"withered_eqv": this.cate2_withered_equ,
				"shells_no": this.cate2_shells_num,
				"shells_eqv": this.cate2_shells_equ,
				"brocken_chipped_no": this.cate2_cut_num,
				"brocken_chipped_eqv": this.cate2_cut_equ,
				"hull_husk_no": this.cate2_hull_num,
				"hull_husk_eqv": this.cate2_hull_equ,
				"slight_insect_damage_no": this.cate2_insect_num,
				"slight_insect_damage_eqv": this.cate2_insect_equ,
				"total_category_one": this.category_1_defects,
				"total_category_two": 14,
				"moisture_content": this.moisture_content,
				"water_activity": this.water_activity,
				"odor": this.odor,
				"colors": this.totalColors.toString(),
				"total_green_defects": this.total_defects
			}
			this.userService.addPhysicalDefects(this.roaster_id,this.cupping_id,data).subscribe(
			res=>{
				if(res['success'] == true){
					this.toastrService.success("Physical defects added successfully");
				}
				else{
					this.toastrService.error("Error while adding physical defects");
				}
			}
			)
		}
		else{
			this.toastrService.error("Fields should not be empty.");
		}
		this.next.emit('screen2');
	  }  

}
