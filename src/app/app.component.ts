import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private doc: Document) {}

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
    }
}
