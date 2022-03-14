import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared';
import { Download } from '@models';
import { AuthService, DownloadService, FileService, GlobalsService, UserService } from '@services';
import { checkFile } from '@utils';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-default-settings',
    templateUrl: './default-settings.component.html',
    styleUrls: ['./default-settings.component.scss'],
})
export class DefaultSettingsComponent implements OnInit {
    @ViewChild('imageUpload') private imageUpload: ElementRef<HTMLElement>;
    @ViewChild('videoUpload') private videoUpload: ElementRef<HTMLElement>;
    isCoffeeDetailsPage = this.activateRoute.snapshot.routeConfig.path !== 'default-settings';
    date1: Date;
    appLanguage?: any;
    coffeeDetailsActive: any = 0;
    roasterId: any;
    defaultDetails: any = {
        description: '',
        website: '',
        tags: [],
        video_id: 0,
        image_id: 0,
    };
    tagOptionList: any = [];
    certificateDetails: any = [];
    certificateLinkItem: any;
    isSent = false;
    fileImage: any;
    fileVideo: any;
    filesCount = 0;
    totalFilesNumber = 0;
    files: any;
    fileEvent: any;
    fileName: string;
    imageFileName: string | Blob;
    materialFileName: any;
    materialFileData: any;
    materialId: any;
    materialUrl: any;
    materialOnResponse = false;
    materialOnRequest = true;
    isFailedToSave?: boolean;
    isSaving?: boolean;
    imageMenuItems: MenuItem[];
    videoMenuItems: MenuItem[];
    certificateMenuItems: MenuItem[];
    materialMenuItems: MenuItem[];
    isImagePreviewPanel = false;
    isVideoPreviewPanel = false;
    coffeeExperienceLink: any;
    orderId: any;
    items = [];
    isEditableMode = false;
    estateBtn = true;
    imageName: any;
    videoName: any;

    constructor(
        private authService: AuthService,
        private fileService: FileService,
        private toastrService: ToastrService,
        private userService: UserService,
        public activateRoute: ActivatedRoute,
        public cookieService: CookieService,
        public dialogSrv: DialogService,
        public downloadService: DownloadService,
        public globals: GlobalsService,
        public location: Location,
        public router: Router,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.setMenuItems();
    }

    ngOnInit(): void {
        this.language();
        if (this.isCoffeeDetailsPage) {
            if (this.activateRoute.snapshot.queryParams.estate_id) {
                this.orderId = decodeURIComponent(this.activateRoute.snapshot.queryParams.estate_id);
            } else if (this.activateRoute.snapshot.queryParams.micro_roasters_id) {
                this.orderId = decodeURIComponent(this.activateRoute.snapshot.queryParams.micro_roasters_id);
            } else if (this.activateRoute.snapshot.queryParams.hrc_id) {
                this.orderId = decodeURIComponent(this.activateRoute.snapshot.queryParams.hrc_id);
            } else if (this.activateRoute.snapshot.queryParams.outtake_orders_id) {
                this.orderId = decodeURIComponent(this.activateRoute.snapshot.queryParams.outtake_orders_id);
            }
            this.getOrderExperience();
        } else {
            this.getDefaultSetting();
            this.getMarketingMaterial();
        }
        this.tagOptionList = [
            { select: false, label: 'Investing locally' },
            { select: false, label: 'Waste management' },
            { select: false, label: 'Happy employees' },
            { select: false, label: 'Circular economy' },
            { select: false, label: 'Fossile free energy' },
            { select: false, label: 'Sustainability' },
            { select: false, label: 'Agroforestry' },
            { select: false, label: 'Reforestation' },
            { select: false, label: 'Pocket friendly' },
        ];
        this.items = [
            { label: this.globals.languageJson.home, routerLink: '/' },
            { label: this.globals.languageJson.brand_experience },
            {
                label: this.globals.languageJson.the_coffee_experience,
                routerLink: '/coffee-experience',
            },
            {
                label: this.isCoffeeDetailsPage
                    ? this.globals.languageJson.orders + ' #' + this.orderId
                    : this.globals.languageJson.default_settings,
            },
        ];
        this.defaultDetails = {
            website: '',
            description: '',
            tags: [],
            video_id: 0,
            image_id: 0,
        };
        this.getGeneralRoasterCertificates();
    }

