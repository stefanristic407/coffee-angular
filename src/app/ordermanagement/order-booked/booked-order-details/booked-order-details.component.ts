// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for booked type order.
import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'app-booked-order-details',
  templateUrl: './booked-order-details.component.html',
  styleUrls: ['./booked-order-details.component.css']
})
export class BookedOrderDetailsComponent implements OnInit {
  files: FileList;
  appLanguage?:any;
  countryValue: any;
  fileEvent: FileList;
  receiptName: string;
  roaster_id: string;
  receiptFileData: any;
  receipt_url: any;
  receipt_id: any;
  order_id: any;
  constructor(public bookedService: OrderBookedService,
    public globals: GlobalsService,
    private cookieService : CookieService,
    private toastrService : ToastrService,
    private userService : UserserviceService,
    private roasterService : RoasterserviceService,
    public profileservice:RoasteryProfileService) {
	// this.bookedService.viewAvailability();
      this.roaster_id = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order booked .
  openFile(event) {
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent);
    this.receiptName = this.files[0].name;
    // this.imageFileName = this.fileName;
    let fileList: FileList = this.fileEvent;
    // var parent_id = 0;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("file", file, file.name);
      formData.append('name',this.receiptName);
      formData.append('file_module','GC-Order');
      formData.append('parent_id','0');
      // this.roasterId = this.cookieService.get("roaster_id");
      formData.append(
        "api_call",
        "/es/" + this.roaster_id + "/file-manager/files"
      );
      formData.append("token", this.cookieService.get("Auth"));
      this.roasterService.uploadFiles(formData).subscribe(
        result =>{
          if(result['success']==true){
            this.toastrService.success("The file "+this.receiptName+" uploaded successfully");
            this.receiptFileData = result['result'];
            this.receipt_url = result['result'].url;
            this.receipt_id = result['result'].id;
            var data = {
              "receipt_file_id" : this.receipt_id
            }
            this.userService.paymentReceiptUpload(this.roaster_id,this.order_id,data).subscribe(
              res => {
                if(res['success'] == true){
                  this.toastrService.success("Receipt has been uploaded successfully");
                  this.bookedService.uploadShow = false;
                  this.bookedService.receiptShow = true;
                }
                else{
                  this.toastrService.error("Error while uploading the receipt with order id")
                }
              }
            )
     
          }else{
            this.toastrService.error("Error while uploading the file");
          }
        }
      )
      }

  }
  
  uploadReceipt(){
    this.bookedService.uploadShow = false;
    this.bookedService.receiptShow = true;
}
getPrice(){
	if(this.bookedService.price){
		return this.bookedService.price*this.bookedService.quantity;
	}
}

GetCountry(data:any){
  // console.log(data.toUpperCase());
  if(data){
    this.countryValue=this.profileservice.countryList.find(con =>con.isoCode == data.toUpperCase());
    if(this.countryValue){
    return this.countryValue.name;
    }
  }
}
}
