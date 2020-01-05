import { IError, IErrorClass, IErrorIssue, IErrorAttr } from '@moomoomamoo/rocket-rounding-types';
import * as moment from 'moment-timezone';

import { getIError } from '@moomoomamoo/rocket-rounding-types';

export type IssueMap = {
    [issue in IErrorIssue]: {
        getMessage: (error: IError) => string;
    }
}

export type ClassMap = {
    [iErrorClass in IErrorClass]: {
        displayText: string;
    }
}

// TODO: [v2] [Improve] Update AttrMapObject to have instructions to hide the attr in the error message (this would be nice for attr 'key')

export type AttrMapObject = AttrMapObjectWithRef | AttrMapObjectWithDisplayText;

export type AttrMapObjectWithRef = {
    ref: IErrorAttr;
    displayText?: never;
    altDisplayTextForClass?: never;
}

export type AttrMapObjectWithDisplayText = {
    ref?: never;
    displayText: string;
    altDisplayTextForClass?: {
        [className: string]: string;
    }
}

export type AttrMap = {
    [attr in IErrorAttr]: AttrMapObject;
}

export class ErrorService {
    issueMap: IssueMap;
    classMap: ClassMap;
    attrMap: AttrMap;

    // TODO: [v2] [Temp] It is likely this stuff is outdated. Please update and include as a comment for vs code text editor


    // Assuming Group:

    // Cannot use duplicate ${attr} "${object[attr]}"
    // Unexpected error (Group/'text'|'textSlug'/Exists)

    /*

        issue: 'Exists',
        attr: 'text' | 'textSlug' | null
        value: groupText
        class: 'Group'

        if (attr && object) {

        }

    */

        // Cannot use duplicate name group[textSlug]

        //


    /*

        Cannot use duplicate ${class} ${attr} "${value}"
        Cannot use duplicate Group name

        Cannot use duplicate Group "Supply-chains"

        issue: 'Exists',
        attr: 'textSlug' -> 'name'
        value: 'Supply-chains'
        class: 'Group' -> 'group'

    */

    /*

        Cannot use duplicate ${class} ${attr} "${value}"

        Cannot use duplicate object name "Supply-chains"

        issue: 'Exists',
        attr: 'textSlug' -> 'name'
        value: Supply-chains

    */

      /*

        Cannot use duplicate ${class} ${attr} "${value}"

        Cannot use duplicate object name



        issue: 'Exists',
        attr: 'textSlug' -> 'name'

    */
   

      /*

        Cannot use duplicate ${class} ${attr} "${value}"

        Cannot use duplicate object name

        

        issue: 'Exists',

    */


    // ---




    // Cannot use duplicate attribute/property of object

    // <GenericError> (Exists)

    /*

        issue: 'Exists',
        attr: null
        object: null

    */

    // existsMessageFunc(error: IError) {
    //     return "is already in use";
    // }

