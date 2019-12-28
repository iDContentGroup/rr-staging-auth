import { Component, OnInit } from '@angular/core';

import { getRRDynamicLink } from '@moomoomamoo/rocket-rounding-types';

import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';

import { auth } from 'firebase/app';

@Component({
    selector: 'rr-test',
    templateUrl: './test.template.html',
    styleUrls: ['./test.style.scss']
})
export class TestComponent implements OnInit {
    mode: string;
    oobCode: string;
    apiKey: string;
    continueUrl: string;

    email: string;// Password recovery

    loading: boolean;
    finished: boolean;

    error : any;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.mode = this.activatedRoute.snapshot.queryParams["mode"] || "";
        this.oobCode = this.activatedRoute.snapshot.queryParams["oobCode"] || "";
        this.apiKey = this.activatedRoute.snapshot.queryParams["apiKey"] || "";
        this.continueUrl = this.activatedRoute.snapshot.queryParams["continueUrl"] || "";

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
                message: "bad mode"
            };
        }
    }

    public handleResetPassword(): Promise<void> {
        this.loading = true;

        this.email = null;

        // Verify the password reset code is valid.
        return auth().verifyPasswordResetCode(this.oobCode).then(email => {
            this.email = email;
        }).catch(error => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
            console.error(error);
            this.error = error;
        }).then(() => {
            this.loading = false;
        });
    }

    public confirmNewPassword(newPassword: string): Promise<void> {
        this.loading = true;

        // Save the new password.
        return auth().confirmPasswordReset(this.oobCode, newPassword).then(resp => {
            // Password reset has been confirmed and new password updated.
            this.finished = true;
        }).catch(error => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
            console.error(error);
            this.error = error;
        }).then(() => {
            this.loading = false;
        });
    }

    public handleVerifyEmail(): Promise<void> {
        this.loading = true;

        // parameter.
        // Try to apply the email verification code.
        return auth().applyActionCode(this.oobCode).then(resp => {
            // Email address has been verified.
            this.finished = true;
        }).catch(error => {
            // Code is invalid or expired. Ask the user to verify their email address
            // again.
            console.error(error);
            this.error = error;
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

    public navigateToApp(): void {
        // Create a dynamicLink using continueUrl or generate one depending on the environment
        const url = getRRDynamicLink(this.continueUrl || (environment.env === 'prod' ? 'https://rocketrocketingapp.com' : 'https://rocket-rounding-staging.web.app'), environment.env);
        // Navigate to dynamicLink
        window.location.href = url;
    }
}
