import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService, UserserviceService } from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Download } from '@models';
import { DownloadService } from '@services';

@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html',
    styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
    modalRef: BsModalRef;
    modalRef1: BsModalRef;
    modalRef2: BsModalRef;
    blogResult: string;
    appLanguage?: any;
    imagesListArray: any = [];
    filteredImagesList: any = [];
    videosListArray: any = [];
    filteredVideosList: any = [];
    roasterId: any;

    mediaType = '';
    tabIndex = 0;
    breadItems = [
        { label: 'Home', routerLink: '/roaster-dashboard' },
        { label: 'Farm link' },
        { label: 'Social media posts' },
    ];
    searchKey = '';
    selectedImage: any;
    selectedVideo: any;
    isDownload = false;
    downloadStatus: Download;

    constructor(
        private modalService: BsModalService,
        private route: ActivatedRoute,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
        private router: Router,
        private downloads: DownloadService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    download(socialMediaItem) {
        console.log('download data356: ', socialMediaItem);
        this.isDownload = true;
        if (socialMediaItem.type === 'IMAGE') {
            this.downloads.imageDownload(socialMediaItem.url, socialMediaItem.name, socialMediaItem.mime).subscribe(
                (res: Download) => {
                    console.log('download res: ', res);
                    this.downloadStatus = res;
                    if (this.downloadStatus.progress === 100) {
                        this.isDownload = false;
                    }
                },
                (error) => {
                    this.isDownload = false;
                    console.log('download social error: ', error);
                    this.toastrService.error('Download failed');
                },
            );
        } else {
            this.downloads.download(socialMediaItem.url, socialMediaItem.name, socialMediaItem.mime).subscribe(
                (res: Download) => {
                    console.log('download res: ', res);
                    this.downloadStatus = res;
                    if (this.downloadStatus.progress === 100) {
                        this.isDownload = false;
                    }
                },
                (error) => {
                    this.isDownload = false;
                    console.log('download social error: ', error);
                    this.toastrService.error('Download failed');
                },
            );
        }
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit(): void {
        this.blogResult = decodeURIComponent(this.route.snapshot.queryParams.data);
        this.mediaType = this.route.snapshot.params?.type || '';
        switch (this.mediaType) {
            case 'images' || '':
                this.tabIndex = 0;
                break;
            case 'videos':
                this.tabIndex = 1;
                break;
            case 'blogs':
                this.tabIndex = 2;
                break;
            default:
                break;
        }

        this.globalLanguage();
        this.getSocialImages();
        this.getSocialVideos();
    }

    handleChange(e) {
        this.tabIndex = e.index;
        this.searchKey = '';
        switch (this.tabIndex) {
            case 0:
                this.mediaType = 'images';
                this.filteredImagesList = this.imagesListArray;
                break;
            case 1:
                this.mediaType = 'videos';
                this.filteredVideosList = this.videosListArray;
                break;
            case 2:
                this.mediaType = 'blogs';
                break;
            default:
                break;
        }
        this.router.navigateByUrl(`social-media/media/${this.mediaType}`);
    }

    filterCall() {
        switch (this.tabIndex) {
            case 0:
                this.filteredImagesList = this.imagesListArray.filter((item) => {
                    return item.name.toLowerCase().includes(this.searchKey.toLowerCase());
                });
                break;
            case 1:
                this.filteredVideosList = this.videosListArray.filter((item) => {
                    return item.name.toLowerCase().includes(this.searchKey.toLowerCase());
                });
                break;
            case 2:
                this.mediaType = 'blogs';
                break;
            default:
                break;
        }
    }

    globalLanguage() {
        this.appLanguage = this.globals.languageJson;
    }

    imagesModal(template: TemplateRef<any>, item: any) {
        this.modalRef = this.modalService.show(template);
        this.selectedImage = item;
    }

    videosModal(template: TemplateRef<any>, item: any) {
        this.modalRef1 = this.modalService.show(template);
        this.selectedVideo = item;
    }
    videoPopup(template: TemplateRef<any>) {
        this.modalRef2 = this.modalService.show(template);
    }
    toggleVideo(event: any) {
        event.toElement.play();
    }

    getSocialImages() {
        this.userService.getSocialMediaPosts(this.roasterId, 'IMAGE').subscribe((response: any) => {
            if (response.success === true) {
                this.imagesListArray = response.result;
                this.filteredImagesList = this.imagesListArray;
                console.log('social media', this.imagesListArray);
            } else {
                this.toastrService.error('Error While loading the Images');
            }
        });
    }
    getSocialVideos() {
        this.userService.getSocialMediaPosts(this.roasterId, 'VIDEO').subscribe((response: any) => {
            if (response.success === true) {
                this.videosListArray = response.result;
                this.filteredVideosList = this.videosListArray;
                console.log(this.videosListArray);
            } else {
                this.toastrService.error('Error While loading the Videos');
            }
        });
    }

    copySuccessAlert() {
        this.toastrService.success('Media url is copied');
    }
}