    constructor() {
        this.issueMap = {
            'NotFound': {
                getMessage: (error: IError) => {return this.getIssueMessage(error, "was not found");}
            },
            'Empty': {
                getMessage: (error: IError) => {return this.getIssueMessage(error, "is a required field but is empty");}
            },
            'Exists': {
                getMessage: (error: IError) => {return this.getExistsIssueMessage(error);}//this.existsMessageFunc;
            },
            'Invalid': {
                getMessage: (error: IError) => { return this.getInvalidIssueMessage(error, "is invalid") }//this.existsMessageFunc;
            },
            'Incomplete': {
                getMessage: (error: IError) => { return this.getIssueMessage(error, "is incomplete"); }//this.existsMessageFunc;
            },
            'QuestionsNotSaved': {
                getMessage: (error: IError) => { return this.getIssueMessage(error, "questions were not saved"); }//this.existsMessageFunc;
            },
            'Permission': {
                getMessage: (error: IError) => { return this.getIssueMessage(error, "access was denied due to lack of permissions"); }
            },
            'Internal': {
                getMessage: (error: IError) => { return this.getIssueMessage(error, "request resulted in an internal error"); }
            },
            'Disabled': {
                getMessage: (error: IError) => { return this.getIssueMessage(error, "is disabled. Access was denied"); }
            }
        };

        this.classMap = {
            'Address': {
                displayText: 'address'
            },
            'Category': {
                displayText: 'category'
            },
            'Group': {
                displayText: 'group'
            },
            'Location': {
                displayText: 'location'
            },
            'LocationProfile': {
                displayText: 'location profile'
            },
            'Network': {
                displayText: 'network'
            },
            'NetworkProfile': {
                displayText: 'network profile'
            },
            'Profile': {
                displayText: 'profile'
            },
            'Question': {
                displayText: 'question'
            },
            "Response": {
                displayText: 'response'
            },
            "Tag": {
                displayText: 'tag'
            },
            'Round': {
                displayText: 'round'
            },
            'Subject': {
                displayText: 'subject'
            },
            'Survey': {
                displayText: 'survey'
            },
            'SystemProfile': {
                displayText: 'system profile'
            },
            'TimeZone': {
                displayText: 'timeZone'
            }
        };

        this.attrMap = {
            createdAt: {
                displayText: 'created timestamp'
            },
            createdUsingProfile: {
                displayText: 'creator'
            },
            updatedAt: {
                displayText: 'updated timestamp'
            },
            updatedUsingProfile: {
                displayText: 'updater'
            },
            active: {
                displayText: 'active status'
            },
            activeAt: {
                displayText: 'activation timestamp'
            },
            activeUsingProfile: {
                displayText: 'activator'
            },
            disabledAt: {
                displayText: 'disabled timestamp'
            },
            disabledUsingProfile: {
                displayText: 'disabler'
            },
            street: {
                displayText: 'street'
            },
            city: {
                displayText: 'city'
            },
            state: {
                displayText: 'state'
            },
            country: {
                displayText: 'country'
            },
            zip: {
                displayText: 'zip code'
            },
            key: {
                displayText: 'identifier (0)'
            },
            networkKey: {
                displayText: 'network identifier'
            },
            locationKey: {
                displayText: 'location identifier'
            },
            groupKey: {
                displayText: 'group identifier'
            },
            text: {
                displayText: 'display text',
                altDisplayTextForClass: {
                    SystemProfile: 'full name',
                    LocationProfile: 'full name',
                    NetworkProfile: 'full name',
                    Profile: 'full name',
                    Network: 'name',
                    Location: 'name',
                    Subject: 'name',
                    Group: 'name',
                    Category: 'name',
                    Survey: 'name',
                }
            },
            lowerCaseText: {
                ref: "text"
            },
            subjectLimit: {
                displayText: 'subject limit'
            },
            netMonthlyPrice: {
                displayText: 'net monthly price'
            },
            hasNetMonthlyPrice: {
                displayText: "has net monthly price"
            },
            address: {
                displayText: 'address'
            },
            timeZone: {
                displayText: 'time zone'
            },
            pricePerSubject: {
                displayText: 'price per subject'
            },
            discount: {
                displayText: 'discount'
            },
            startDateString: {
                displayText: 'start date'
            },
            endDateString: {
                displayText: 'end date'
            },
            email: {
                displayText: 'email address'
            },
            notes: {
                displayText: 'notes'
            },
            textSlug: {
                ref: 'text',
            },
            textSubSlug: {
                ref: 'textSlug', //TODO fix
            },
            lowerCaseEmail: {
                displayText: 'email address',
            },
            emailSlug: {
                ref: 'lowerCaseEmail'
            },
            acceptedInvite: {
                displayText: 'invite status'
            },
            canRoundOnSubjects: {
                displayText: 'can round on subjects'
            },
            permissionType: {
                displayText: 'permission type'
            },
            domain: {
                displayText: 'subdomain'
            },
            lowerCaseDomain: {
                ref: 'domain'
            },
            isLocationProfile: {
                displayText: ''
            },
            isNetworkProfile: {
                displayText: ''
            },
            isSystemProfile: {
                displayText: ''
            },
            emailSubSlug: {
                displayText: 'email identifier',
            }, surveyKey: {
                displayText: 'survey identifier',
            }, questionType: {
                displayText: 'question type',
            }, questionNumber: {
                displayText: 'question number',
            },
            categoryKey: {
                displayText: 'category identifier',
            }, allowNotes: {
                displayText: 'allow notes validity',
            }, responseMap: {
                displayText: '',
            },
            alerteeMetadataMap: {
                displayText: '',
            }, questionKey: {
                displayText: 'question identifier',
            }, value: {
                displayText: 'question value',
            }, alertsUsers: {
                displayText: 'question alert validity',
            },
            alertStatus: {
                displayText: 'alert overall status'
            }, alertStatusHistoryMap: {
                displayText: 'alert overall status history'
            }, score: {
                displayText: 'score'
            }, tagMap: {
                displayText: ''
            },
            responseNumber: {
                displayText: 'number of responses',
            }, selected: {
                displayText: 'response selection',
            }, surveyMetadata: {
                displayText: 'survey info',
            }, subjectMetadata: {
                displayText: 'subject info',
            },
            groupMetadata: {
                displayText: 'group info',
            }, categoryKeyMap: {
                displayText: 'overall category identifier data',
            }, alerteeKeyMap: {
                displayText: 'overall alertee identifier data',
            }, synced: {
                displayText: `sync'd validity`,
            },
            alerteeKey: {
                displayText: 'alertee identifier',
            }, survey: {
                displayText: 'survey',
            }, questionMap: {
                displayText: 'overall question data',
            }, categoryRoundAnalyticsMap: {
                displayText: 'overall category round analytics data',
            },
            alerteeRoundAnalyticsMap: {
                displayText: 'overall alertee round analytics data',
            }, uniqueID: {
                displayText: 'unique ID',
            }, lowerCaseUniqueID: {
                ref: "uniqueID"
            }, uniqueIDSlug: {
                ref: "lowerCaseUniqueID"
            },
            uniqueIDSubSlug: {
                ref: "uniqueIDSlug"
            }, lastRoundedAt: {
                displayText: 'date last rounded on',
            }, questionCount: {
                displayText: 'question count',
            }, responseCount: {
                displayText: 'response count',
            }, allowRetakes: {
                displayText: 'allow retakes validity',
            },
            desc: {
                displayText: 'description'
            }, citySlug: {
                ref: 'city'
            }, stateSlug: {
                ref: 'state'
            }, stateAbbr: {
                displayText: 'state abbreviation'
            },
            stateAbbrSlug: {
                ref: "stateAbbr"
            }, countrySlug: {
                ref: 'country'
            }, momentTimeZone: {
                displayText: 'time zone'
            }, standardTime: {
                ref: "momentTimeZone"
            }, daylightSavingTime: {
                displayText: 'daylight saving validity'
            },

            canViewNetworkDashboard: {
                displayText: "can view Network Dashboard permission"
            }, 
            assignedGroups: {
                displayText: "assigned groups"
            }, 
            analyticsSetting: {
                displayText: "dashboard analytics setting"
            }, 
            assignedCategories: {
                displayText: "assigned categories"
            }, 
            canViewSystemDashboard: {
                displayText: "can view System Dashboard permission"
            }
        }

        try {
            this.validateAndUpdateAttrMap(this.attrMap)
        }catch(err) {
            console.error(err);
        };

        //Test script to check error messages
        // for(let key2 of Object.keys(this.issueMap)) {
        //     console.log("Issue: ", key2);
        //     for(let key of Object.keys(this.classMap)) {
        //         console.log(this.returnErrorMessageForTesting(key as IErrorClass, key2 as IErrorIssue));
        //     }
        // }
    }

