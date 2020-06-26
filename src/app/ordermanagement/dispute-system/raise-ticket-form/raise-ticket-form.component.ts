import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raise-ticket-form',
  templateUrl: './raise-ticket-form.component.html',
  styleUrls: ['./raise-ticket-form.component.css']
})
export class RaiseTicketFormComponent implements OnInit {
  date3: Date;

  orderid : number;
  helpyou : string="";
  // orderDate : string;
  weight : number;
  locaionBean : string;
  cupScore : number;
  disputeOrder : string="";
  problem : string;
  solProblem : string;

  orderidError : string;
  helpYouError : string; 
  // orderDateError : string;
  weightError : string;
  locaionBeanError : string;
  cupScoreError : string;
  disputeOrderError : string;
  problemError : string;
  solProblemError : string;

  constructor() { 

    this.orderidError = '';
    this.helpYouError = ''; 
    // this.orderDateError = '';
    this.weightError = '';
    this.locaionBeanError = '';
    this.cupScoreError = '';
    this.disputeOrderError = '';
    this.problemError = '';
    this.solProblemError = '';
  }

  ngOnInit(): void {

  
  
  }

  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }

  submitTicket(){
    // if ( this.orderid == null || this.orderid == undefined) {
    //   this.orderidError = "Please enter your order Id";
    //   document.getElementById('orderId').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.orderidError = "";
    //   }, 3000);
    // }
    if (this.helpyou == "" || this.helpyou == null || this.helpyou == undefined) {
      this.helpYouError = "Please select any option";
      document.getElementById('helpYou').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.helpYouError = "";
      }, 3000);
    }
    // else if (this.orderDate == "" || this.orderDate == null || this.orderDate == undefined) {
    //   this.orderDateError = "Please select Date";
    //   document.getElementById('orderDate').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.orderDateError = "";
    //   }, 3000);
    // }
    // else if (this.weight == null || this.weight == undefined) {
    //   this.weightError = "Please enter weight";
    //   document.getElementById('weight').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.weightError = "";
    //   }, 3000);
    // }
    // else if (this.locaionBean == "" ||this.locaionBean == null || this.locaionBean == undefined) {
    //   this.locaionBeanError = "Please select any location";
    //   document.getElementById('locaionBean').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.locaionBeanError = "";
    //   }, 3000);
    // }
    // else if (this.cupScore == null || this.cupScore == undefined) {
    //   this.cupScoreError = "Please enter cup score";
    //   document.getElementById('cupScore').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.cupScoreError = "";
    //   }, 3000);
    // }
    // else if (this.disputeOrder == "" ||this.disputeOrder == null || this.disputeOrder == undefined) {
    //   this.disputeOrderError = "Please enter dispute the order";
    //   document.getElementById('disputeOrder').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.disputeOrderError = "";
    //   }, 3000);
    // }
    else if (this.problem == "" ||this.problem == null || this.problem == undefined) {
      this.problemError = "Please describle your problem";
      document.getElementById('problem').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.problemError = "";
      }, 3000);
    }
    // else if (this.solProblem == "" ||this.solProblem == null || this.solProblem == undefined) {
    //   this.solProblemError = "please describle your solution of the problem";
    //   document.getElementById('solProblem').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.solProblemError = "";
    //   }, 3000);
    // }
  }

}
