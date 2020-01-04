import { Injectable } from '@angular/core';
import { isValidID, getWhyIDIsInvalid } from '@moomoomamoo/rocket-rounding-types';

@Injectable()
export class GlobalService {

    appColors: any = {};
    id: number;

    constructor() {

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
}