    private returnErrorMessageForTesting(className: IErrorClass, issue: IErrorIssue): string {
        const IError:IError = {
            class: className,
            issue: issue,
            attr: 'dispayText' as IErrorAttr
        }
        return this.getErrorMessage(IError);
    }

    private validateAndUpdateAttrMap(attrMap: AttrMap) { //This method will check for circular dependencies and ensure that all attrMap objects with property "ref" will be replaced with the expected attrMap.ref object.
        for(let key of Object.keys(attrMap || {})) {
            let item = attrMap[key];

            try {
                attrMap[key] = this.getAttrMapObjectWithDisplayText(null, attrMap, item);
            }catch(err){
                const error = {
                    key: key,
                    message: `The item in the attrMap for the passed key had an error.`,
                    item: item,
                    attrMap: attrMap
                }
                console.error(error);
                throw error;
            }
        }
    }

    private getAttrMapObjectWithDisplayText(count: number, attrMap: AttrMap, attrMapObject:AttrMapObject, refMap?: {[attr:string]: number}): AttrMapObjectWithDisplayText {
        if(!count) {
            count = 1;
        } else {
            count += 1;
        }

        if(count > Object.keys(attrMap).length+1) {
            const errorObj = {
                message: `Count in getAttrMapObjectWithDisplayText ${count} exceeded keys length in attrMap ${attrMap}.`,
                count: count,
                refMap: refMap,
                attrMap: attrMap,
                attrMapObject: attrMapObject
            };
            console.error(errorObj);
            throw errorObj;
        }

        refMap = refMap || {};

        if(!attrMapObject.ref) {
            return attrMapObject as AttrMapObjectWithDisplayText;
        }
       
        const nextAttrMapObject = attrMap[attrMapObject.ref];

        if(!nextAttrMapObject) {
            const errorObj = {
                message: `Unexpected missing nextAttrMapObject ${attrMap[attrMapObject.ref]} for attrMapObject ${attrMapObject} in attrMap ${attrMap}.`,
                count: count,
                refMap: refMap,
                attrMap: attrMap,
                attrMapObject: attrMapObject
            };
            console.error(errorObj);
            throw errorObj;
        }
        if(refMap[attrMapObject.ref]) {
            const errorObj = {
                message: `Circular dependency in refMap ${refMap} for attrMapObject.ref ${attrMapObject.ref}.`,
                count: count,
                refMap: refMap,
                attrMap: attrMap,
                attrMapObject: attrMapObject
            };
            console.error(errorObj);
            throw errorObj;
        }

        refMap[attrMapObject.ref] = count;
        return this.getAttrMapObjectWithDisplayText(count, attrMap, nextAttrMapObject, refMap);
    }

