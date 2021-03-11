import { FileService, UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { RoasteryProfileService } from '../roastery-profile.service';

@Component({
    selector: 'app-sewn-virtual-tour',
    templateUrl: './virtual-tour.component.html',
    styleUrls: ['./virtual-tour.component.scss'],
})
export class VirtualTourComponent implements OnInit {
    tourMedias: any = [];
    roasterId: any;
    isLoading?: boolean;
    isSaveMode: boolean;

    constructor(
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
        private fileService: FileService,
        private toasterService: ToastrService,
        private userService: UserserviceService,
        private cookieService: CookieService,
    ) {}

    async ngOnInit() {
        this.roasterId = this.cookieService.get('roaster_id');
        this.getFiles();
        this.detectMode();
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
        });
    }

    getFiles() {
        this.isLoading = true;
        this.fileService.getAllFiles({ file_module: 'Virtual-Tour', type_in: 'VIDEO,IMAGE' }).subscribe((res) => {
            if (res.success) {
                this.isLoading = false;
                this.tourMedias = res.result;
                console.log('this is tour messages: ', this.tourMedias);
            }
        });
    }

    addFile(data) {
        this.fileService.uploadFiles(data).subscribe((res: any) => {
            if (res.success) {
                this.getFiles();
            } else {
                this.toasterService.error('Failed to upload image');
            }
        });
    }

    handleRemoveMediaFile(id: number): void {
        this.tourMedias = this.tourMedias.filter((item) => item.id !== id);
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
