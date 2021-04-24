USE employee_DB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ahmed', 'Decosta', 3, 1),
('Joseph', 'Pangborn', 2, 1),
('Fae', 'Considine', 1, 1),
('Alissa', 'Tipton', 4, 1),
('Merilyn', 'Sherrer', 5, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 90000, 1),
('Salesperson', 90000, 1),
('Lead Engineer', 90000, 1),
('Software Engineer', 90000, 1),
('Accountant', 90000, 1),
('Legal Team Lead', 90000, 1),
('Lawyer', 90000, 1);

INSERT INTO department (name)
VALUES ('Sales'), ('Engineer'), ('Finance'), ('Legal');