    setMenuItems(): void {
        this.imageMenuItems = [
            {
                label: 'Replace',
                command: () => {
                    this.updateImage();
                },
            },
            {
                label: 'Delete',
                command: () => {
                    this.deleteImage();
                },
            },
        ];
        this.videoMenuItems = [
            {
                label: 'Replace',
                command: () => {
                    this.updateVideo();
                },
            },
            {
                label: 'Delete',
                command: () => {
                    this.deleteVideo();
                },
            },
        ];
        this.certificateMenuItems = [
            {
                label: 'View',
                command: () => {
                    this.viewCertificate(this.certificateLinkItem);
                },
            },
        ];
        this.materialMenuItems = [
            {
                label: 'Update',
                command: () => {
                    this.updateMarketing();
                },
            },
            {
                label: 'Delete',
                command: () => {
                    this.updateMarketing();
                },
            },
            {
                label: 'Download',
                command: () => {
                    this.downloadMaterialFile();
                },
            },
        ];
    }

    getLink(): string {
        let link: string;
        if (this.activateRoute.snapshot.queryParams.estate_id) {
            link = 'orders';
        } else if (this.activateRoute.snapshot.queryParams.micro_roasters_id) {
            link = 'mr-orders';
        } else if (this.activateRoute.snapshot.queryParams.hrc_id) {
            link = 'hrc-orders';
        } else if (this.activateRoute.snapshot.queryParams.outtake_orders_id) {
            link = 'outtake-orders';
        }
        return link;
    }

    updateImage() {
        const event = new MouseEvent('click', { bubbles: true });
        this.isImagePreviewPanel = false;
        setTimeout(() => {
            this.imageUpload.nativeElement.dispatchEvent(event);
        }, 300);
    }

    updateMarketing() {
        this.materialOnResponse = false;
        setTimeout(() => {
            this.videoUpload.nativeElement.dispatchEvent(event);
        }, 300);
    }

    deleteImage() {
        this.isImagePreviewPanel = false;
        this.fileImage = null;
        this.defaultDetails.image_id = 0;
    }

    updateVideo() {
        const event = new MouseEvent('click', { bubbles: true });
        this.isVideoPreviewPanel = false;
        setTimeout(() => {
            this.videoUpload.nativeElement.dispatchEvent(event);
        }, 300);
    }

    deleteVideo() {
        this.isVideoPreviewPanel = false;
        this.fileVideo = null;
        this.defaultDetails.video_id = 0;
    }

    getOrderExperience() {
        if (this.activateRoute.snapshot.queryParams.estate_id) {
            this.userService
                .getEstateOrdersCoffeeExperience(this.roasterId, this.orderId)
                .subscribe((response: any) => {
                    if (response.success) {
                        this.setPageData(response);
                    } else {
                        this.getDefaultSetting();
                    }
                });
            this.userService.getCoffeeStory(this.roasterId, this.orderId, 'orders').subscribe((rep: any) => {
                if (rep.success) {
                    this.coffeeExperienceLink = rep.result;
                }
            });
        } else if (this.activateRoute.snapshot.queryParams.micro_roasters_id) {
            this.userService.getMrOrdersCoffeeExperience(this.roasterId, this.orderId).subscribe((response: any) => {
                if (response.success) {
                    this.setPageData(response);
                } else {
                    this.getDefaultSetting();
                }
            });
            this.userService.getCoffeeStory(this.roasterId, this.orderId, 'mr-orders').subscribe((res: any) => {
                if (res.success) {
                    this.coffeeExperienceLink = res.result;
                }
            });
        } else if (this.activateRoute.snapshot.queryParams.hrc_id) {
            this.userService.getHrcOrdersCoffeeExperience(this.roasterId, this.orderId).subscribe((response: any) => {
                if (response.success) {
                    this.setPageData(response);
                } else {
                    this.getDefaultSetting();
                }
            });
            this.userService.getCoffeeStory(this.roasterId, this.orderId, 'hrc-orders').subscribe((rep: any) => {
                if (rep.success) {
                    this.coffeeExperienceLink = rep.result;
                }
            });
        } else if (this.activateRoute.snapshot.queryParams.outtake_orders_id) {
            this.userService
                .getOuttakeOrdersCoffeeExperience(this.roasterId, this.orderId)
                .subscribe((response: any) => {
                    if (response.success) {
                        this.setPageData(response);
                    } else {
                        this.getDefaultSetting();
                    }
                });
            this.userService.getCoffeeStory(this.roasterId, this.orderId, 'outtake-orders').subscribe((rep: any) => {
                if (rep.success) {
                    this.coffeeExperienceLink = rep.result;
                }
            });
        }
    }

