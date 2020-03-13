import { Component, OnInit, ViewChild } from '@angular/core';

import { getRRDynamicLink } from '@moomoomamoo/rocket-rounding-types';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';

import { GlobalService } from 'src/app/services/global.service';
import { InputComponent } from 'src/app/components/input/input.component';

@Component({
    selector: 'rr-auth-action',
    templateUrl: './authAction.template.html',
    styleUrls: ['./authAction.style.scss']
})
export class AuthActionComponent implements OnInit {
    env: 'prod' | 'staging';

    link: string;
    home: string;
    show: boolean;

    mode: string;
    oobCode: string;
    apiKey: string;
    continueUrl: string;

    email: string;// Password recovery

    loading: boolean;
    finished: boolean;

    error : any;

    password: string;
    passwordValidator: string;

    passwordInputError: string;
    passwordValidatorInputError: string;
    success: boolean;

    @ViewChild('pwInput', {static:false}) private pwInput: InputComponent;
    @ViewChild('pwConfirmInput', {static: false}) private pwConfirmInput: InputComponent;

    constructor(private activatedRoute: ActivatedRoute, public globalService: GlobalService) { }

    ngOnInit() {
        this.mode = this.activatedRoute.snapshot.queryParams["mode"] || "";
        this.oobCode = this.activatedRoute.snapshot.queryParams["oobCode"] || "";
        this.apiKey = this.activatedRoute.snapshot.queryParams["apiKey"] || "";
        this.continueUrl = this.activatedRoute.snapshot.queryParams["continueUrl"] || "";
        const d: string = this.activatedRoute.snapshot.queryParams["d"] || "";

        // Get env by checking firebase public api key (check if it's production, it not, assume it's staging)
        this.env = this.apiKey === 'AIzaSyAbYLrGKg9l9s3ShrFVwg8PeUxgF-z6Zds' ? 'prod' : 'staging';

        firebase.initializeApp({
            apiKey: this.apiKey
        });

        const e = this.env === 'prod' ? 'p' : 's';

        const base = this.env === 'prod' ? 'https://rocketroundingapp.com' : 'https://rocket-rounding-staging.web.app';

        const link = `${base}/#/auth/action?mode=${this.mode}&oobCode=${this.oobCode}&apiKey=${this.apiKey}&lang=en&continueUrl=${this.continueUrl}&e=${e}`;

        this.link = getRRDynamicLink(link, this.env, !!d);

        // window.location.replace(this.link);
        // window.location.href = this.link;

        // console.log(mode, oobCode, apiKey, continueUrl);

        // setTimeout(() => {
        //     this.show = true;
        // }, 3000);

        // source: https://firebase.google.com/docs/auth/custom-email-handler

        // Handle the user management action.
        switch (this.mode) {
            case 'resetPassword':
            // Display reset password handler and UI.
            this.handleResetPassword();
            break;
            case 'recoverEmail':
            // Display email recovery handler and UI.
            this.handleRecoverEmail();
            break;
            case 'verifyEmail':
            // Display email verification handler and UI.
            this.handleVerifyEmail();
            break;
            default:
            // Error: invalid mode.
            this.error = {
                key: 'badMode',
                message: "bad mode"
            };
            this.globalService.setWarningObj({warningMessage: 'Invalid auth mode. Please try again. If problem persists, reach out to your admin.'})
        }

        this.setNavigateToAppUrl();
    }

    public handleResetPassword(): Promise<void> {
        this.loading = true;

        this.email = null;

        // Verify the password reset code is valid.
        return firebase.auth().verifyPasswordResetCode(this.oobCode).then(email => {
            this.email = email;
        }).catch(error => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
            console.error(error);
            this.handleError(error);
        }).then(() => {
            this.loading = false;
        });
    }

    public confirmNewPassword(newPassword: string): Promise<void> {
        // this.loading = true;

        // Save the new password.
        return firebase.auth().confirmPasswordReset(this.oobCode, newPassword).then(resp => {
            // Password reset has been confirmed and new password updated.
            this.finished = true;
        }).catch(error => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
            console.error(error);
            throw error;
        }).then(() => {
            // this.loading = false;
        });
    }

    public handleVerifyEmail(): Promise<void> {
        this.loading = true;

        // parameter.
        // Try to apply the email verification code.
        return firebase.auth().applyActionCode(this.oobCode).then(resp => {
            console.log(resp);
            // Email address has been verified.
            this.finished = true;
        }).catch(error => {
            // Code is invalid or expired. Ask the user to verify their email address
            // again.
            console.error(error);
            this.handleError(error);
        }).then(() => {
            this.loading = false;
        });
    }

    public handleRecoverEmail(): void {
        // We don't support recovering email
        // TODO: handle invalid mode
        this.error = {
            message: "We dont handle recovering emails"
        }
        
        return;
    }

    private setNavigateToAppUrl(): void {
        const url = getRRDynamicLink(this.continueUrl || (this.env === 'prod' ? 'https://rocketroundingapp.com' : 'https://rocket-rounding-staging.web.app'), this.env);
        if(this.env==='prod') {
            this.home = 'https://rocketroundingapp.com';
        } else {
            this.home = 'https://rocket-rounding-staging.web.app';
        }
        this.link = url;
    }

    public submitForm(): Promise<void> {
        if(this.loading) {
            this.globalService.snackBar('Please wait.', 'red');
            return;
        }
        this.loading = true;

        const errors = [];

        const pwVal = this.pwInput.input.nativeElement.value;
        const pwConfirmVal = this.pwConfirmInput.input.nativeElement.value;

        // password follows our rules
        if(!pwVal || !pwConfirmVal) {
            if(!pwVal) {
                this.passwordInputError = "Password required."
                errors.push(this.passwordInputError);
            }
            if(!pwConfirmVal) {
                this.passwordValidatorInputError = "Please confim password."
                errors.push(this.passwordValidatorInputError);
            }
        }
        else if(pwVal !== pwConfirmVal) {
            this.passwordInputError = 'Passwords do not match'
            errors.push(this.passwordInputError);
        }
        if(errors && errors.length) {
            this.globalService.snackBar(errors[0], 'red');
            this.loading = false;
            return;
        }
        else {
            this.loading = true;
            return this.confirmNewPassword(pwVal).then(() => {
                this.globalService.snackBar('Password successfully updated!', 'green');
                this.success = true;
            }).catch(err => {
                 // source: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#confirm-password-reset
                this.handleError(err);
            }).then(() => {
                this.loading = false;
            });          
        }
    }

    public handleError(err):void {
        let msg = null;
        if(err.code === 'auth/expired-action-code') {
            msg = 'Password reset code expired. Please try again.'
            this.error = err;
        }
        else if(err.code === 'auth/invalid-action-code') {
            msg = 'This link is invalid or has expired. Please try again.'
            this.error = err;
        }
        else if(err.code === 'auth/user-disabled') {
            msg = 'Oops, this account is suspended. Please reach out to your admin.'
            this.error = err;
        }
        else if(err.code === 'auth/user-not-found') {
            msg = 'Oops, no account was found that matches the provided credentials.'
            this.error = err;
        }
        else if(err.code === 'auth/weak-password') {
            msg = 'Your password must be at least 6 characters.'
        }
        console.error(err);
        if(msg) {
            this.globalService.setWarningObj({warningMessage: msg});
            return;
        }
        // this.globalService.snackBar('Oops. Something went wrong. Please try again.', 'red');

        this.globalService.handleErrorObject(err, "warningBar");
    }

    public goToLink() {
        window.location.href = this.link;
    }

}
