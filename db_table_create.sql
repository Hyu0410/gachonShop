create table person (
loginid varchar(10) not null,
password varchar(10) not null,
name varchar(20) not null,
address varchar(50) null,
tel varchar(13) not null, 
birth varchar(8) not null, 
class varchar(2) not null, /*00 : CEO, 01 : 관리자, 02 : 일반고객 */
point int, 
PRIMARY KEY(loginid)
);

create table code_tbl (
main_id varchar(4) not null,
sub_id varchar(4) not null,
main_name varchar(100) not null,
sub_name varchar(100) not null,
start varchar(8) not null,
end varchar(8) not null,
PRIMARY KEY(main_id,sub_id)
);

create table merchandise (
mer_id int NOT NULL auto_increment,
category varchar(4) not null,
name varchar(100) not null,
price int not null,
stock int not null, 
brand varchar(100) not null, 
supplier varchar(100) not null, 
image varchar(50), 
sale_yn varchar(1),
sale_price int,
PRIMARY KEY(mer_id)
);

create table boardtype (
type_id int NOT NULL auto_increment,
title varchar(200) not null,
description varchar(400) ,
write_YN varchar(1) not null,
re_YN varchar(1) not null,
numPerPage int not null,
PRIMARY KEY(type_id)
);

create table board (
board_id int NOT NULL auto_increment,
type_id int ,
p_id int, 
loginid varchar(10) NOT NULL,
password varchar(20) NOT NULL,
title varchar(200) ,
date varchar(30) NOT NULL,
content text,
PRIMARY KEY(board_id)
);