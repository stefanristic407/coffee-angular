// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Details for pre-book type order.
import { Component, OnInit } from '@angular/core';
import { OrderPrebookService } from '../order-prebook.service';
import { GlobalsService } from 'src/services/globals.service';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'sewn-prebook-order-details',
  templateUrl: './prebook-order-details.component.html',
  styleUrls: ['./prebook-order-details.component.css']
})
export class PrebookOrderDetailsComponent implements OnInit {
  files: FileList;
  receiptShow: boolean = false;
  uploadShow: boolean = true;
  appLanguage?: any;
  fileEvent: FileList;
  receiptName: string;
  roaster_id: any;
  receiptFileData: any;
  receipt_url: any;
  receipt_id: any;

  constructor(public prebookService: OrderPrebookService, public globals: GlobalsService, private cookieService: CookieService, private roasterService: RoasterserviceService,
    private userService: UserserviceService, private toastrService: ToastrService) {
    this.roaster_id = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
  // Function Name : Upload receipt
  // Description: This function helps to upload receipt in order details tab of order pre-book.
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
      formData.append('name', this.receiptName);
      formData.append('file_module', 'GC-Order');
      formData.append('parent_id', '0');
      // this.roasterId = this.cookieService.get("roaster_id");
      formData.append(
        "api_call",
        "/ro/" + this.roaster_id + "/file-manager/files"
      );
      formData.append("token", this.cookieService.get("Auth"));
      this.roasterService.uploadFiles(formData).subscribe(
        result => {
          if (result['success'] == true) {
            // this.toastrService.success("The file "+this.receiptName+" uploaded successfully");
            this.receiptFileData = result['result'];
            this.receipt_url = result['result'].url;
            this.receipt_id = result['result'].id;
            var data = {
              "receipt_file_id": this.receipt_id
            }
            this.userService.paymentReceiptUpload(this.roaster_id, this.prebookService.orderPreId, data).subscribe(
              res => {
                if (res['success'] == true) {
                  this.toastrService.success("Receipt has been uploaded successfully");
                  this.prebookService.uploadShow = false;
                  this.prebookService.receiptShow = true;
                }
                else {
                  this.toastrService.error("Error while uploading the receipt with order id")
                }
              }
            )

          } else {
            this.toastrService.error("Error while uploading the file");
          }
        }
      )
    }

  }
  uploadReceipt() {
    this.prebookService.uploadShow = false;
    this.prebookService.receiptShow = true;
  }
}
