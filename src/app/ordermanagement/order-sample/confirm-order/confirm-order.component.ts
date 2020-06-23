import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
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
