const inquirer = require('inquirer');
const db = require('./db/connection');
const mysql = require('mysql2')
// const console = require('console.table')

// prompt to present with all possible options
// menuPrompt()

// view employees
function viewEmployees() {

    const sql = `SELECT * FROM employee;`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        // if no error
        console.log(rows);
    });
    // menuPrompt()
};

// employee prompt

// add employee
function addEmployees() {
    console.log("add")
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(rows)
        const roleMap = rows.map(row => {
            return {
                name: row.title,
                value: row.id
            }
        })
        console.log(roleMap)
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is their first name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is their last name?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is their role?',
                    choices: roleMap
            }


            ])
            .then(employeeInfo => {
            //     const sql = `INSERT INTO employee (name, description)
            // VALUES (?, ?, ?, ?)
            // `
                console.log(employeeInfo)
            })
    
    })
}

console.log("hit");
addEmployees()


// view departments
// view roles
// update employee role
// add dept
// add role


// do something with choices (.then)

    // switch cases
    // function for each option