    getDefaultSetting() {
        this.userService.getDefaultCoffeeExperience(this.roasterId).subscribe((response: any) => {
            if (response.success) {
                this.setPageData(response);
            }
        });
    }

    setPageData(response: any): void {
        this.defaultDetails = response.result;
        if (this.defaultDetails.image_url) {
            this.isImagePreviewPanel = true;
        }
        if (this.defaultDetails.video_url) {
            this.isVideoPreviewPanel = true;
        }
        if (this.defaultDetails && this.defaultDetails.tags && this.defaultDetails.tags.length) {
            this.tagOptionList.map((item: any) => {
                item.select = !!this.defaultDetails.tags.find((tag: any) => tag === item.label);
                return item;
            });
        }
    }

    getGeneralRoasterCertificates() {
        this.userService.getGeneralRoasterCertificates(this.roasterId).subscribe((response: any) => {
            if (response.success === true) {
                this.certificateDetails = response.result;
            } else {
                this.toastrService.error('Error while getting certificates');
            }
        });
    }

    getMarketingMaterial() {
        this.userService.getMarketingMaterials(this.roasterId).subscribe((response: any) => {
            if (response.success) {
                response.result = (response.result || []).find(
                    (item) =>
                        item.mime === 'application/zip' ||
                        item.mime === 'application/rar' ||
                        item.mime === 'application/7zip',
                );
                this.materialUrl = response.result?.url;
                this.materialFileName = response.result?.name;
                this.materialOnRequest = false;
                this.materialOnResponse = true;
            } else {
                this.materialOnRequest = true;
                this.materialOnResponse = false;
            }
        });
    }

    onChangeTag(index: number): void {
        if (!this.isEditableMode) {
            return;
        }
        if (this.tagOptionList.filter((item: any) => item.select).length >= 5 && !this.tagOptionList[index].select) {
            return;
        }
        this.tagOptionList[index].select = !this.tagOptionList[index].select;
    }

