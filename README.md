# Rocket Rounding Staging Auth

This application handles services provided by the Firebase Auth SDK that include verification, registration, password reset requests.

Verification and password reset requests are handled indirectly on the web (rocket-rounding) / native (rocket-rounding-native) applications. Instead of handling these kinds of email actions on the application the end user is currently using, the end user handles them on another application: rocket-rounding-auth.
source: https://firebase.google.com/docs/auth/custom-email-handler

This application is used to complete the auth email action workflows for an end user once they click the link in their email to continue verifying their email or confirming they want to change their password. Once they complete these workflows on rocket-rounding-auth, they will be returned to the web or native application depending on what device they are using by taking advantage of dynamic links (documented below).

## Quick guide

Build: `npm run build`
Deploy: `npm run deploy:staging` or `npm run deploy:prod`

Note: both staging and production are set to use the production hosting for this application. We only use the staging hosting for this application when trying to debug an issue.

## Local server:

Note that when receiving an email from Firebase for an Auth Email Action, you'll have to change the url to use `localhost` instead of `rocket-rounding-auth` domain. Port should default to 4200, but may vary

`https://rocket-rounding-auth.web.app/auth/action?...` -> `localhost:4200/auth/action?...`

`npm run start` Runs a local server (can be used for both production and staging at the same time)

## Staging:

Note that we don't use the staging environment for this application by default. We would only use it if we were trying to debug something. This would require updating the url in an email from Firebase for an Auth Email Action. You'll have to change the url to use `rocket-rounding-staging-auth` instead of `rocket-rounding-auth` domain.

`https://rocket-rounding-auth.web.app/auth/action?...` -> `https://rocket-rounding-staging-auth.web.app/auth/action?...`

`npm run build` Creates a build that would be suitable for both staging and production
`npm run deploy:staging` Deploys to our staging hosting for the staging Firebase project (rocket-rounding-staging-auth)

## Production:

Note that all environments for other applications use the production version of this application.

`npm run build` Creates a build that would be suitable for both staging and production
`npm run deploy:prod` Deploys to our production hosting for the production Firebase project (rocket-rounding-auth)
