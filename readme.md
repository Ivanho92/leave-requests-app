# Welcome to the Leave Request App!
## Introduction
This web application was created as part of the one-year EPFC course "[Javascript web application](https://www.epfc.eu/formations/javascript-web-app)", as a final year project.

The goal of the app is to replicate a minimalist company's leave requests management tool, where one can do the following operations:

 - See the list of leave requests in a summary table
 - Search for specific leave requests and display them above the table
 - Create a new leave request
 - Edit an existing leave request
 - Delete an existing leave request

## Architecture
Another objective of the project was to learn what a modern web architecture is and to reproduce it. That's why the full project consists of a **back-end API** (built with [Node.js](https://nodejs.org/en/) and [Express.js](https://expressjs.com/fr/)), a **front-end app** (built with [Angular](https://angular.io/)), and a **database** (built with [MongoDB](https://www.mongodb.com/)).

## Get started
 1. If not already done, install latest versions of:
 - [Node.js and npm](https://nodejs.org/en/download/) 	 
 - [Git](https://git-scm.com/downloads)
 - [MongoDB (Community Edition)](https://www.mongodb.com/try/download/community)

 2. Clone the git repository by running `git clone https://github.com/Ivanho92/leave-requests-app.git`

### MongoDB (database) 
Let's first start the database:

1. Open a terminal and cd into the directory where you installed MongoDB
2. Run `bin/mongod.exe --dbpath data`

### Node.js (back-end) 
Now let's install the back-end API dependencies, and start it by doing the following:

1. Open your terminal and cd into directory "api-nodejs"
2. Run `npm install`
3. Run `npm start`

### Angular (front-end) 
Once the back-end API is up and running, let's do the same for the front-end app:
1. Open another terminal and cd into directory "front-angular"
2. Run `npm install`
3. Run `npm start`

## Open the application
If everything was correctly installed and is up and running, you can now open `http://localhost:4200` and see the application homepage!
