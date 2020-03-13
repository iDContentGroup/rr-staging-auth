import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'rr-input',
  templateUrl: './input.template.html',
  styleUrls: ['./input.style.scss']
})
export class InputComponent implements OnInit {

    @Input() placeholder: string;
    @Input() value: any;
    @Input() textAlign: string;
    @Input() disabled: boolean;
    @Input() hint: string;
    @Input() errorType: string;
    @Input() required: boolean;
    @Input() error: string;
    @Input() inputType: string;
    @Input() autocomplete: 'new-password' | 'current-password' | 'username'; //used to tell google what type of input it is

    @Output() valueUpdated: EventEmitter<any> = new EventEmitter;

    @ViewChild('input') input: ElementRef;

    constructor( ) { }

    ngOnInit() {
        
    }

    triggerChange(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            this.input.nativeElement.blur();
        }
    }
}
