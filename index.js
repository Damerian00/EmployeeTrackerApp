const inquirer = require('inquirer');
// const db = require('./server');
const sql = require('./index');
let empRoleArr = [];
let empMgrArr = [];
/*|
  */
const mysql = require('mysql2');
const express = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employees_db'
  }
);

db.connect((err) => {
  if (err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection Established');
})


// async function viewDepartments (){
//   try {
//   app.get('/api/employees', (req, res) => {
//     const sql = `SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
//     FROM employees
//     INNER JOIN roles ON roles.id = employees.role_id 
//     INNER JOIN departments ON departments.id = employees.department_id
//     INNER JOIN managers ON managers.id = employees.manager_id
//     ORDER BY employees.id;`;  
  
//     console.table(rows)
   
//    } );
// } catch (error) {
//      res.status(500).json({ error: err.message });
//      return;
// }

app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
  });
/* |  
 */

init();

function init (){
console.log(
    `
 ,______________________________________________________.
 |                                                      |
 |    ______                _                           |
 |   | _____|_ __ ___ _ __ | | ___  _   _  ___  ___     |
 |   |   _| | '_ ' _ \\| '_\\| |/ _ \\| | | |/ _ \\/ _ \\    |
 |   |  |___| | | | | | |_)| | (_) | |_| |   _/  _ /    |
 |   |______|_| |_| |_| ,_/|_|\\___/\\__,  |\\___|\\___|    |
 |                    |_|           |___/               |
 |                                                      |
 |                                                      |
 |    __  __                                            |
 |   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __          |
 |   | |\\/| |/ _' | '_ \\ / _' |/ _' |/ _ \\ '__|         |              
 |   | |  | | (_| | | | | (_| | (_| |  __/ |            |
 |   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|            |
 |                             |___/                    |
 |                                                      |
 '------------------------------------------------------'
`
);

askQuestions();

 }


 function askQuestions (){
    const questions = [
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do? :',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
             'View all Roles', 'Add Role', 'View All Departments', 'Add Department',
            'Quit']
        }
       
    ];
    inquirer.prompt(questions).then((answers) => {
       moreQuestions(answers);  
 });
        
}

function moreQuestions(answers){
    if (answers.mainMenu === "Quit"){
        db.end();
    }else{

        switch (answers.mainMenu) {
            case 'Add Employee':
              addEmployee();
                break;
            case 'Update Employee Role':
              updateEmployee(answers);  
                break;    
            case 'Add Role':
               addRole(answers);
                break;    
            case 'Add Department':
                addDepartment(answers); 
            break;
            case 'View All Employees':    
            viewEmployees();
            
            break;
            default:
                
                break;
            }
            
            
        }
        

}

function viewEmployees (){
    const sql = `SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
       FROM employees
       INNER JOIN roles ON roles.id = employees.role_id 
       INNER JOIN departments ON departments.id = employees.department_id
       INNER JOIN managers ON managers.id = employees.manager_id
       ORDER BY employees.id;`;  
       db.query(sql, (err, rows) => {
         if (err) {
             console.log(err);

           return;
         }
          
         

         console.log(' ');
        console.log(` 
id  first_name      last_name      title               department                    salary         manager
--- -------------  --------------  ------------------  --------------------------    -------------- ------------------
         `);
        rows.forEach( (row) =>{
           console.log(`
${row.id}    ${row.First_Name}          ${row.Last_Name}            ${row.Title}             ${row.Department}              ${row.salary}           ${row.Manager_Name}`);
        }) 
        console.log(' ');
            

       });
        askQuestions();
   }
function addEmployee (){
    let sql = `SELECT title as role
    FROM roles
    ORDER BY role;`;  
       db.query(sql, (err, rows) => {
         if (err) {
             console.log(err);
             
             return;
            }
            rows.forEach( (row) =>{
                empRoleArr.push(row.role);
            }) 
        })
        sql = `SELECT name as managerName FROM managers;`;  
           db.query(sql, (err, rows) => {
             if (err) {
                 console.log(err);
                 
                 return;
                }
                rows.forEach( (row) =>{
                    empMgrArr.push(row.managerName);
                }) 
            })
    
        const questions = [
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the Employee\'s first name? :',
                validate(value) {
                    const fails = value.match(
                        /([0-9])/i
                        );
                        if (fails || value === "") {
                            return 'Please enter in a valid name.';
                            
                        }
                        return true;
                    },
                    filter(value) {
                        value.toLowerCase();
                        return value.charAt(0).toUpperCase() + value.slice(1);
                    },
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the Employee\'s last name? :',
                    validate(value) {
                        const fails = value.match(
                            /([0-9])/i
                            );
                            if (fails || value === "") {
                                return 'Please enter in a valid name.';
                                
                            }
                            return true;
                        },
                        filter(value) {
                            value.toLowerCase();
                            return value.charAt(0).toUpperCase() + value.slice(1);
                        },
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the Employee\'s role? :',
            choices: empRoleArr,
        },
        {
            type: 'list',
            name: 'employeeMgr',
            message: 'Who is the Employee\'s manager? Use self if they are the manager. :',
            choices: empMgrArr,
        },
        
    ];
    inquirer.prompt(questions).then((answers) => {
        console.log(`Added ${answers.firstName} ${answers.lastName} to the databse.`);
            
    });
}

function updateEmployee (menuChoice){
    let tempObject = menuChoice;
    const questions = [
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the Employee\'s first name? :',
            validate(value) {
                const fails = value.match(
                  /([0-9])/i
                );
                if (fails || value === "") {
                    return 'Please enter in a valid name.';
                 
                }
                    return true;
              },
              filter(value) {
                value.toLowerCase();
                return value.charAt(0).toUpperCase() + value.slice(1);
              },
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the Employee\'s last name? :',
            validate(value) {
                const fails = value.match(
                  /([0-9])/i
                );
                if (fails || value === "") {
                    return 'Please enter in a valid name.';
                 
                }
                    return true;
              },
              filter(value) {
                  value.toLowerCase();
                return value.charAt(0).toUpperCase() + value.slice(1);
              },
        },
    ];
    inquirer.prompt(questions).then((answers) => {
        console.log(`Updated ${answers.firstName} ${answers.lastName} the databse.`);
        // askQuestions();     
    });
   
}
function addRole(menuChoice){
    let tempObject = menuChoice;
    console.log(`Added to the database.`);
    // askQuestions();
}
function addDepartment(menuChoice){
    let tempObject = menuChoice;
    console.log(`Addded to the database.`);
    // askQuestions();
}

module.exports = sql