# Project n°7 OpenClassrooms - Groupomania
## Creation of a internal social network for Groupomania, in this case called Socialomania
Download the repository and follow the instructions below to install this project locally

## required
- Node.js
- Vue.js
- MySQL

## MySQL database
- Open your terminal
- Connect to MySQL: mysql -h localhost -u root -p
- Type your password
- Create the database : CREATE DATABASE groupomania_database CHARACTER SET 'utf8';
- Use the created database : USE groupomania_database
- Import the file groupomania_database.sql : SOURCE groupomania_database.sql;
- In the backend folder, go to the connectdb.js file and fill in your password in password:'xxxxxx'

## Installing and starting the Backend
- Open your terminal Go to the backtend folder: cd socialomania/backend
-  Install all project dependencies: npm install 
-  Start the application: nodemon server

## Installing and starting the Frontend
- Open your terminal Go to the frontend folder: cd socialomania/frontend 
- Install all project dependencies: npm install 
- Start the application: npm run serve