    viewCertificate(item: any): void {
        const a = document.createElement('a');
        a.href = item.public_url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    mobileViewCertificate(item: any): void {
        this.certificateLinkItem = item;
    }

    onChooseFile(target: any, parameter: string) {
        this.fileImage = null;
        this.fileVideo = null;
        const file: File = target.files[0];
        if (!file) {
            return;
        }
        this[parameter] = file;
        this.totalFilesNumber = 0;
        this.filesCount = 0;
        const fsize = file.size;
        if (Math.round(fsize / 1024) >= 1024 * 30) {
            this.toastrService.error('File size must be less than 30 mb');
            return;
        }

        const files = target.files;
        if (files.length > 0) {
            checkFile(file).subscribe((fileError) => {
                if (fileError) {
                    this.toastrService.error(fileError.message);
                } else {
                    if (this.fileVideo) {
                        this.totalFilesNumber++;
                        const formData = new FormData();
                        formData.append('file', this.fileVideo);
                        formData.append('name', file.name);
                        formData.append('file_module', 'Coffee-Story');

                        this.fileService.uploadFiles(formData).subscribe(
                            (res: any) => {
                                this.videoName = file.name;
                                this.defaultDetails.video_id = res.result?.id;
                                this.defaultDetails.video_url = res.result?.url;
                                this.filesCount++;
                                if (this.filesCount === this.totalFilesNumber) {
                                    this.isVideoPreviewPanel = true;
                                    this.toastrService.success('Video update successfully');
                                }
                            },
                            () => {
                                this.handleFailedToSaveData();
                                return;
                            },
                        );
                        target.value = '';
                    }

                    if (this.fileImage) {
                        this.totalFilesNumber++;
                        const formData = new FormData();
                        formData.append('file', this.fileImage);
                        formData.append('name', file.name);
                        formData.append('file_module', 'Coffee-Story');

                        this.fileService.uploadFiles(formData).subscribe(
                            (res: any) => {
                                if (res.success) {
                                    this.imageName = file.name;
                                    this.defaultDetails.image_id = res.result?.id;
                                    this.defaultDetails.image_url = res.result.url;
                                    this.filesCount++;
                                    if (this.filesCount === this.totalFilesNumber) {
                                        this.isImagePreviewPanel = true;
                                        this.toastrService.success('Image update successfully');
                                    }
                                }
                            },
                            (err) => {
                                this.handleFailedToSaveData();
                                return;
                            },
                        );
                    }
                    target.value = '';
                }
            });
        }
    }

    onCancel(): void {
        this.isEditableMode = false;
    }

    onSave() {
        this.isSent = true;
        if (!this.defaultDetails.description) {
            this.toastrService.error('Please enter the description');
            return false;
        } else if (this.defaultDetails.description && this.defaultDetails.description.split(' ').length > 250) {
            this.toastrService.error('Description is long');
            return false;
        }
        this.isFailedToSave = false;
        this.isSaving = true;
        this.handleSaveData();
    }

    handleFailedToSaveData(): void {
        if (!this.isFailedToSave) {
            this.toastrService.error('Error while uploading the file');
            this.isFailedToSave = true;
            this.isSaving = false;
        }
    }

    handleSaveData(): void {
        const data = {
            website: this.defaultDetails.website,
            description: this.defaultDetails.description,
            tags: this.tagOptionList.filter((item: any) => item.select).map((item: any) => item.label),
            image_id: this.defaultDetails.image_id,
            video_id: this.defaultDetails.video_id,
        };
        if (this.activateRoute.snapshot.queryParams.micro_roasters_id) {
            this.userService.postMrOrdersCoffeeExperience(this.roasterId, this.orderId, data).subscribe(
                (res: any) => {
                    this.isSaving = false;
                    if (res.success) {
                        this.handleAfterSuccess();
                    } else {
                        this.toastrService.error('Error while saving the details');
                    }
                },
                (err) => {
                    this.isSaving = false;
                    this.toastrService.error('Error while saving the details');
                },
            );
        } else if (this.activateRoute.snapshot.queryParams.hrc_id) {
            this.userService.postHrcOrdersCoffeeExperience(this.roasterId, this.orderId, data).subscribe(
                (res: any) => {
                    this.isSaving = false;
                    if (res.success) {
                        this.handleAfterSuccess();
                    } else {
                        this.toastrService.error('Error while saving the details');
                    }
                },
                (err) => {
                    this.isSaving = false;
                    this.toastrService.error('Error while saving the details');
                },
            );
        } else if (this.activateRoute.snapshot.queryParams.outtake_orders_id) {
            this.userService.postOuttakeOrdersCoffeeExperience(this.roasterId, this.orderId, data).subscribe(
                (res: any) => {
                    this.isSaving = false;
                    if (res.success) {
                        this.handleAfterSuccess();
                    } else {
                        this.toastrService.error('Error while saving the details');
                    }
                },
                (err) => {
                    this.isSaving = false;
                    this.toastrService.error('Error while saving the details');
                },
            );
        } else {
            this.userService.postDefaultCoffeeExperienceDetail(this.roasterId, data).subscribe(
                (res: any) => {
                    this.isSaving = false;
                    if (res.success) {
                        this.handleAfterSuccess();
                    } else {
                        this.toastrService.error('Error while saving the details');
                    }
                },
                (err) => {
                    this.isSaving = false;
                    this.toastrService.error('Error while saving the details');
                },
            );
        }
    }

    uploadMarketingMaterial(event: any) {
        this.files = event.target.files;
        this.fileEvent = this.files;
        this.materialFileName = this.files[0].name;
        const fileList: FileList = this.fileEvent;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('file_module', 'marketing-materials');
            this.fileService.uploadFiles(formData).subscribe((result) => {
                if (result.success) {
                    this.toastrService.success('The file ' + this.materialFileName + ' uploaded successfully');
                    this.materialFileData = result.result;
                    this.materialId = result.result.id;
                    this.materialUrl = result.result.url;
                    this.materialOnResponse = true;
                    this.materialOnRequest = false;
                } else {
                    this.toastrService.error('Error while uploading the file');
                }
            });
        }
        event.target.value = '';
    }

    downloadMaterialFile() {
        window.open(this.materialUrl);
    }

    handleAfterSuccess(): void {
        this.isEditableMode = false;
        this.toastrService.success('Details saved successfully');
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.coffeeDetailsActive++;
    }

    handleCopyCoffeeExperienceLink(): void {
        const textArea = document.createElement('textarea');
        textArea.value = this.coffeeExperienceLink.coffee_story_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
        this.toastrService.success('Copied link successfully');
    }

    onDownloadQr() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Please confirm!',
                    desp: 'Are you sure want to download',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.downloadService
                        .imageDownload(this.coffeeExperienceLink.qr_code_url, 'exp-qr-code.svg')
                        .subscribe(
                            (res: Download) => {
                                if (res.state === 'DONE') {
                                    this.toastrService.success('Downloaded successfully');
                                }
                            },
                            (error) => {
                                this.toastrService.error('Download failed');
                            },
                        );
                }
            });
    }
}
