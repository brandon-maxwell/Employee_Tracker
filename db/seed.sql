USE employee_DB;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineer'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 90000, 1),
('Salesperson', 90000, 1),
('Lead Engineer', 90000, 2),
('Software Engineer', 90000, 2),
('Accountant', 90000, 3),
('Legal Team Lead', 90000, 4),
('Lawyer', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ahmed', 'Decosta', 3, NULL),
('Joseph', 'Pangborn', 2, 1),
('Fae', 'Considine', 1, NULL),
('Alissa', 'Tipton', 4, 2),
('Merilyn', 'Sherrer', 5, NULL),
('John', 'Brown', 6, NULL),
('Jen', 'Richards', 7, 4);