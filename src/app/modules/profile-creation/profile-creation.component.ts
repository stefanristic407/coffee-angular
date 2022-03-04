import { Component, OnDestroy, OnInit } from '@angular/core';
import { CroppedImage } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services';
import { CropperDialogComponent } from '@shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfileCreationService } from './profile-creation.service';

@Component({
    selector: 'app-profile-creation',
    templateUrl: './profile-creation.component.html',
    styleUrls: ['./profile-creation.component.scss'],
})
export class ProfileCreationComponent implements OnInit, OnDestroy {
    menuItems = [
        { label: 'about_roastery', routerLink: './about_roastery' },
        { label: 'virtual_tour', routerLink: './virtual_tour' },
        { label: 'contact', routerLink: './contact' },
        { label: 'reviews', routerLink: './reviews' },
    ];
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('profile') },
    ];
    isSaveMode: boolean;
    hasSystemRole = false;

    constructor(
        private authService: AuthService,
        private dialogService: DialogService,
        private translator: TranslateService,
        public profileCreationService: ProfileCreationService,
    ) {}

    ngOnInit(): void {
        this.detectMode();
        this.hasSystemRole = this.authService.hasSystemRole;
    }

    ngOnDestroy() {
        this.profileCreationService.saveMode.next(false);
    }

    detectMode() {
        this.profileCreationService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (this.isSaveMode) {
                this.profileCreationService.bannerUrl = this.profileCreationService.organizationProfile?.banner_url;
            } else {
                this.profileCreationService.bannerFile = null;
                this.profileCreationService.bannerUrl = '';
            }
        });
    }

    handleProfileFile(event) {
        if (!event.target.files?.length) {
            return;
        }
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageChangedEvent: event,
                    resizeToWidth: 256,
                    resizeToHeight: 256,
                    roundCropper: true,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data?.status) {
                    this.profileCreationService.orgImgPrevUrl = data.croppedImgUrl;
                    this.profileCreationService.orgImgCroppedFile = data.croppedImgFile;
                }
            });
    }

    handleBannerFile(event: any): void {
        if (!event.target.files?.length) {
            return;
        }
        this.dialogService
            .open(CropperDialogComponent, {
                data: {
                    imageChangedEvent: event,
                    aspectRatio: 1144 / 190,
                    resizeToWidth: 1144,
                },
            })
            .onClose.subscribe((data: CroppedImage) => {
                if (data?.status) {
                    this.profileCreationService.bannerUrl = data.croppedImgUrl;
                    this.profileCreationService.bannerFile = data.croppedImgFile;
                }
            });
    }

    handleDeleteBannerImage(): void {
        this.profileCreationService.bannerUrl = '';
    }
}