    public isKnownError(iError: IError): boolean {
        if (!iError || !iError.issue) {
            return false;
        }

        const message = this.issueMap[iError.issue];
        
        return !!message;
    }

    public getErrorMessageFromErrors(iErrors: IError[]): string {
        if (!iErrors || !iErrors.length) {
            return this.getGeneralMessage();
        }

        for (let iError of iErrors) {
            if (this.isKnownError(iError)) {
                return this.getErrorMessage(iError);
            }
        }
    }

    getIssueMessage(error: IError, text: string) {
        // ${class} ${attr} "${value}" ${issue}

        if (!text) {
            return `${this.getGeneralMessage(error)} (0)`
        }

        // const objectClass = this.classMap[error.class] && this.classMap[error.class].displayText || 'object';
        const objectClass = error.class && this.classMap[error.class] && this.classMap[error.class].displayText || 'object';

        const attr = this.getErrorAttrDisplayText(error);

        const value = error.value || '';

        if(error.class==='Response' && error.attr==='value' && error.issue==='Empty') {
            return "At least one response must be selected."
        }

        let message = '';

        if (objectClass) {
            if (message) {
                message += ' ';
            }

            message += objectClass;
        }

        if (attr) {
            if (message) {
                message += ' ';
            }

            message += attr;
        }

        if (value) {
            if (message) {
                message += ' ';
            }

            message += `"${value}"`;
        }

        message += ` ${text}`;

        return message || (`${this.getGeneralMessage(error)} (1)`);
    }

