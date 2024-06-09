-- 学生表和课程表 一个学生选多个课程,一个课程对应多个学生
-- 多对多的关系: 建立一张关系表.分层架构的思想

1. 创建学生表
CREATE TABLE IF NOT EXISTS `students`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  age INT
);
INSERT INTO `students` (name, age) VALUES ('why', 18);

2. 创建课程表
CREATE TABLE IF NOT EXISTS `courses`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  price DOUBLE NOT NULL
);
INSERT INTO `courses` (name, price) VALUES ('英语', 100);
INSERT INTO `courses` (name, price) VALUES ('自然', 100);
3. 创建学生选择课程的关系表
CREATE TABLE IF NOT  EXISTS `studens_select_courses`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES  students(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (course_id) REFERENCES  courses(id) ON UPDATE CASCADE ON DELETE CASCADE
)

INSERT INTO `studens_select_courses` (student_id, course_id) VALUES (1, 1);

4. 查询所有选过课学生选择的所有课程
-- 内连接 只能看出来值不为null的
SELECT * FROM `students` JOIN `studens_select_courses` ON students.id=studens_select_courses.student_id  JOIN `courses` ON studens_select_courses.course_id=courses.id;
-- 表明可以使用别名
SELECT stu.id stuId, stu.name stuName, stu.age stuAge, cour.name courName, cour.price courPrice FROM `students` stu 
JOIN `studens_select_courses` stu_cour ON stu.id=stu_cour.student_id  
JOIN `courses` cour ON stu_cour.course_id=cour.id;

5. 所有学生的选课的情况(选没选课都查询)
SELECT stu.id stuId, stu.name stuName, stu.age stuAge, cour.name courName, cour.price courPrice FROM `students` stu 
LEFT JOIN `studens_select_courses` stu_cour ON stu.id=stu_cour.student_id  
LEFT JOIN `courses` cour ON stu_cour.course_id=cour.id;

6. 单个学生的选课情况
SELECT stu.id stuId, stu.name stuName, stu.age stuAge, cour.name courName, cour.price courPrice FROM `students` stu 
LEFT JOIN `studens_select_courses` stu_cour ON stu.id=stu_cour.student_id  
LEFT JOIN `courses` cour ON stu_cour.course_id=cour.id
WHERE stu.name = 'lily';

7. 查看哪些学生没选择课程
SELECT stu.id stuId, stu.name stuName, stu.age stuAge, cour.name courName, cour.price courPrice FROM `students` stu 
LEFT JOIN `studens_select_courses` stu_cour ON stu.id=stu_cour.student_id  
LEFT JOIN `courses` cour ON stu_cour.course_id=cour.id
WHERE cour.id  IS NUll;

8. 查看哪些课程没有被选择
SELECT stu.id stuId, stu.name stuName, stu.age stuAge, cour.name courName, cour.price courPrice FROM `students` stu 
RIGHT JOIN `studens_select_courses` stu_cour ON stu.id=stu_cour.student_id  
RIGHT JOIN `courses` cour ON stu_cour.course_id=cour.id
WHERE stu.id  IS NUll;