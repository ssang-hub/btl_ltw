create database btl2_ltw;
use btl2_ltw;
create table books(
	id int not null auto_increment,
    title varchar(200)  not null,
    author varchar(250) not null,
    category varchar(300) not null,
    price int not null,
    date date not null,
    numberPage int not null,
    image varchar(300) not null,
    description varchar(3000) not null,
    primary key (id)
);
alter table books auto_increment = 100;

create table users(
	id int not null auto_increment,
    uname varchar(200)  not null,
    passwd varchar(250) not null,
    fullName varchar(300),
	email varchar(300) ,
    address varchar(300) ,
    numberPhone varchar(45) ,
    isAdmin boolean,
    primary key(id)
);
alter table users auto_increment = 100;

create table CartItem(
	id int not null auto_increment,
    userID int not null,
    bookID int not null,
    quantity int not null,
	primary key(id),
    foreign key(userID) references users(id),
    foreign key(bookID) references books(id)
);
alter table CartItem auto_increment = 100;


create table bookReview(
	id int not null auto_increment,
    userID int not null,
    bookID int not null,
    numberVote int not null,
    content varchar(1230) not null,
	primary key(id),
    foreign key(userID) references users(id),
    foreign key(bookID) references books(id)
);
alter table bookReview auto_increment = 100;

create table Orders(
	id int not null auto_increment,
    UserID int not null,
    createAt date not null,
	primary key(id),
    foreign key(UserID) references users(id) 
);
alter table Orders auto_increment = 100;
create table OrderLine(
	id int not null auto_increment,
    OrderID int not null,
    BookID int not null,
    quantity int not null,
	primary key(id),
    foreign key(OrderID) references Orders(id),
    foreign key(BookID) references books(id)
);
alter table OrderLine auto_increment = 100;