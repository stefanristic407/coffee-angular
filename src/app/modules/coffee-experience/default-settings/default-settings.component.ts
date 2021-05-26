import { Component, OnInit } from '@angular/core';
import { DownloadService, GlobalsService, RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@app/shared';
import { Download } from '@models';

@Component({
    selector: 'app-default-settings',
    templateUrl: './default-settings.component.html',
    styleUrls: ['./default-settings.component.scss'],
})
export class DefaultSettingsComponent implements OnInit {
    isCoffeeDetailsPage = this.route.snapshot.routeConfig.path !== 'default-settings';
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
    isSent = false;
    fileImage: any;
    fileVideo: any;
    filesCount = 0;
    totalFilesNumber = 0;
    fileVideoId?: number;
    fileImageId?: number;
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
    constructor(
        public router: Router,
        public globals: GlobalsService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public route: ActivatedRoute,
        public location: Location,
        public dialogSrv: DialogService,
        public downloadService: DownloadService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.setMenuItems();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            if (params.edit) {
                this.estateBtn = false;
            } else {
                this.estateBtn = true;
            }
        });
        this.language();
        this.getMarketingMaterial();
        if (this.isCoffeeDetailsPage) {
            if (this.route.snapshot.queryParams.estate_id) {
                this.orderId = decodeURIComponent(this.route.snapshot.queryParams.estate_id);
            } else if (this.route.snapshot.queryParams.micro_roasters_id) {
                this.orderId = decodeURIComponent(this.route.snapshot.queryParams.micro_roasters_id);
            } else if (this.route.snapshot.queryParams.hrc_id) {
                this.orderId = decodeURIComponent(this.route.snapshot.queryParams.hrc_id);
            } else if (this.route.snapshot.queryParams.outtake_orders_id) {
                this.orderId = decodeURIComponent(this.route.snapshot.queryParams.outtake_orders_id);
            }
            this.getOrderExperience();
        } else {
            this.getDefaultSetting();
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
            { label: this.globals.languageJson.home, routerLink: '/features/welcome-aboard' },
            { label: this.globals.languageJson.brand_experience },
            { label: this.globals.languageJson.the_coffee_experience, routerLink: '/coffee-experience' },
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
        this.materialMenuItems = [
            {
                label: 'Download',
                command: () => {
                    this.downloadMaterialFile();
                },
            },
        ];
        this.getGeneralRoasterCertificates();
    }

    setMenuItems(): void {
        this.imageMenuItems = [
            {
                label: 'Update',
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
                label: 'Update',
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
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {},
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {},
            },
        ];
    }

    updateImage() {
        this.isImagePreviewPanel = false;
    }

    deleteImage() {
        this.isImagePreviewPanel = false;
        this.defaultDetails.image_id = 0;
    }

    updateVideo() {
        this.isVideoPreviewPanel = false;
    }

    deleteVideo() {
        this.isVideoPreviewPanel = false;
        this.defaultDetails.video_id = 0;
    }

    getOrderExperience() {
        if (this.route.snapshot.queryParams.estate_id) {
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
        } else if (this.route.snapshot.queryParams.micro_roasters_id) {
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
        } else if (this.route.snapshot.queryParams.hrc_id) {
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
        } else if (this.route.snapshot.queryParams.outtake_orders_id) {
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
            } else {
                this.toastrService.error('Error while getting the Default settings of the Roaster');
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
                response.result = response.result.find(
                    (item) =>
                        item.mime === 'application/zip' ||
                        item.mime === 'application/rar' ||
                        item.mime === 'application/7zip',
                );
                this.materialUrl = response.result.url;
                this.materialFileName = response.result.name;
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

    viewCertificate(item) {
        const a = document.createElement('a');
        a.href = item.public_url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onChooseFile(target: any, parameter: string) {
        const file = target.files[0];
        if (!file) {
            return;
        }
        this[parameter] = file;
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
            if (parameter === 'fileVideo') {
                this.isVideoPreviewPanel = true;
                this.defaultDetails.video_url = event.target.result;
            } else {
                this.isImagePreviewPanel = true;
                this.defaultDetails.image_url = event.target.result;
            }
        };
    }

    onCancel(): void {
        this.isEditableMode = false;
    }

    onSave() {
        this.isSent = true;
        if (!this.defaultDetails.description) {
            return false;
        }
        this.isFailedToSave = false;
        this.isSaving = true;
        this.totalFilesNumber = 0;
        this.filesCount = 0;
        if (this.fileVideo) {
            this.totalFilesNumber++;
        }
        if (this.fileImage) {
            this.totalFilesNumber++;
        }
        if (this.fileVideo) {
            this.userService.uploadFile(this.roasterId, this.fileVideo, 'Coffee-Story').subscribe(
                (res: any) => {
                    this.fileVideoId = res.result?.id;
                    this.filesCount++;
                    if (this.filesCount === this.totalFilesNumber) {
                        this.handleSaveData();
                        this.toastrService.success('Video update successfully');
                    }
                },
                () => {
                    this.handleFailedToSaveData();
                    return;
                },
            );
        }
        if (this.fileImage) {
            this.userService.uploadFile(this.roasterId, this.fileImage, 'Coffee-Story').subscribe(
                (res: any) => {
                    this.fileImageId = res.result?.id;
                    this.filesCount++;
                    if (this.filesCount === this.totalFilesNumber) {
                        this.handleSaveData();
                        this.toastrService.success('Image update successfully');
                    }
                },
                () => {
                    this.handleFailedToSaveData();
                    return;
                },
            );
        }
        if (!this.totalFilesNumber) {
            this.handleSaveData();
        }
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
            image_id: this.fileImageId || this.defaultDetails.image_id,
            video_id: this.fileVideoId || this.defaultDetails.video_id,
        };
        if (this.route.snapshot.queryParams.micro_roasters_id) {
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
        } else if (this.route.snapshot.queryParams.hrc_id) {
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
        } else if (this.route.snapshot.queryParams.outtake_orders_id) {
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
            this.userService.uploadFile(this.roasterId, file, 'marketing-materials').subscribe((result) => {
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
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.downloadService.imageDownload(this.coffeeExperienceLink.qr_code_url).subscribe(
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
