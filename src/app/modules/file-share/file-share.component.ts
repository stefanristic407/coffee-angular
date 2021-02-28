import { Component, OnInit, ɵɵresolveBody, TemplateRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FileService } from '@services';
import { FileShareService } from './file-share.service';
import * as Plyr from 'plyr';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-file-share',
    templateUrl: './file-share.component.html',
    styleUrls: ['./file-share.component.scss'],
})
export class FileShareComponent implements OnInit {
    breadItems: any[];
    rangeDates: Date[];

    folder_name: string;
    folder_descr: string;
    invite: any = 'Invite people';
    folderNameError: string;
    descriptionError: string;
    roasterId: string;
    pinnedData: any = [];
    files: any;
    fileEvent: any;
    fileName: any;
    folderId: any;
    url: any;
    modalRef: BsModalRef;
    file_id: any;
    company_id: any;
    company_type: any;
    permission: any;
    user_id_value: any;

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    selectedValue: string;
    selectedOption: any;

    typedValue: any;
    usersList: any[] = [];
    appLanguage?: any;
    shareMainActive: any = 0;
    loadId: any;

    constructor(
        public dialogSrv: DialogService,
        public router: Router,
        public toastrService: ToastrService,
        private cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private fileSrv: FileService,
        public fileService: FileShareService,
        public modalService: BsModalService,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.file_share },
        ];

        this.fileService.getPinnedFilesorFolders();
    }

    filterCall() {}

    openVideoModal(template: TemplateRef<any>, item: any) {
        this.modalRef = this.modalService.show(template);
        this.url = item.url;
        const player = new Plyr('#player');
        $('.popup-video').parents('.modal-content').addClass('video-content');
    }

    openUnpinModal(id: any) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    desp: 'You sure you really want to unpin this?',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.fileSrv.unpinFileorFolder(id).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success('Unpinned successfully');
                            this.fileService.getPinnedFilesorFolders();
                        } else {
                            this.toastrService.error('Error while unpinning');
                        }
                    });
                }
            });
    }

    openDownloadModal(template2: TemplateRef<any>, downloadId: any) {
        this.modalRef = this.modalService.show(template2);
        this.loadId = downloadId;
    }

    closePopup() {
        this.modalRef.hide();
    }

    toggleVideo(event: any) {
        event.toElement.play();
    }

    downloadFile(item: any) {
        if (confirm('Please confirm! you want to download?') == true) {
            const a = document.createElement('a');
            a.href = item.url;
            a.download = item.name;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    shareDetails(size: any) {
        this.folderId = size.id;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                folderId: encodeURIComponent(this.folderId),
            },
        };

        this.router.navigate(['/features/file-share-details'], navigationExtras);
    }

    closeCard() {
        var closeCard = document.getElementById('closeId');
        closeCard.classList.add('closeCard');
    }

    myFileUpload(event: any) {
        this.files = event.target.files;
        this.fileEvent = this.files;
        console.log(this.fileEvent);
        this.fileName = this.files[0].name;
        let fileList: FileList = this.fileEvent;
        // var parent_id = 0;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('name', this.fileName);
            formData.append('file_module', 'File-Share');
            formData.append('parent_id', '0');
            this.roasterId = this.cookieService.get('roaster_id');
            formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
            formData.append('token', this.cookieService.get('Auth'));
            this.roasterService.uploadFiles(formData).subscribe((result) => {
                if (result['success'] == true) {
                    this.toastrService.success('The file ' + this.fileName + ' uploaded successfully');
                    this.fileService.getFilesandFolders();
                } else {
                    this.toastrService.error('Error while uploading the file');
                }
            });
        }
    }

    // Open Popup
    popupPrivew(e) {
        var PrivewPopup = document.querySelector('.priview-popup-fileshare');
        var SetImg = PrivewPopup.querySelector('.img');
        var url = e.target.getAttribute('src');
        SetImg.setAttribute('src', url);
        PrivewPopup.classList.add('active');
        document.body.classList.add('popup-open');

        setTimeout(function () {
            PrivewPopup.querySelector('.priview-popup-fileshare__img').classList.add('active');
        }, 50);
    }

    // Close Popup
    popupClose() {
        var PrivewPopup = document.querySelector('.priview-popup-fileshare');
        PrivewPopup.classList.remove('active');
        document.body.classList.remove('popup-open');
        PrivewPopup.querySelector('.priview-popup-fileshare__img').classList.remove('active');
    }
}
