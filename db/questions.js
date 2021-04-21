const inquirer = require('inquirer');

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
            switch (answer.action) {
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

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

//needs to console.table of all employees
const viewAllEmployees = () => {
    const query = 
      'SELECT * FROM '
    console.table
};

const viewByDepartment = () => {
    const query =
      ''
    console.table  
};

const viewByManager = () => {
    const query =
      ''
    console.table  
};

const addEmployee = () => {
    const query =
      ''
    console.table  
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
      ''
    console.table  
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
    const query =
      ''
    console.table  
};
