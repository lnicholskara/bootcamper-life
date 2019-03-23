DROP DATABASE IF EXISTS bootcamp_db;
CREATE DATABASE bootcamp_db;

USE bootcamp_db;
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
    password_hash varchar(255) NOT NULL,
	first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
	campus varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	github_link varchar(255) NOT NULL,
	PRIMARY KEY (id)
);