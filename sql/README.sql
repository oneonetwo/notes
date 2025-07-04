create table employee(
    id int primary key auto_increment,
    deptId varchar(20)
    constraint employee_dept_fk foreign key(deptId) references dept(id)
)

create table dept(
    id int primary key auto_increment,
    name varchar(20)
)

