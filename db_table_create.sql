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