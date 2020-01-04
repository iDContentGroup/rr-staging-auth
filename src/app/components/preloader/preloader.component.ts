import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'rr-preloader',
    templateUrl: './preloader.template.html',
    styleUrls: ['./preloader.style.scss']
})
export class PreloaderComponent implements OnInit {

    @Input() diameter: number;
    @Input() color: string;
    @Input() strokeWidth: number;
    @Input() useGlobalSpinner: boolean;

    private _useGlobalSpinner: boolean;
    
    constructor( private globalService: GlobalService ) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // if(!this.test) {
        //     this.useGlobalSpinner = true;
        // }

        // if(this.useGlobalSpinner) {
        //     this.globalService.incrementGlobalSpinnerCount();
        //     this._useGlobalSpinner = true;
        // }
    }

    // ngOnDestroy() {
    //     // console.log('destroy spinner');
    //     if(this._useGlobalSpinner) {
    //         this.globalService.decrementGlobalSpinnerCount();
    //     }
    // }
}
