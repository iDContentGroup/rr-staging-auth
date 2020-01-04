import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'rr-icon',
  templateUrl: './icon.template.html',
  styleUrls: ['./icon.style.scss']
})
export class IconComponent implements OnInit {

    @Input() icon: string;
    @Input() fill: string;
    @Input() size: string;
    @Input() disabled: boolean;

    uniqueIconID: string;
    loading: boolean;

    constructor( private iconService: IconService, private globalService: GlobalService) { }

    ngOnInit() {
        this.registerIcon();
    }

    ngOnChanges(changes) {
        if(changes.icon && !changes.icon.firstChange && (changes.icon.currentValue !== changes.icon.previousValue)) {
            this.registerIcon();
        }
    }

    public registerIcon(): Promise<void> {
        // Everything seems to be working as expected on IE (there is an issue with the sidenav list items that contain an icon though)
        // TODO: [v2] [Check] Continue testing on IE to see if polyfill is needed svg4everyone
        // (Also we shouldn't use svg4everyone since we aren't doing a 'spritesheet' system for our svgs. This is where you put all your svgs on index.html and reference them throughout the application)
        this.loading = true;

        if(!this.icon) {
            console.error('unexpected missing icon input to <rr-icon> component');
            this.loading = false;
            return Promise.resolve();
        }

        this.uniqueIconID = this.icon + this.globalService.getUniqueID();
        const iconPath = `../assets/svg/${this.icon}.svg`;

        // TODO: [v2] [Improve] check for unregistering icons
        return this.iconService.registerIcon(this.uniqueIconID, iconPath).then(() => {
            this.loading = false;
        });
    }
}
