import { Injectable } from '@angular/core';
import { isValidID, getWhyIDIsInvalid, IError } from '@moomoomamoo/rocket-rounding-types';
import { Button } from '../components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface WarningBarObj {
    warningMessage: string;
    consoleWarning?: string;
    errorIcon?: string;
    warningButton?: WarningButton;
    warningType?: 'error' | 'warning';
}

export interface WarningButton {
    button: Button;
    clickFunc: Function;
  }

@Injectable()
export class GlobalService {

    appColors: any = {};
    id: number;
    warningBarObj: WarningBarObj;
    showWarningBar: boolean;

    constructor(private snack: MatSnackBar) {

        this.appColors = {
            primary: '#13aeda',
            light: '#89d7ed',
            dark: '#0684c2',
            black: 'rgba(0,0,0,0.87)',
            lightBlack: 'rgba(0,0,0,0.54)',
            lightGray: 'rgba(0,0,0,0.14)'
        }
    }

    // Complicates an id to include more than just the counter so that it is unique to any other session(*-1, *-2, *-3, etc where * is some unique string to this application session)
    public getUniqueID(): string {
        const id = this.getId();
        const uniqueID = `${Date.now()}-${id}`;// TODO: [v2] [Improve] - This seems to be working for the most part, maybe it's okay to push to v2 Use something better than just Date.now()

        // Since we may be using this to generate uniqueIDs for firestore purposes, let's validate that the uniqueID follows the limitations on document/collection IDs
        if (!isValidID(uniqueID)) {
            throw getWhyIDIsInvalid(uniqueID);
        }
        
        return uniqueID;
    }

    // Increments a counter that can be used for unique ids(1, 2, 3, etc)
    public getId(): number {
        this.id += 1;
        return this.id;
    }

    // Color can be 'red', 'green' or 'gray'
    public snackBar(message: any, color: 'red' | 'green' | 'gray' | 'grey', duration?: number): void {
        if (!message) {
            console.error("Unexpected missing message");
            return;
        }

        let tempMessage = message;
        let text;

        let i = 0;
        while(typeof tempMessage !== 'string' && (tempMessage.message || tempMessage.text || tempMessage.toString)) {
            // console.log(tempMessage);
            tempMessage = tempMessage.message || tempMessage.text || (tempMessage.toString && tempMessage.toString());
            i++;
            if (i > 100) {
                console.error("inf loop prevented");
                console.error(message);
                console.error(tempMessage);
                return;
            }
        }
    
        // if (message && message.length) {
            text = tempMessage;
        // }

        let timeout = 0;
    
        // if (text && text.length) {
        if (text && typeof text === 'string' && text.length) {
            timeout = (250 + text.length * 20) * 2; // * 2 for rereading;

            if (timeout <= 1500) {
                timeout = 1500;
            }

            if (timeout >= 5000) {
                timeout = 5000;
            }
        } else {
            console.error("Unexpected text");
            console.error(text);
            console.error(message);
            console.error(tempMessage);
            return;
        }
        
        // To check for when duration is defined try using .snackBar\(("|'|`).*("|'|`),.*,.+\) to search for that
        this.snack.open(text, 'Dismiss', {
            duration: duration || timeout,
            panelClass: [color+'-snackbar']
        });
    }
 
    // TODO: [v2] [Improve] on logging errors and showcasing errors to end users
    public handleErrorObject(err: any, display: 'warningBar' | 'snackbar', displayTime?: number): void {
        // let iError: IError = err;

        // if(err.error) {
        //     iError = err.error;
        // } else {
        //     iError = err;
        // }

        if(display==='warningBar') {
            this.setWarningObj({warningMessage: err.error});
        } else if(display==='snackbar') {
            this.snackBar(err.error, 'red', displayTime);
        }

        // const newError = this.errorService.getIError(err, iError);
        // console.error(newError);
        // if(display==='warningBar') {
        //     this.setWarningObj({warningMessage: this.errorService.getErrorMessage(newError)});
        // } else if(display==='snackbar') {
        //     this.snackBar(this.errorService.getErrorMessage(newError), 'green', displayTime);
        // }
    }

    public setWarningObj(obj?: WarningBarObj): Promise<void> {
        if(!obj) {
            this.warningBarObj = {
                warningMessage: "Oops, an error occured.",
                warningButton: null,
            }
        }
        else if(obj) {
            this.warningBarObj = obj;
        }
        if(!this.warningBarObj.warningButton) {
            this.warningBarObj.warningButton = {
                button: {
                    buttonType: 'basic',
                    text: 'Close'
                },
                clickFunc: () => {
                    this.clearWarning();
                }
            }     
        }
        this.showWarningBar = true;
        return Promise.resolve(null);
    }
    public clearWarning(): Promise<void> {
        this.warningBarObj = null;
        this.showWarningBar = false;
        return Promise.resolve(null);
    }
}
