import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { UserserviceService } from "src/services/users/userservice.service";
import { ToastrService } from "ngx-toastr";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
declare var $ : any;

@Component({
  selector: 'sewn-profile-license',
  templateUrl: './profile-license.component.html',
  styleUrls: ['./profile-license.component.css']
})
export class ProfileLicenseComponent implements OnInit {

  public licenseArray: any = [];
  public addanotherrow: number;
  licenseDetails: any;
  public fileEvent: any;
  public savedcertificatesArray: any = [];
  public showsaveddatadiv: boolean = false;
  fileName: string;
  files: FileList;
  roasterId: any;
  certificationNameError: string;
  certificationYearError: string;
  // certificationFileError: string;
  secondButtonValue: any;
  termStatus: any;

  showRelavant:boolean=true;
  userId: string;


  constructor(
    private _cokkieService: CookieService,
    private _userService: UserserviceService,
    private toastrService: ToastrService
  ) { 
    this.termStatus = "Only me";
    this.licenseArray.push({
      id: 1,
      name: "",
      year: "",
      certattachment: "",
      attachFileDiv: true,
      fileTagDiv: false,
      uploadFileFlag: "upload"
    });
    this.addanotherrow = this.licenseArray.length;
    this.roasterId = this._cokkieService.get("roaster_id");
    this.userId = this._cokkieService.get('user_id');
    this.certificationNameError = "";
    this.certificationYearError = "";
    // this.certificationFileError = '';
  }

 
  ngOnInit(): void {
    this.savedcertificatesArray = [];
    this.showsaveddatadiv = false;
    this.secondButtonValue = "Save";

    this.getCertificates();
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border =
        "1px solid #d6d6d6";
    // } else {
    //   document.getElementById(event.target.id).style.border =
    //     "1px solid #d6d6d6";
    }
  }

  getCertificates(){
    this._userService.getCertificates(this.roasterId, this.userId).subscribe(
      data => {
        if(data['success'] == true){
          
          this.showsaveddatadiv = true;
          this.savedcertificatesArray = data['result'];
          console.log(this.savedcertificatesArray);
        }
      }
    )
  }

  setStatus(term: any) {
    this.termStatus = term;
  }
  toggleRelavant(){
    this.showRelavant = !this.showRelavant;

  }

  //  Function Name : File Open.
  //Description: This function open file explorer.
  onFileChange(event, rowcount: any) {
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent)
    if (this.files.length > 0) { 
			for (let x = 0; x <= this.files.length - 1; x++) { 

				const fsize = this.files.item(x).size; 
				const file = Math.round((fsize / 1024)); 
				// The size of the file. 
      if (file >= 2048) {
        this.toastrService.error("File too big, please select a file smaller than 2mb");
      }else{
       
          this.fileName = this.files[0].name;
          for (let i = 0; i < this.licenseArray.length; i++) {
            if (rowcount == this.licenseArray[i]["id"]) {
              this.licenseArray[i]["attachFileDiv"] = false;
              this.licenseArray[i]["fileTagDiv"] = true;
              this.licenseArray[i]["certattachment"] =
                this.fileName.substring(0, 5) +
                "... ." +
                this.fileName.split(".").pop();
              this.licenseArray[i]["uploadFileFlag"] = "upload";
            }
          }
        
 
  }
}
    }
  }

  //  Function Name : Add Certificate.
  //Description: This function helps for adding new row for certificate.
  addnewrow() {
    var newrowc = this.addanotherrow + 1;
    this.addanotherrow = newrowc;
    this.licenseArray.push({
      id: this.addanotherrow,
      name: "",
      year: "",
      certattachment: "",
      attachFileDiv: true,
      fileTagDiv: false,
      uploadFileFlag: "upload"
    });
    //this.licenseArray.push(this.licenseArray.length);
  }

  //  Function Name : Delete Certificate.
  //Description: This function helps for deleting certificate.
  delete(rowcount) {
    for (let i = 1; i < this.licenseArray.length; i++) {
      if (rowcount == this.licenseArray[i]["id"]) {
        this.licenseArray.splice(i, 1);
      }
    }
  }
  //  Function Name : Save Certificate.
  //Description: This function helps for saving certificate.
  savecertificate(rowcount, event) {
    for (let j = 0; j < this.licenseArray.length; j++) {
      if (
        this.licenseArray[j].name == "" &&  this.licenseArray[j].year == ""){
          $(".myAlert-top").show();
          this.certificationNameError = "Please Fill the mandatory Fields";
          this.certificationYearError = "Please Fill the mandatory Fields";
          document.getElementById("certification_name").style.border =
            "1px solid #d50000";
            document.getElementById("certification_year").style.border =
            "1px solid #d50000";
          setTimeout(() => {
            this.certificationNameError = "";
            this.certificationYearError = "";
          }, 3000);
        }
      else if (
        this.licenseArray[j].name == "" ||
        this.licenseArray[j].name == null ||
        this.licenseArray[j].name == undefined
      ) {
        $(".myAlert-top").show();
        this.certificationNameError = "Please enter your Certification Name";
        document.getElementById("certification_name").style.border =
          "1px solid #d50000";
        setTimeout(() => {
          this.certificationNameError = "";
        }, 3000);
      } else if (
        this.licenseArray[j].year == "" ||
        this.licenseArray[j].year == null ||
        this.licenseArray[j].year == undefined
      ) {
        $(".myAlert-top").show();
        this.certificationYearError = "Please enter your certification Year";
        document.getElementById("certification_year").style.border =
          "1px solid #d50000";
        setTimeout(() => {
          this.certificationYearError = "";
        }, 3000);
      }
      // else if(this.files[0]  == null || this.files[0] == undefined){
      //   $(".myAlert-top").show();
      //   this.certificationFileError="Please enter your certification File";
      //   document.getElementById('attachFile_'+ this.licenseArray[j].id).style.border="1px solid #FD4545";
      //   setTimeout(() => {
      //     this.certificationFileError="";
      //   },3000);
      //   }
      else {
        $(".myAlert-top").hide();

        this.secondButtonValue = "Saving";

        if (rowcount == this.licenseArray[j].id) {
          var uploadCondition = "";

          if (this.licenseArray[j].uploadFileFlag == "upload") {
            // Need to call an upload certificate API, if success response comes flag value will be "uploaded" else "upload" .
            var name = this.licenseArray[j].name;
            var year = this.licenseArray[j].year;
            let fileList: FileList = this.fileEvent;

            if (fileList.length > 0) {
              let file: File = fileList[0];
              let formData: FormData = new FormData();
              formData.append("file", file, file.name);
              formData.append("name", name);
              formData.append("year", year);
              this.roasterId = this._cokkieService.get("roaster_id");
              this.userId = this._cokkieService.get('user_id');
              formData.append(
                "api_call",
                "/ro/" + this.roasterId +"/users/" + this.userId + "/certificates"
              );
              formData.append("token", this._cokkieService.get("Auth"));
              this._userService
                .uploadCertificate(formData)
                .subscribe(uploadResult => {
                  if (uploadResult["success"] == true) {
                    $(".myAlert-top").hide();
                    this.secondButtonValue = "Save";
                    this.toastrService.success(
                      "Certificates has been added Succesfully"
                    );
                    this.savedcertificatesArray.push({
                      sid: uploadResult["result"]["id"],
                      sname: name,
                      syear: year,
                      scertattachment: this.licenseArray[j].certattachment,
                      uploadFileFlag: uploadCondition
                    });
                  } else {
                    $(".myAlert-top").hide();
                    if (uploadResult["messages"]["file"] === "required") {
                      this.toastrService.error(
                        "File Required , please upload File"
                      );
                    } else if (uploadResult["messages"]["file"] === "invalid") {
                      this.toastrService.error(
                        "The Uploaded file is Invalid. Please upload specified format"
                      );
                    } else {
                      this.toastrService.error(
                        "There is something went wrong! Please try again later"
                      );
                    }
                    this.secondButtonValue = "Save";
                  }
                });
            }
            uploadCondition = "upload";
          } else {
            uploadCondition = "uploaded";
          }

          //write code to delete the respective id from the licenceArray
          this.licenseArray.splice(j, 1);
          //show the div for saved data
          this.showsaveddatadiv = true;
        }
      }
    }
    if (this.licenseArray.length == 0) {
      this.licenseArray.push({
        id: 1,
        name: "",
        year: "",
        certattachment: "",
        attachFileDiv: true,
        fileTagDiv: false,
        uploadFileFlag: "upload"
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.savedcertificatesArray, event.previousIndex, event.currentIndex);
  }

  //  Function Name : Edit Certificate.
  //Description: This function helps for editing saved certificate.
  editSavedData(rowcount) {
    var newrowcsave = this.addanotherrow + 1;
    this.addanotherrow = newrowcsave;
    for (let y = 0; y < this.savedcertificatesArray.length; y++) {
      if (this.savedcertificatesArray[y].sid == rowcount) {
        this.licenseArray.push({
          id: this.addanotherrow,
          name: this.savedcertificatesArray[y].sname,
          year: this.savedcertificatesArray[y].syear,
          certattachment: this.savedcertificatesArray[y].scertattachment,
          attachFileDiv: false,
          fileTagDiv: true,
          uploadFileFlag: this.savedcertificatesArray[y].uploadFileFlag
        });
        this.savedcertificatesArray.splice(y, 1);
      }
    }
  }

  //  Function Name : Delete Saved Certificate.
  //Description: This function helps for deleting saved certificate.
  deleteSavedData(rowcount) {
    for (let x = 0; x < this.savedcertificatesArray.length; x++) {
      if (rowcount == this.savedcertificatesArray[x]["sid"]) {
        this.savedcertificatesArray.splice(x, 1);
      }
    }
  }

  //  Function Name : Delete Upload File.
  //Description: This function helps for deleting the uploaded file.
  clearFile(rowcount: any) {
    for (let i = 0; i < this.licenseArray.length; i++) {
      if (rowcount == this.licenseArray[i]["id"]) {
        this.licenseArray[i]["attachFileDiv"] = true;
        this.licenseArray[i]["fileTagDiv"] = false;
        this.licenseArray[i]["certattachment"] = "";
      }
    }
  }

  deleteCertificate(certificateId : any){
    if (confirm("Please confirm! you want to delete?") == true){
    this._userService.deleteCertificate(this.roasterId,this.userId,certificateId).subscribe(
      response => {
        if(response['success']==true){
          this.toastrService.success("The selected certificate has been deleted successfully");
          this.getCertificates();
        }
        else{
          this.toastrService.error("Something went wrong while deleting the certificate");
        }
      }
    )
  }
  }

}