    getInvalidIssueMessage(error: IError, text: string) {
        if(error.class && error.class==='Question') {
            return "Questions must have at least one and no greater than 10 responses."
        }
        else if(error.class && error.class==='Survey' && error.attr==='questionCount') {
            return "Surveys must have at least one and no greater than 30 questions."
        }
        else if(error.class && error.class==='Network') {
            if(error.attr==='disabledAt') {
                if(error.value) {
                    const canDeleteTime = moment(error.value.disabledAt).add(60, 'days');
                    const disableTime = moment(error.value.disabledAt);
                    return 'Can\'t delete yet. Archive date was ' + disableTime.format("M/DD/YYYY [at] h:mm a") + ' and you will be able to delete after ' + canDeleteTime.format("M/DD/YYYY [at] h:mm a") + '.';
                }
                else {
                    return `Can't delete this network yet. Please wait 60 days from disabled date to delete.`
                }
            }
        }
        return this.getIssueMessage(error, text);
    }

    getErrorAttrDisplayText(error: IError) {
        if (!error || !error.attr) {
            return '';
        }

        const attrMapObject: AttrMapObject = this.attrMap[error.attr];

        if (!attrMapObject) {
            return "";
        }

        if (error.class && attrMapObject.altDisplayTextForClass) {
            const _class = error.class.trim().toLowerCase();

            for (let altClass of Object.keys(attrMapObject.altDisplayTextForClass || {})) {
                const _altClass = altClass.trim().toLowerCase();
                if (_class === _altClass) {
                    return attrMapObject.altDisplayTextForClass[altClass] || "";
                }
            }
        }

        return attrMapObject.displayText || "";
    }

    getExistsIssueMessage(error: IError) {
        // Cannot use duplicate ${class} ${attr} "${value}"

        const objectClass = error.class && this.classMap[error.class] && this.classMap[error.class].displayText || 'object';

        const attr = this.getErrorAttrDisplayText(error);

        if (!attr) {
            return `${this.getGeneralMessage(error)} (2)`;
        }

        const value = error.value || '';

        console.log(objectClass);

        if(objectClass && objectClass==='location' && error.attr==='hasNetMonthlyPrice') {
            let message = "The action cannot be completed because you do not have permission to update a location that has billing."
            return message;
        }
        
        let message = "Cannot use duplicate";

        if (objectClass) {
            if (message) {
                message += ' ';
            }

            message += objectClass;
        }

        if (attr) {
            if (message) {
                message += ' ';
            }

            message += attr;
        }

        if (value) {
            if (message) {
                message += ' ';
            }

            message += `"${value}"`;
        }

        return message;
    }

    //this is how we display the text to the end user based on an iError
    public getErrorMessage(iError: IError): string {
        const messageGenerator = iError && iError.issue && this.issueMap[iError.issue];

        let message = "";

        if (messageGenerator) {
            message = messageGenerator.getMessage(iError);
        } else {
            message = this.getGeneralMessage(iError);
        }

        message = message.charAt(0).toUpperCase() + message.slice(1);

        console.error(message);
        return message;
    }

    public getGeneralMessage(iError?: IError): string {
        let message = "unexpected error";
        let errorCode = "";

        if (iError) {
            if (iError.class) {
                if (errorCode.length) {
                    errorCode += "/";
                }
    
                errorCode += iError.class;
            }
    
            if (iError.attr) {
                if (errorCode.length) {
                    errorCode += "/";
                }
    
                errorCode += iError.attr;
            }
    
            if (iError.issue) {
                if (errorCode.length) {
                    errorCode += "/";
                }
    
                errorCode += iError.issue;
            }
        }

        if (errorCode) {
            message += ` (${errorCode})`;
        }

        return message;
    }

    public getIError(previousError: any, currentError: any): IError {
        // const newError = {
        //     class: existingError && existingError.class || currentError && currentError.class,
        //     attr: existingError && existingError.attr || currentError && currentError.attr,
        //     value: existingError && existingError.value || currentError && currentError.value,
        //     issue: existingError && existingError.issue || currentError && currentError.issue,
        //     error: existingError && existingError.error || currentError && currentError.error || existingError, 
        //     message: existingError && existingError.message || currentError && currentError.message || (existingError && existingError.message)
        // }

        const newError = getIError(currentError, previousError);

        console.warn(newError);
        return newError;
    }
}
