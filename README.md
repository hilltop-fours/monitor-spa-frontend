# Introduction 
This is the frontend application of [Monitor SPA](https://dev.azure.com). 

# Components
Components should be generated with an `.scss` like this `ng generate component <name> --style=scss`.

# How to run
To run the application without any external resources, you can start Angular in the mocked configuration with `ng serve --configuration=mock`. This will use the mocked version of services, in such a way that you won't need a locally running database and backend application.

If you do wish to use a local database and backend, you can run the frontend with `ng serve --configuration=local`.

# How to lint
This project uses [ESLint](https://eslint.org/) and will validate the code based on the rules set in `.eslintrc.json`.

To validate your code you should run `ng lint`. This is the Angular variant that automatically runs the appropriate linter.

# How to test
Not yet implemented, but you can run `ng test`.