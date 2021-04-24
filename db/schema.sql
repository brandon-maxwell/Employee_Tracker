DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;
USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL(8,2) NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) references department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  FOREIGN KEY (role_id) references role(id),
  FOREIGN KEY (manager_id) references employee(id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
