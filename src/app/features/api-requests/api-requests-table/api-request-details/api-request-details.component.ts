import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-api-request-details',
  templateUrl: './api-request-details.component.html',
  styleUrls: ['./api-request-details.component.css']
})
export class ApiRequestDetailsComponent implements OnInit {
  btnToggle = true;
  statusChange: string;
  modalRef: BsModalRef;
  resetButtonValue: string;

  constructor(private modalService: BsModalService) {
  
   }

   @ViewChild('pausetemplate') private pausetemplate: any;
   @ViewChild('deletetemplate') private deletetemplate: any;

   openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
   
   }
  ngOnInit(): void {
    this.resetButtonValue = "Generate Key";
  }
  activeStatus() {
    this.btnToggle = !this.btnToggle;
    if(this.btnToggle == true){
      this.statusChange = "ACTIVE";
    }
    else{
      this.statusChange = "INACTIVE";
    }
  }



  delete(){
    this.openModal(this.deletetemplate);
  }
  pause(){
    this.openModal(this.pausetemplate);

  }



 

}
