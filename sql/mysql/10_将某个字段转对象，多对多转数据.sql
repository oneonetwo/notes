

1. 品牌信息 brand 放到一个单独的对象中 JSON_OBJECT
SELECT t_products.id as id, t_products.title as title, t_products.price as price,
  JSON_OBJECT('id', brands.id, 'name', brands.name, 'website', brands.website) as brand
  FROM `t_products` LEFT JOIN `brands` ON t_products.brand_id = brands.id WHERE price>4000;

2. 学生选课，将学生选择的课程信息 放在一个数组中
SELECT stu.id id, stu.name name, stu.age age, 
JSON_ARRAYAGG(JSON_OBJECT('id', cour.id, 'name', cour.name, 'price', cour.price)) AS courses FROM `students` stu 
LEFT JOIN `studens_select_courses` stu_cour ON stu.id=stu_cour.student_id 
LEFT JOIN `courses` cour ON stu_cour.course_id=cour.id 
WHERE cour.id  IS NOT NUll 
GROUP BY stu.id;
