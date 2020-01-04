import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../services/global.service';

export interface Button {
    buttonType: string;
    icon?: string;
    iconFill?: string;
    text?: string;
    active?:boolean;
    activeIcon?: string;
    activeText?: string;
    disabled?: boolean;
    customColor?: string;
    backgroundColor?: string;
    key?: string;
}


@Component({
  selector: 'rr-button',
  templateUrl: './button.template.html',
  styleUrls: ['./button.style.scss']
})

export class ButtonComponent implements OnInit {

    @Input() buttonType: string;
    @Input() icon: string;
    @Input() iconFill: string;
    @Input() text: string;
    @Input() active: boolean;
    @Input() activeIcon: string;
    @Input() activeText: string;
    @Input() disabled: boolean;
    @Input() customColor: string;
    @Input() backgroundColor: string;

    @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

    lightBlack: string;

    constructor( public globalService: GlobalService ) { }

    ngOnInit() {
        this.lightBlack = 'rgba(0,0,0,0.87)'
    }

}
