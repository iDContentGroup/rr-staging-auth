# Rocket Rounding Staging Auth

This application handles services provided by the Firebase Auth SDK that include verification, registration, password reset requests.

Verification and password reset requests are handled indirectly on the web (rocket-rounding) / native (rocket-rounding-native) applications. Instead of handling these kinds of email actions on the application the end user is currently using, the end user handles them on another application: rocket-rounding-auth.
source: https://firebase.google.com/docs/auth/custom-email-handler

This application is used to complete the auth email action workflows for an end user once they click the link in their email to continue verifying their email or confirming they want to change their password. Once they complete these workflows on rocket-rounding-auth, they will be returned to the web or native application depending on what device they are using by taking advantage of dynamic links (documented below).

Build: `npm run build`
Deploy: `npm run deploy:staging` or `npm run deploy:prod`

Note: both staging and production are set to use the production hosting for this application. We only use the staging hosting for this application when trying to debug an issue.