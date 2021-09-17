# Basic Banking System

- Front-end : React.js

- Back-end : Nodejs

- Database : MySQL

- Server : MySQL Server

## :point_down:Steps to initialize the project:

- Clone the repository
```
$ git clone https://github.com/anjupriya-v/basic-banking-system.git
```
- Redirect to the cloned repo directory

### :point_down:Steps to start the client
```
$ cd client
```
- Install the dependencies
```
$ npm install
```
- start the client
```
$ npm start
```
### :point_down:Steps to setup the database

- First, Install the mysql server

$ download link - https://dev.mysql.com/downloads/mysql/

- Then create the connection.

- create the database called bbs_database
```
create database bbs_database;
```

- create the table called 'bbs_allcustomers;
```
CREATE TABLE `bbs_allcustomers` (
  `customerID` int DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `dateWithTime` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

- Then Create Another Table;
```
CREATE TABLE `bbs_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(20) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `senderCustomerID` int DEFAULT NULL,
  `senderName` varchar(20) DEFAULT NULL,
  `senderEmail` varchar(20) DEFAULT NULL,
  `senderAmount` int DEFAULT NULL,
  `receiverCustomerID` int DEFAULT NULL,
  `receiverName` varchar(20) DEFAULT NULL,
  `receiverEmail` varchar(20) DEFAULT NULL,
  `receiverAmount` int DEFAULT NULL,
  `amountTransacted` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3630 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

- Then, replace with your host name,database Name,password and user name in `/sever/index.js` 

![CodeImage](https://user-images.githubusercontent.com/84177086/133745796-1c348607-2f86-4a71-81b8-08ce282c18ff.png)

### :point_down:Steps to start the server 
```
$ cd sever
```
- Install the dependencies
```
$ npm install
```
- start the server
```
npm start
```
