import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-generate-key-details',
  templateUrl: './generate-key-details.component.html',
  styleUrls: ['./generate-key-details.component.css']
})
export class GenerateKeyDetailsComponent implements OnInit {

  btnToggle = true;
  statusChange: string;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  
   }

   @ViewChild('pausetemplate') private pausetemplate: any;
   @ViewChild('deletetemplate') private deletetemplate: any;

   openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
   
   }
  ngOnInit(): void {
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
