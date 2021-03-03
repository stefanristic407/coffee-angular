import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { YourServicesService } from '@services';
import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'sewn-virtual-tour',
    templateUrl: './virtual-tour.component.html',
    styleUrls: ['./virtual-tour.component.scss'],
})
export class VirtualTourComponent implements OnInit {
    appLanguage: any;
    tourImages: any = [];
    roasterId: any;
    isLoading?: boolean;

    constructor(
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
        private yourService: YourServicesService,
        private toasterService: ToastrService,
        private userService: UserserviceService,
        private cookieService: CookieService,
    ) {}

    async ngOnInit() {
        const lang = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en';
        this.globals.languageJson = await this.userService.getLanguageStrings(lang);
        this.appLanguage = this.globals.languageJson;
        this.getFiles();
        this.roasterId = this.cookieService.get('roaster_id');
    }

    getFiles() {
        this.isLoading = true;
        this.yourService.getMyFiles().subscribe((res) => {
            if (res.success) {
                this.isLoading = false;
                this.tourImages = res.result;
            }
        });
    }

    addFile(data) {
        this.yourService.addFile(data).subscribe((res) => {
            if (res.success) {
                this.getFiles();
            } else {
                this.toasterService.error('Failed to upload image');
            }
        });
    }

    handleRemoveMediaFile(id: number): void {
        console.log('id >>>>>>>>>>>', id);
        this.tourImages = this.tourImages.filter((item) => item.id !== id);
        this.userService.deleteFile(this.roasterId, id).subscribe();
    }

    handleFile(e) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toasterService.error('File too big, please select a file smaller than 2mb');
                } else {
                    const image = e.target.files[0];
                    const File = new FormData();
                    File.append(
                        'name',
                        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    );
                    File.append('file', image);
                    File.append('file_module', 'Virtual-Tour');
                    this.addFile(File);
                }
            }
        }
    }
}
