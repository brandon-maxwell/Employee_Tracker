const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const { async } = require('rxjs');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Milo0322',
    database: 'employee_DB',
});

connection.connect((err) => {
    if (err) throw err;
    startPrompts();
});

const startPrompts = () => {
    inquirer
        .prompt({
            name: 'start',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Remove Role',
                'View All Departments',
                'Add Department',
                'Remove Department',
                'Quit'
            ],
        })
        .then((answer) => {
            switch (answer.start) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'View All Employees by Department':
                    viewByDepartment();
                    break;

                case 'View All Employees by Manager':
                    viewByManager();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;

                case 'Update Employee Manager':
                    updateManager();
                    break;

                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Remove Role':
                    removeRole();
                    break;

                case 'View All Departments':
                    viewAllDepartments();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Remove Department':
                    removeDepartment();
                    break;

                case 'Quit':
                    quit();
                    break;
            }
        });
};

//needs to console.table of all employees
const viewAllEmployees = () => {
    const query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee 
    INNER JOIN role 
    ON employee.role_id = role.id 
    INNER JOIN department
    ON role.department_id = department.id
    ORDER BY employee.id, employee.last_name`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();
    })
};

const viewByDepartment = () => {
    inquirer
        .prompt({
            name: 'viewDepartment',
            type: 'rawlist',
            message: 'Which department?',
            choices: [
                'Engineer',
                'Finance',
                'Sales',
                'Legal'
            ],
        })
        .then((answer) => {
            switch (answer.viewDepartment) {
                case 'Engineer':
                    viewEngineer();
                    break;

                case 'Finance':
                    viewFinance();
                    break;

                case 'Sales':
                    viewSales();
                    break;

                case 'Legal':
                    viewLegal();
                    break;
            }
        });
};

const viewByManager = () => {
    inquirer
        .prompt({
            name: 'viewByManager',
            type: 'rawlist',
            message: 'Which manager?',
            choices: [

            ],
        })
        .then((answer) => {
            switch (answer.viewByManager) {
                case 'Engineer':
                    viewEngineer();
                    break;

                case 'Finance':
                    viewFinance();
                    break;

                case 'Sales':
                    viewSales();
                    break;

                case 'Legal':
                    viewLegal();
                    break;
            }
        });

};

const addEmployee = async () => {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "Enter new employee's first name:",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "Enter new employee's last name:",
            },
            {
                name: 'role',
                type: 'list',
                message: "Enter new employee's role:",
                choices: [
                    'Sales Lead',
                    'Salesperson',
                    'Lead Engineer',
                    'Software Engineer',
                    'Accountant',
                    'Legal Team Lead',
                    'Lawyer'
                ],
            },
            {
                name: 'manager',
                type: 'list',
                message: "Enter new employee's manager:",
                choices: //Need to determine how to put sql info into array for this
            },
        ])
        .then((answer) => {

        })
    const query =
        ''
    console.log('Employee Added!')
};
const removeEmployee = () => {
    const query =
        ''
    console.table
};
const updateRole = () => {
    const query =
        ''
    console.table
};
const updateManager = () => {
    const query =
        ''
    console.table
};
const viewAllRoles = () => {
    const query =
        ''
    console.table
};
const addRole = () => {
    const query =
        ''
    console.table
};
const removeRole = () => {
    const query =
        ''
    console.table
};
const viewAllDepartments = () => {
    const query =
        `SELECT * FROM department`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        console.log(`\n`);
        startPrompts();
    })
};
const addDepartment = () => {
    const query =
        ''
    console.table
};
const removeDepartment = () => {
    const query =
        ''
    console.table
};
const quit = () => {

};

const viewEngineer = () => {
    const query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee 
    INNER JOIN role 
    ON employee.role_id = role.id 
    INNER JOIN department
    ON role.department_id = department.id
    WHERE department.name = 'Engineer'
    ORDER BY employee.id, employee.last_name`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();
    })
};

const viewFinance = () => {
    const query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee 
    INNER JOIN role 
    ON employee.role_id = role.id 
    INNER JOIN department
    ON role.department_id = department.id
    WHERE department.name = 'Finance'
    ORDER BY employee.id, employee.last_name`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();
    })
};

const viewSales = () => {
    const query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee 
    INNER JOIN role 
    ON employee.role_id = role.id 
    INNER JOIN department
    ON role.department_id = department.id
    WHERE department.name = 'Sales'
    ORDER BY employee.id, employee.last_name`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();
    })
};

const viewLegal = () => {
    const query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee 
    INNER JOIN role 
    ON employee.role_id = role.id 
    INNER JOIN department
    ON role.department_id = department.id
    WHERE department.name = 'Legal'
    ORDER BY employee.id, employee.last_name`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();
    })
};