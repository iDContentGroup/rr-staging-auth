import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private router: Router) {
        this.router = router;
    }

    ngOnInit() {
    }

    handleDynamicLink(e?: {deepLink: string}) {
        // TODO: [1] [Check] Look into matchType: "Strong"
        // TODO: [v1] [Check] Consider when getting deepLink: "." (This might be when the user first installs the application)

        // Exist early since no deep link metadata is available
        if (!e || !e.deepLink) {
            return;
        }

        // Url path that includes queryParams
        const fullRelativePath: string = e.deepLink.split('#')[1] || "";

        // Url path without the queryParams
        const relativePath: string = fullRelativePath.split('?')[0] || "";

        // Get queryParams as an object map
        const queryParams: any = this.router.parseUrl(fullRelativePath).queryParams || {};

        if (relativePath === '/auth/action') {
            // Handle auth action (password recovery / verify email)
            this.router.navigate(['/auth/action'], {
                queryParams: {
                    mode: queryParams.mode,
                    oobCode: queryParams.oobCode,
                    apiKey: queryParams.apiKey,
                    lang: queryParams.lang,
                    continueUrl: queryParams.continueUrl
                }
            });
        } else {
            // Handle anything else (We don't have to always navigate somewhere, this is just how I'm leaving it for now)
            this.router.navigate(['/']);
        }
    }
}
