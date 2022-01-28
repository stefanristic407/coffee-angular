import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DUMMY_BLOGS } from '@constants';
import { FileType } from '@enums';
import { Download } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html',
    styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('brand_experience') },
        { label: this.translator.instant('social_pr') },
    ];
    imagesListArray: any = [];
    selectedImage: any;
    mediaType = '';
    tabIndex = 0;
    blogs = DUMMY_BLOGS;

    showImageModal = false;

    constructor(
        private downloads: DownloadService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {}

    download(socialMediaItem) {
        if (socialMediaItem.type === FileType.IMAGE) {
            this.downloads
                .imageDownload(socialMediaItem.url, socialMediaItem.name, socialMediaItem.mime)
                .subscribe((res: Download) => {});
        } else {
            this.downloads
                .download(socialMediaItem.url, socialMediaItem.name, socialMediaItem.mime)
                .subscribe((res: Download) => {});
        }
    }

    ngOnInit(): void {
        this.mediaType = this.route.snapshot.params?.type || '';
        switch (this.mediaType) {
            case 'images' || '':
                this.tabIndex = 0;
                break;
            case 'blogs':
                this.tabIndex = 1;
                break;
        }

        this.getSocialImages();
    }

    handleChange(e) {
        this.tabIndex = e.index;
        switch (this.tabIndex) {
            case 0:
                this.mediaType = 'images';
                break;
            case 1:
                this.mediaType = 'blogs';
                break;
        }
        this.router.navigateByUrl(`social-media/media/${this.mediaType}`);
    }

    imagesModal(item: any) {
        this.selectedImage = item;
        this.showImageModal = true;
    }

    getSocialImages() {
        this.userService.getSocialMediaPosts(FileType.IMAGE).subscribe((response: any) => {
            if (response.success === true) {
                this.imagesListArray = response.result;
            } else {
                this.toastrService.error('Error While loading the Images');
            }
        });
    }
}
