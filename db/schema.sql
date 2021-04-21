DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  raw_total DECIMAL(8,2) NULL,
  --needs to reference dept role for dept id
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  --needs to reference role employee has
  role_id INT NULL,
  --needs to reference manager of employee - if none null
  manager_id INT NULL
  PRIMARY KEY (id)
);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
