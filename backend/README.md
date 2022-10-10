# Backend Setup

1.- Clone the github repo to your computer (if you're not sure how to do this I believe we're doing a git activity during discussion so you can wait until then). Once you've cloned it navigate to the directory in terminal.

2.- Switch to the branch called "vs_backend_setup" by running git checkout vs_backend_setup . Then run git pull to pull the changes I made on that branch

3.- In your terminal you can run npm --version if it tells you something like "command not found: npm" you'll need to download node from [here](https://nodejs.org/en/download/). Once you've done that you can run npm --version again and you should see a version number.

4.- Now you can install the dependencies by running npm i express && sudo npm i -g nodemon

5.- You should now be able to run nodemon index.js and see a message like "Application is listening on port 3000..."

6.- To connect to the MongoDB database, you need to create a file names secret.js in the backend folder, where you will write the following:

export const mongoURI = "link"

The link can be retrieved from MongoDB. In the Database window, select Connect -> Connect your application. This link has user and password fields you need to fill out with your mongoDB sign in info.