const inquirer = require('inquirer');
const db = require('./db/connections');
const mysql = require('mysql2')
const cTable = require('console.table')

// prompt to present with all possible options
function menuPrompt () {
    inquirer
    .prompt({
    type: 'list',
    name: 'tables',
    message: 'Select an option',
    choices: [ 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role' ]
    })
    .then((res) => {
    switch(res.tables) {
      case 'View all departments': viewAllDepartments(); 
      break;
      case 'View all roles': viewAllRoles();
      break;
      case 'View all employees': viewAllEmployees();
      break;
      case 'Add a department': addDepartment();
      break;  
      case 'Add a role': addRole();
      break;  
      case 'Add an employee': addEmployee();
      break;
      case 'Update an employee role': updateEmployee();
      break;
      default: console.log('Select a valid option!')
      } 
    });
  }
menuPrompt()

// view employees
function viewAllEmployees() {

    const sql = `SELECT * FROM employee;`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        // if no error
        console.log(rows);
        menuPrompt()
    });
    // menuPrompt()
};

// employee prompt

// add employee
function addEmployee() {
    console.log("add");
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(rows);
        const roleMap = rows.map(row => {
            return {
                name: row.title,
                value: row.id
            }
        })
        console.log(roleMap);
        db.query(`SELECT * FROM employee`, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            const managers = rows.filter(employee => {
                if(employee.manager_id === null) {
                    return employee
                }
                
            });
            console.log(managers)
            const managerMap = managers.map(row => {
                return {
                    name: row.first_name + " " + row.last_name,
                    value: row.id
                }
            })
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is their first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is their last name?'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is their role?',
                    choices: roleMap
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is their manager?',
                    choices: managerMap
                }


            ])
            .then(employeeInfo => {
                const sql = `INSERT INTO employee SET ?`
                db.query(sql, employeeInfo, (err, res) => {
                    if(err){
                    console.log(err)
                }
            console.log('Successfully added employee!')
            });
                console.log(employeeInfo)
                menuPrompt()

            })
        });
    })
}


// view departments
function viewAllDepartments() {

    const sql = `SELECT * FROM department;`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        // if no error
        console.log(rows);
        menuPrompt()
    });
    // menuPrompt()
};
// view roles
function viewAllRoles() {

    const sql = `SELECT * FROM roles;`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        // if no error
        console.log(rows);
        menuPrompt()
    });
    // menuPrompt()
};
// update employee role
// add dept
// add role


// do something with choices (.then)

    // switch cases
    // function for each option

