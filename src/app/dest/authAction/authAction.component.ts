import { Component, OnInit } from '@angular/core';

import { getRRDynamicLink } from '@moomoomamoo/rocket-rounding-types';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'rr-auth-action',
    templateUrl: './authAction.template.html',
    styleUrls: ['./authAction.style.scss']
})
export class AuthActionComponent implements OnInit {
    link: string;
    show: boolean;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        const mode: string = this.activatedRoute.snapshot.queryParams["mode"] || "";
        const oobCode: string = this.activatedRoute.snapshot.queryParams["oobCode"] || "";
        const apiKey: string = this.activatedRoute.snapshot.queryParams["apiKey"] || "";
        const continueUrl: string = this.activatedRoute.snapshot.queryParams["continueUrl"] || "";
        const d: string = this.activatedRoute.snapshot.queryParams["d"] || "";
        const e = environment.env === 'prod' ? 'p' : 's';

        const base = environment.env === 'prod' ? 'https://rocketroundingapp.com' : 'https://rocket-rounding-staging.web.app';

        const link = `${base}/#/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=en&continueUrl=${continueUrl}&e=${e}`;

        this.link = getRRDynamicLink(link, environment.env, !!d);

        // window.location.replace(this.link);
        window.location.href = this.link;

        setTimeout(() => {
            this.show = true;
        }, 3000);
    }
}
