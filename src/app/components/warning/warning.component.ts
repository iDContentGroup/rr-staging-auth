import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Button } from '../button/button.component';

export interface WarningButton {
  button: Button;
  clickFunc: Function;
}

@Component({
  selector: 'rr-warning',
  templateUrl: './warning.template.html',
  styleUrls: ['./warning.style.scss']
})
export class WarningComponent implements OnInit {

    @Input() warningMessage: string;
    @Input() consoleWarning: string;
    @Input() warningButton: WarningButton;
    @Input() warningIcon: string;
    @Input() styleType: 'warning' | 'error';

    constructor( ) { }

    ngOnInit() {

    }

}
