import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Download } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
    selector: 'app-story-card',
    templateUrl: './story-card.component.html',
    styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {
    readonly env = environment;
    @Input() coffeeExperienceLink: any;

    constructor(
        private dialogSrv: DialogService,
        private downloadService: DownloadService,
        private toaster: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {}

    handleCopyCoffeeExperienceLink(): void {
        const textArea = document.createElement('textarea');
        textArea.value = this.coffeeExperienceLink.coffee_story_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand(this.translator.instant('copy'));
        this.toaster.success(this.translator.instant('copied'));
        textArea.remove();
    }

    onDownloadQr() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: this.translator.instant('please_confirm'),
                    desp: this.translator.instant('are_you'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.downloadService.imageDownload(this.coffeeExperienceLink.qr_code_url).subscribe(
                        (res: Download) => {
                            if (res.state === this.translator.instant('done')) {
                                this.toaster.success(this.translator.instant('downloaded_successfully'));
                            }
                        },
                        (error) => {
                            this.toaster.error(this.translator.instant('download_failed'));
                        },
                    );
                }
            });
    }
}
