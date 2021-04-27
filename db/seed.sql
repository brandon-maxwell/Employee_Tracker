USE employee_DB;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineer'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 75000, 1),
('Salesperson', 60000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 100000, 2),
('Accountant', 75000, 3),
('Legal Team Lead', 100000, 4),
('Lawyer', 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ahmed', 'Decosta', 1, NULL),
('Joseph', 'Pangborn', 2, 1),
('Fae', 'Considine', 3, NULL),
('Alissa', 'Tipton', 4, 3),
('Merilyn', 'Sherrer', 5, NULL),
('John', 'Brown', 6, NULL),
('Jen', 'Richards', 7, 4);