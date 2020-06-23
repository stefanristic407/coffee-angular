import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-prebook-confirm-order',
  templateUrl: './prebook-confirm-order.component.html',
  styleUrls: ['./prebook-confirm-order.component.css']
})
export class PrebookConfirmOrderComponent implements OnInit {
  quantity:any;
  price:number=450;
  confirmOrderError:any;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }
  @ViewChild('confirmtemplate') private confirmtemplate: any;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  ngOnInit(): void {
    this.quantity='';
    this.confirmOrderError='';
    // this.price="$450";
  }
  placeOrder(){
    if(this.quantity=="" || this.quantity == null || this.quantity == undefined){
      this.confirmOrderError = "Please enter quantity";
      document.getElementById('quantityId').style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.confirmOrderError = "";
        document.getElementById('quantityId').style.border = "1px solid #d6d6d6 ";
      }, 3000);
    }
    else{
this.openModal(this.confirmtemplate);
    }
  }
}
