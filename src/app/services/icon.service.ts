import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

declare var require: any;

@Injectable()
export class IconService {
    
    availableIcons: any[];

    constructor( private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer ) {
        // this.availableIcons = require('../svg_files.json');
    }

    registerIcon(icon:string, iconPath:string) {
        return Promise.resolve (
            this.matIconRegistry.addSvgIcon(
                icon,
                this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath)
            )
        )
    }

}