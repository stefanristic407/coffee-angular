import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GlobalsService } from '@services';

declare var $: any;

@Component({
    selector: 'app-roastery-license',
    templateUrl: './roastery-license.component.html',
    styleUrls: ['./roastery-license.component.scss'],
})
export class RoasteryLicenseComponent implements OnInit {
    public licenseArray: any = [];
    public addanotherrow: number;
    licenseDetails: any;
    public fileEvent: any;
    public savedcertificatesArray: any = [];
    public showsaveddatadiv = false;
    fileName: string;
    files: FileList;
    roasterId: any;
    certificationNameError: string;
    certificationYearError: string;
    // certificationFileError: string;
    secondButtonValue: any;
    termStatus: any;
    showRelavant = true;
    userId: any;
    appLanguage?: any;
    years = [
        { label: '2020', value: '2020' },
        { label: '2019', value: '2019' },
        { label: '2018', value: '2018' },
        { label: '2017', value: '2017' },
        { label: '2016', value: '2016' },
        { label: '2015', value: '2015' },
        { label: '2014', value: '2014' },
        { label: '2013', value: '2013' },
        { label: '2012', value: '2012' },
        { label: '2011', value: '2011' },
        { label: '2010', value: '2010' },
        { label: '2009', value: '2009' },
        { label: '2008', value: '2008' },
        { label: '2007', value: '2007' },
        { label: '2006', value: '2006' },
        { label: '2005', value: '2005' },
        { label: '2004', value: '2004' },
        { label: '2004', value: '2004' },
        { label: '2003', value: '2003' },
        { label: '2002', value: '2002' },
        { label: '2001', value: '2001' },
        { label: '2000', value: '2000' },
        { label: '1999', value: '1999' },
        { label: '1998', value: '1998' },
        { label: '1997', value: '1997' },
        { label: '1996', value: '1996' },
        { label: '1995', value: '1995' },
        { label: '1994', value: '1994' },
        { label: '1993', value: '1993' },
        { label: '1992', value: '1992' },
        { label: '1991', value: '1991' },
        { label: '1990', value: '1990' },
        { label: '1989', value: '1989' },
        { label: '1988', value: '1988' },
        { label: '1987', value: '1987' },
        { label: '1986', value: '1986' },
        { label: '1985', value: '1985' },
        { label: '1984', value: '1984' },
        { label: '1983', value: '1983' },
        { label: '1982', value: '1982' },
        { label: '1981', value: '1981' },
        { label: '1980', value: '1980' },
    ];

    constructor(
        private cokkieService: CookieService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
    ) {
        this.termStatus = 'Only me';
        this.licenseArray.push({
            id: 1,
            name: '',
            year: '',
            certattachment: '',
            attachFileDiv: true,
            fileTagDiv: false,
            uploadFileFlag: 'upload',
        });
        this.addanotherrow = this.licenseArray.length;
        this.roasterId = this.cokkieService.get('roaster_id');
        this.userId = this.cokkieService.get('user_id');
        this.certificationNameError = '';
        this.certificationYearError = '';
    }

    ngOnInit(): void {
        this.savedcertificatesArray = [];
        this.showsaveddatadiv = false;
        this.secondButtonValue = 'Save';
        this.getCertificates();
        this.appLanguage = this.globals.languageJson;
    }

    getCertificates() {
        this.userService.getCompanyCertificates(this.roasterId).subscribe((data: any) => {
            if (data.success) {
                this.showsaveddatadiv = true;
                this.savedcertificatesArray = data.result;
                console.log(this.savedcertificatesArray);
            }
        });
    }

    setStatus(term: any) {
        this.termStatus = term;
    }

    toggleRelavant() {
        this.showRelavant = !this.showRelavant;
    }

