const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
require ('dotenv').config();

let roleChoiceArray = [];
let managerChoiceArray = [];
let deptChoiceArray = [];

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
    const rolesArray = await roleChoices();
    const roleChoicesTitle = rolesArray.map(r => r.title);
    const managersArray = await managerChoices();
    const managerChoicesName = managersArray.map(m => m.first_name);
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
                choices: roleChoicesTitle,
            },
            {
                name: 'manager',
                type: 'list',
                message: "Enter new employee manager's name:",
                choices: managerChoicesName,
            }
        ])
        .then((answer) => {
            const query = 'INSERT INTO employee SET ?';
            connection.query(
                query,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleChoiceArray.find(r => r.title == answer.role).id,
                    manager_id: managerChoiceArray.find(m => m.first_name == answer.manager).id,
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

const updateRole = async () => {
    const rolesArray = await roleChoices();
    const roleChoicesTitle = rolesArray.map(r => r.title);
    const employeeArray = await employeeChoices();
    const employeeChoicesName = employeeArray.map(e => e.first_name);

    inquirer
        .prompt([
            {
                name: 'getEmployee',
                type: 'list',
                message: 'Which employee role do you want to update?',
                choices: employeeChoicesName,
            },
            {
                name: 'updatedRole',
                type: 'list',
                message: 'What is their new role?',
                choices: roleChoicesTitle,
            }
        ])
        .then((answer) => {
            const query = 'UPDATE employee SET ? WHERE ?';
            connection.query(
                query,[
                {
                 role_id: roleChoiceArray.find(r => r.title == answer.updatedRole).id,   
                },
                {
                 id: employeeChoiceArray.find(e => e.first_name == answer.getEmployee).id,   
                }],
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n Role Updated! \n`)
                    startPrompts();        
                }
            )
        });
    
        
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

const addRole = async () => {
    const deptArray = await deptChoices();
    const deptChoiceName = deptArray.map(d => d.name);

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
                    type: 'list',
                    message: 'Enter department of new role:',
                    choices: deptChoiceName,
                },
            ])
            .then((answer) => {
                const query =
                    'INSERT INTO role SET ?';

                connection.query(
                    query, 
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: deptChoiceArray.find(d => d.name == answer.department_id).id,   
                    },                    
                    (err, res) => {
                    if (err) throw err;
                    console.log(`\n New role was added \n`)
                    startPrompts();
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
                    const confirmation = console.log(`\n New department was added \n`)
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
 
const roleChoices = async ()=> {
    return new Promise((resolve,reject) => {

    roleChoiceArray = [];
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) reject(err);
        for (var i = 0; i < res.length; i++) {
            roleChoiceArray.push(res[i]);
        }
        resolve(roleChoiceArray);
    })
})
};

const managerChoices = async ()=> {
    return new Promise((resolve,reject) => {

    managerChoiceArray = [];
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) reject (err);
        for (var i = 0; i < res.length; i++) {
            managerChoiceArray.push(res[i]);
        }
        resolve (managerChoiceArray);
    })
})
};

const deptChoices = async ()=> {
    return new Promise((resolve,reject) => {

    deptChoiceArray = [];
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) reject(err);
        for (var i = 0; i < res.length; i++) {
            deptChoiceArray.push(res[i]);
        }
        resolve(deptChoiceArray);
    })
})
};

const employeeChoices = async ()=> {
    return new Promise((resolve,reject) => {

    employeeChoiceArray = [];
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) reject (err);
        for (var i = 0; i < res.length; i++) {
            employeeChoiceArray.push(res[i]);
        }
        resolve (employeeChoiceArray);
    })
})
};
