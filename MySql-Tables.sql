-- Drop the database if exists
   DROP DATABASE IF EXISTS GoGood;

-- Create the database
CREATE DATABASE GoGood;

-- Use the created database
USE GoGood;

-- Drop all tables if they exist
DROP TABLE IF EXISTS UserGoGood;
DROP TABLE IF EXISTS EnumProfession;
DROP TABLE IF EXISTS GivingHelpPerProfession;
DROP TABLE IF EXISTS StatusType;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS GivingHelpOwnerPost;
DROP TABLE IF EXISTS recommendation;
DROP TABLE IF EXISTS traslator;
DROP TABLE IF EXISTS Log;

-- Create tables
CREATE TABLE UserGoGood(
    id int AUTO_INCREMENT PRIMARY KEY,
    fullName varchar(50),
    phone varchar(15) NOT NULL UNIQUE,
    imgURL varchar(250),
    imei varchar(100),
    userType varchar(50)
);

CREATE TABLE EnumProfession(
    id int AUTO_INCREMENT PRIMARY KEY,
    category varchar(50),
    icon varchar(250)
);

CREATE TABLE GivingHelpPerProfession(
    id int AUTO_INCREMENT PRIMARY KEY,
    categoryId int,
    GivingHelpId int,
    FOREIGN KEY (categoryId) REFERENCES EnumProfession(id),
    FOREIGN KEY (GivingHelpId) REFERENCES UserGoGood(id)
);

CREATE TABLE StatusType(
    id int AUTO_INCREMENT PRIMARY KEY,
    statusType varchar(50),
    icon varchar(1500)
);

CREATE TABLE Post(
    id int AUTO_INCREMENT PRIMARY KEY,
    categoryId int,
    GettingHelpId int,
    problemTitle varchar(2000),
    problemDescription varchar(4000),
    problemPic varchar(3500),
    StatusTypeId int,
    dateUpdete DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    latitude float,
    longitude float,
    FOREIGN KEY (categoryId) REFERENCES EnumProfession(id),
    FOREIGN KEY (GettingHelpId) REFERENCES UserGoGood(id),
    FOREIGN KEY (StatusTypeId) REFERENCES StatusType(id)
);


CREATE TABLE GivingHelpOwnerPost(
    id int AUTO_INCREMENT PRIMARY KEY,
    postId int,
    GivingHelpId int,
    FOREIGN KEY (postId) REFERENCES Post(id),
    FOREIGN KEY (GivingHelpId) REFERENCES UserGoGood(id)
);

CREATE TABLE recommendation(
    id int AUTO_INCREMENT PRIMARY KEY,
    postId int,
    review varchar(3500),
    rate float,
    whoGaveItId int, -- userGoGoodId
    whoGotItId int, -- userGoGoodId 
	reviewDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (postId) REFERENCES Post(id)
);


/*
old one 
CREATE TABLE recommendation(
    id int AUTO_INCREMENT PRIMARY KEY,
    GivingHelpOwnerPostId int,
    review varchar(3500),
    rate float,
    FOREIGN KEY (GivingHelpOwnerPostId) REFERENCES GivingHelpOwnerPost(id)
);
*/

 
CREATE TABLE traslator(
    id int AUTO_INCREMENT PRIMARY KEY,
    he varchar(70),
    en varchar(70)
);

CREATE TABLE Log(
    id int AUTO_INCREMENT PRIMARY KEY,
    description varchar(3000),
    Type INT,
    time_log DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

