# mp-03

 
* Node.JS
* express.js
* sequelize
* mysql2
* ejs
* bcryptjs

**About project**
-the student registraton system is created 

**Documentation**
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

**Admin Login view**

<img width="1440" alt="Screenshot 2023-02-07 at 11 46 16 AM" src="https://user-images.githubusercontent.com/124355163/217224219-cdabae8b-9f1b-43f3-a45e-e423975ea3b7.png">

**view from admin login**
<img width="1440" alt="Screenshot 2023-02-07 at 11 46 37 AM" src="https://user-images.githubusercontent.com/124355163/217224509-074e5593-b528-434a-a8d8-c15c71287bc2.png">

**Internationalization on website with two lang**

<img width="1440" alt="Screenshot 2023-02-07 at 11 46 47 AM" src="https://user-images.githubusercontent.com/124355163/217224745-0c8fb6c5-46ec-449b-bc87-020269632ff7.png">

**View from student login**
<img width="1440" alt="Screenshot 2023-02-07 at 11 47 10 AM" src="https://user-images.githubusercontent.com/124355163/217224796-d02959ce-3002-43cb-bd34-bc389237844b.png">


