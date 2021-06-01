import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT) private doc: Document,
        public updates: SwUpdate,
        private cookieService: CookieService,
    ) {
        if (updates.isEnabled) {
            interval(60).subscribe(() => updates.checkForUpdate().then(() => console.log('checking for updates')));
        }
    }

    ngOnInit() {
        const dynamicScripts = [];
        if (environment.production) {
            dynamicScripts.push('https://www.bugherd.com/sidebarv2.js?apikey=tm7bqtpbmlhxkgxgen68xg');
            dynamicScripts.push('https://cmp.osano.com/6olZFSThsdZWqs/d3243605-8fd0-446a-9b25-a172e9ae3d67/osano.js');
        }

        for (const value of dynamicScripts) {
            const node = this.doc.createElement('script');
            node.src = value;
            node.type = 'text/javascript';
            node.async = true;
            this.doc.getElementsByTagName('head')[0].appendChild(node);
        }
        this.checkForUpdates();
        this.checkVersion();
    }

    public checkForUpdates(): void {
        console.log('checkForUpdates');
        this.updates.available.subscribe((event) => {
            console.log('Service worker:', event);
            this.promptUser();
        });
    }

    private checkVersion() {
        let vCookie = this.cookieService.get('version');

        if (!vCookie || vCookie !== environment.version) {
            this.cookieService.set('version', environment.version);

            const cookies = this.cookieService.getAll();
            let keys = Object.keys(cookies);
            keys = keys.filter((k) => k !== 'version');

            keys.forEach((key) => {
                this.cookieService.delete(key);
            });
        }
    }

    private promptUser(): void {
        console.log('updating to new version');
    }
}
