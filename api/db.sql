create database btl_n6;
use btl_n6;
create table books (
    id int not null auto_increment,
    title varchar(300) not null unique,
    author varchar(300) not null,
    category varchar(300) not null,
    date date not null,
    numberPage int not null,
    image varchar(300) not null,
    description varchar(1000) not null,
    primary key (id)
);
alter table books auto_increment=100;
create table users(
    id int not null auto_increment,
    uname varchar(300) not null unique,
    passwd varchar(300) not null,
    email varchar(300) not null,
    primary key (id)
);
alter table users auto_increment=100;

create table refreshToken(
    id int not null auto_increment,
    token varchar(500) not null unique,
    primary key(id)
);
alter table refreshToken auto_increment=100;