const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
require ('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
                'View All Roles',
                'View All Departments',
                'Add Department',
                'Add Employee',
                'Add Role',
                'Update Employee Role',
                'Quit'
                // 'View All Employees by Manager',
                // 'Update Employee Manager',
                // 'Remove Employee',
                // 'Remove Role',
                // 'Remove Department',
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
                message: "Enter new employee's role ID (see role table for reference):",
                choices: roleChoices(),
            },
            {
                name: 'manager',
                type: 'list',
                message: "Enter new employee manager's employee ID (see employee table for reference):",
                choices: managerChoices(),
            }
        ])
        .then((answer) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id) VALUES ?';
            connection.query(
                query,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee Added!')
                    startPrompts();        
                }
            )
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
    connection.query("SELECT id FROM department", (err, res) => {
        if (err) throw err;
        let addRoleArray = [];
        for (var i = 0; i < res.length; i++) {
            addRoleArray.push(res[i].id);
        }

        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Enter name of new role:'
                },
                {
                    name: 'salary',
                    type: 'number',
                    message: 'Enter salary of the new role:'
                },
                {
                    name: 'department_id',
                    type: 'number',
                    message: 'Enter department ID of new role:',
                },
            ])
            .then((answer) => {
                const query =
                    `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.department_id}')`;

                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.log(`\n New role was added`)
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
 
const roleChoices = ()=> {
    let roleChoiceArray = [];
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleChoiceArray.push(res[i].id);
        }
    })
    return roleChoiceArray;
};

// const managerChoices = ()=> {
//     let managerChoiceArray = [];
//     connection.query("SELECT * FROM employee", (err, res) => {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//             managerChoiceArray.push(res[i].id);
//         }
//     })
//     return managerChoiceArray;
// };
