const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

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
                // 'View All Employees by Manager',
                'Add Employee',
                // 'Remove Employee',
                'Update Employee Role',
                // 'Update Employee Manager',
                'View All Roles',
                'Add Role',
                // 'Remove Role',
                'View All Departments',
                'Add Department',
                // 'Remove Department',
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

                /*
                case 'View All Employees by Manager':
                    viewByManager();
                    break;
                */
                case 'Add Employee':
                    addEmployee();
                    break;
                /*
                case 'Remove Employee':
                    removeEmployee();
                    break;
                */
                case 'Update Employee Role':
                    updateRole();
                    break;
                /*
                case 'Update Employee Manager':
                    updateManager();
                    break;
                */
                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;
                /*
                case 'Remove Role':
                    removeRole();
                    break;
                */
                case 'View All Departments':
                    viewAllDepartments();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;
                /*
                case 'Remove Department':
                    removeDepartment();
                    break;
                */
                case 'Quit':
                    quit();
                    break;
            }
        });
};

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

const viewByDepartment = async () => {
    const initalQuery =
        `SELECT name FROM department`;
    connection.query(initalQuery, (err, res) => {
        if (err) throw err;
        let choiceArray = [];
        for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].name);
            console.log(choiceArray)
        }

        inquirer
            .prompt({
                name: 'viewDepartment',
                type: 'rawlist',
                message: 'Which department?',
                choices: choiceArray,
            })
            .then((answer) => {

                const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = ? ORDER BY employee.id, employee.last_name';

                connection.query(
                    query,
                    answer.viewDepartment,
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n`);
                        console.table(res);
                        startPrompts();
                    })

            })
    });
};

/*
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
*/

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
                choices: //Need to determine how to put sql info into array for this
                    [

                    ],
            },
            {
                name: 'manager',
                type: 'list',
                message: "Enter new employee's manager:",
                choices: //Need to determine how to put sql info into array for this
                    [

                    ],
            }
        ])
        .then((answer) => {
            const query =
                `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?)`

            console.log('Employee Added!')

        });
};

/*
const removeEmployee = () => {
    const query =
        ''
    console.table
};
*/

const updateRole = () => {
    const query =
        ''
    console.table
};

/*
const updateManager = () => {
    const query =
        ''
    console.table
};
*/

const viewAllRoles = () => {
    const query =
        `SELECT * FROM role`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();

    });
}

const addRole = () => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Enter name of new role:'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Enter salary of the new role:'
                },
                {
                    name: 'department_id',
                    type: 'input',
                    message: 'Enter department of new role:',
                    choices: [

                    ]
                },
            ])
            .then((answer) => {
                const query =
                    `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.department_id}')`;

                connection.query(query, (err, res) => {
                    if (err) throw err;
                    const confirmation = console.log(`\n New role was added`)
                    resolve(confirmation)
                    startPrompts();
                })
            })
    })
};

/*
const removeRole = () => {
    const query =
        ''
    console.table
};
*/

const viewAllDepartments = () => {
    const query =
        `SELECT * FROM department`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
        startPrompts();
    })
};

const addDepartment = () => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'input',
                    message: 'Enter name of new department:'
                }
            ])
            .then((answer) => {
                const query =
                    `INSERT INTO department (name) VALUES ('${answer.department}')`;

                connection.query(query, (err, res) => {
                    if (err) throw err;
                    const confirmation = console.log(`\n New department was added`)
                    resolve(confirmation)
                    startPrompts();
                })
            })
    })
};

/*
const removeDepartment = () => {
    const query =
        ''
    console.table
};
*/

const quit = () => {
    console.log(`\n Exited Employee Tracker`)
    connection.end()
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