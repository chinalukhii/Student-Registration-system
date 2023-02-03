# mp-03

 
* Node.JS
* express.js
* sequelize
* mysql2
* ejs
* bcryptjs

Documentation
1. Project start-up instructions
* unpack the archive with the source code
* you have to go to the directory with the source code
* you need to run a terminal in the directory
* In the terminal you need to start docker with the command docker-compose up
* in the terminal, you need to run the application using npm start (if there are no node modules, download them)
* after checking step 2 (Instructions for installing and configuring the database), you need to enter localhost:3000 in the browser
2. Database installation and configuration instructions
* when docker is running, go to phpmyadmin localhost:8183 in your browser and log in root:root
* you need to run the sql tab you need to enter CREATE SCHEMA IF NOT EXISTS 'tin'; and then click execute
* if init.js has sync({force: true}) in line 16, you don't need to create tables and fill them with initial values, the application will remove the current tables and insert the data contained in init.js wpp, enter the tin database and the sql tab and paste the content of the sql script creating the table (sql directory tin_create file) and the content of the sql script supplementing the tables (sql directory tin_init file)
* the base is ready to use
3. Current database schema diagram
* is located in the sql directory (project.png) and after starting the application on the home page

