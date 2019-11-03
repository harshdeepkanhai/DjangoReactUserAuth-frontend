# DjangoReactUserAuth-frontend

This is the frontend part use it with the [DjangoBackend](https://github.com/harshdeepkanhai/DjangoReactUserAuth-backend)

-----------------------------
* have the latest stable `node`, `npm` and `yarn` installed
* clone this repo
* cd into DjangoReactUserAuth-frontend
* Note: Before running this see that the Django Backend server is running
* run `yarn` in the command line it will install all the required packages from `package.json`
* run `yarn start`
* It will start the server in `http://localhost:3000`
* open this in your browser `http://localhost:3000`
* You will be redirected to the homepage 
* click on `LOGIN` on the Top menu on the right side
* It will open  the login screen
* Click on `Don't have an account? Sign Up`. It will redirect to Sign Up Page
* Fill the Details and SignUp
* It will redirect to `Sign In` Page. Now Sign In using the previously created username and password.
* After Successfull Sign In You will be redirected to home page where you can see `<Username> has signed in` and a logout button in the top.
* After clicking `Logout` you will be logged out and the home page revert back with the message `Please Log In`. Now you can `log in`
again or create more `users`