    //  Function Name : File Open.
    // Description: This function open file explorer.
    onFileChange(event, rowcount: any) {
        this.files = event.target.files;
        this.fileEvent = this.files;
        console.log(this.fileEvent);
        if (this.files.length > 0) {
            for (let x = 0; x <= this.files.length - 1; x++) {
                const fsize = this.files.item(x).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toastrService.error('File too big, please select a file smaller than 2mb');
                } else {
                    this.fileName = this.files[0].name;
                    for (const license of this.licenseArray) {
                        if (rowcount === license.id) {
                            license.attachFileDiv = false;
                            license.fileTagDiv = true;
                            license.certattachment =
                                this.fileName.substring(0, 5) + '... .' + this.fileName.split('.').pop();
                            license.uploadFileFlag = 'upload';
                        }
                    }
                }
            }
        }
    }

    //  Function Name : Add Certificate.
    // Description: This function helps for adding new row for certificate.
    addnewrow() {
        const newrowc = this.addanotherrow + 1;
        this.addanotherrow = newrowc;
        this.licenseArray.push({
            id: this.addanotherrow,
            name: '',
            year: '',
            certattachment: '',
            attachFileDiv: true,
            fileTagDiv: false,
            uploadFileFlag: 'upload',
        });
        // this.licenseArray.push(this.licenseArray.length);
    }

    //  Function Name : Delete Certificate.
    // Description: This function helps for deleting certificate.
    delete(rowcount) {
        for (let i = 1; i < this.licenseArray.length; i++) {
            if (rowcount === this.licenseArray[i].id) {
                this.licenseArray.splice(i, 1);
            }
        }
    }

    //  Function Name : Save Certificate.
    // Description: This function helps for saving certificate.
    savecertificate(rowcount, event) {
        for (let j = 0; j < this.licenseArray.length; j++) {
            if (this.licenseArray[j].name === '' && this.licenseArray[j].year === '') {
                $('.myAlert-top').show();
                this.certificationNameError = 'Please Fill the mandatory Fields';
                this.certificationYearError = 'Please Fill the mandatory Fields';
                document.getElementById('certification_name').style.border = '1px solid #d50000';
                document.getElementById('certification_year').style.border = '1px solid #d50000';
                setTimeout(() => {
                    this.certificationNameError = '';
                    this.certificationYearError = '';
                }, 3000);
            } else if (
                this.licenseArray[j].name === '' ||
                this.licenseArray[j].name == null ||
                this.licenseArray[j].name === undefined
            ) {
                $('.myAlert-top').show();
                this.certificationNameError = 'Please enter your Certification Name';
                document.getElementById('certification_name').style.border = '1px solid #d50000';
                setTimeout(() => {
                    this.certificationNameError = '';
                }, 3000);
            } else if (
                this.licenseArray[j].year === '' ||
                this.licenseArray[j].year === null ||
                this.licenseArray[j].year === undefined
            ) {
                $('.myAlert-top').show();
                this.certificationYearError = 'Please enter your certification Year';
                document.getElementById('certification_year').style.border = '1px solid #d50000';
                setTimeout(() => {
                    this.certificationYearError = '';
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
                $('.myAlert-top').hide();

                this.secondButtonValue = 'Saving';

                if (rowcount === this.licenseArray[j].id) {
                    let uploadCondition = '';

                    if (this.licenseArray[j].uploadFileFlag === 'upload') {
                        // Need to call an upload certificate API, if success response comes flag value will be "uploaded" else "upload" .
                        const name = this.licenseArray[j].name;
                        const year = this.licenseArray[j].year;
                        const fileList: FileList = this.fileEvent;

                        if (fileList.length > 0) {
                            const file: File = fileList[0];
                            const formData: FormData = new FormData();
                            formData.append('file', file, file.name);
                            formData.append('name', name);
                            formData.append('year', year);
                            this.roasterId = this.cokkieService.get('roaster_id');
                            formData.append('api_call', '/ro/' + this.roasterId + '/certificates');
                            formData.append('token', this.cokkieService.get('Auth'));
                            this.userService.uploadCertificate(formData).subscribe((uploadResult: any) => {
                                if (uploadResult.success === true) {
                                    $('.myAlert-top').hide();
                                    this.secondButtonValue = 'Save';
                                    this.toastrService.success('Certificates has been added Succesfully');
                                    this.savedcertificatesArray.push({
                                        sid: uploadResult.result.id,
                                        sname: name,
                                        syear: year,
                                        scertattachment: this.licenseArray[j].certattachment,
                                        uploadFileFlag: uploadCondition,
                                    });
                                } else {
                                    $('.myAlert-top').hide();
                                    if (uploadResult.messages.file === 'required') {
                                        this.toastrService.error('File Required , please upload File');
                                    } else if (uploadResult.messages.file === 'invalid') {
                                        this.toastrService.error(
                                            'The Uploaded file is Invalid. Please upload specified format',
                                        );
                                    } else {
                                        this.toastrService.error(
                                            'There is something went wrong! Please try again later',
                                        );
                                    }
                                    this.secondButtonValue = 'Save';
                                }
                            });
                        }
                        uploadCondition = 'upload';
                    } else {
                        uploadCondition = 'uploaded';
                    }

                    // write code to delete the respective id from the licenceArray
                    this.licenseArray.splice(j, 1);
                    // show the div for saved data
                    this.showsaveddatadiv = true;
                }
            }
        }
        if (this.licenseArray.length === 0) {
            this.licenseArray.push({
                id: 1,
                name: '',
                year: '',
                certattachment: '',
                attachFileDiv: true,
                fileTagDiv: false,
                uploadFileFlag: 'upload',
            });
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.savedcertificatesArray, event.previousIndex, event.currentIndex);
    }

    //  Function Name : Edit Certificate.
    // Description: This function helps for editing saved certificate.
    editSavedData(rowcount) {
        const newrowcsave = this.addanotherrow + 1;
        this.addanotherrow = newrowcsave;
        for (let y = 0; y < this.savedcertificatesArray.length; y++) {
            if (this.savedcertificatesArray[y].sid === rowcount) {
                this.licenseArray.push({
                    id: this.addanotherrow,
                    name: this.savedcertificatesArray[y].sname,
                    year: this.savedcertificatesArray[y].syear,
                    certattachment: this.savedcertificatesArray[y].scertattachment,
                    attachFileDiv: false,
                    fileTagDiv: true,
                    uploadFileFlag: this.savedcertificatesArray[y].uploadFileFlag,
                });
                this.savedcertificatesArray.splice(y, 1);
            }
        }
    }

    //  Function Name : Delete Saved Certificate.
    // Description: This function helps for deleting saved certificate.
    deleteSavedData(rowcount) {
        for (let x = 0; x < this.savedcertificatesArray.length; x++) {
            if (rowcount === this.savedcertificatesArray[x].sid) {
                this.savedcertificatesArray.splice(x, 1);
            }
        }
    }

    //  Function Name : Delete Upload File.
    // Description: This function helps for deleting the uploaded file.
    clearFile(rowcount: any) {
        for (const license of this.licenseArray) {
            if (rowcount === license.id) {
                license.attachFileDiv = true;
                license.fileTagDiv = false;
                license.certattachment = '';
            }
        }
    }

    deleteCertificate(certificateId: any) {
        if (confirm('Please confirm! you want to delete?') === true) {
            this.userService.deleteCompanyCertificate(this.roasterId, certificateId).subscribe((response: any) => {
                if (response.success === true) {
                    this.toastrService.success('The selected certificate has been deleted successfully');
                    this.getCertificates();
                } else {
                    this.toastrService.error('Something went wrong while deleting the certificate');
                }
            });
        }
    }
}
