# Projet n°7 OpenClassrooms
## Creation of a corporate social network for Groupomania in this case called Socialomania
Download the repository and follow the instructions below to install this project locally

## prerequisite
- Installer Node.js
- Installer Vue.js
- Installer MySQL

## MySQL database
- Ouvrez votre terminal
- Connectez-vous à MySQL : mysql -h localhost -u root -p
- Tapez votre mot de passe
- Créez la base de données : CREATE DATABASE groupomania_database CHARACTER SET 'utf8';
- Utilisez la base de données créée : USE groupomania_database
- Importez le fichier groupomania_database.sql : SOURCE groupomania_database.sql;
- Dans le dossier backend, allez dans le fichier connectdb.js et renseignez votre mot de passe dans password:'xxxxxx'

## Installing and starting the Backend
- Open your terminal Go to the frontend folder: cd socialomania/backend
-  Install all project dependencies: npm install 
-  Start the application: nodemon server

## Installing and starting the Frontend
- Open your terminal Go to the frontend folder: cd socialomania/frontend 
- Install all project dependencies: npm install 
- Start the application: npm run serve
