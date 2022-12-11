# DHD
Doctors and Hospital Directory (18)

Create a new branch with your name to upload your files. Do not edit the main branch <br />
If your code is working and you want to merge it with main, create a pull request from your branch to main <br />

Scripts: <br />

In the main directory: <br />
npm run create_db (Creates the database) <br />
npm run seed_db (Seeds the database) <br />
npm run init_db (Creates and seeds the database) <br />
npm run server (Starts server.js using nodemon) <br />
npm run app (Starts the web application) <br />

To run a file without using scripts, make sure the dotenv path specified within the file is correct and that you run node {filename} inside the directory containing the file <br />

## Backend
All functions provided by the backend are listed in frontend/API/api.js <br />
These functions send requests to the server, which routes all requests using route.js <br />
Actual function code is defined within the controller files <br />
