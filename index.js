const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let db;
/*|
  */

dbInit();
async function dbInit(){
    try {
        // Connect to database
   db = await mysql.createConnection(
      {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
        database: 'employees_db'
      }
    );
      init();
  } catch (err) {
          console.log(err);
         
        }
      //   console.log('Connection Established');
      }



app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
  });
/* |  
 */



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
        process.exit(1)
    }else{

        switch (answers.mainMenu) {
            case 'Add Employee':
              addEmployee();
                break;
            case 'Update Employee Role':
              updateEmployee();  
                break;    
            case 'Add Role':
               addRole();
                break;    
            case 'Add Department':
                addDepartment(); 
            break;
            case 'View All Employees':    
                viewEmployees();
            
            break;
            case 'View all Roles':
                viewRoles();
            break;
            case 'View All Departments':
                viewDepartments();
            break;
            default:
           
                
            break;
            }
            
            
        }
        

}

async function viewEmployees (){
    const sql = `SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
    FROM employees
    INNER JOIN roles ON roles.id = employees.role_id 
    INNER JOIN departments ON departments.id = employees.department_id
    INNER JOIN managers ON managers.id = employees.manager_id
    ORDER BY employees.id;`;  
    const [rows, fields] = await db.query(sql)
 
       console.table(rows);
       askQuestions();
   }

async function viewRoles(){
    const sql = `SELECT roles.id, roles.title, departments.name as department, salary FROM roles
    INNER JOIN departments ON departments.id = roles.department_id ORDER BY roles.id;`;  
    const [rows, fields] = await db.query(sql)
     console.table(rows);
     askQuestions();
}

async function viewDepartments(){
    const sql = `SELECT * FROM departments
    ORDER BY departments.name;`;  
    const [rows, fields] = await db.query(sql)
     console.table(rows);
     askQuestions();
}

async function addEmployee (){
    try {
             const fName = await inquirer.prompt({
                 type: 'input',
                 name: 'firstName',
                 message: 'What is the Employee\'s first name? ',
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
                 })
                 const lName = await inquirer.prompt({
                     type: 'input',
                     name: 'lastName',
                     message: 'What is the Employee\'s last name? ',
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
                     })
                     const [roles] = await db.query(`SELECT id, title as role
     FROM roles`);
                 const {empRole} = await inquirer.prompt({
                     name: 'empRole',
                     type: 'list',
                     message: 'What is the Employee\'s role?  ',
                     choices: roles.map(role => ({name: role.role, value: role}) )
                 })
                 const [mgrs] = await db.query(`SELECT name as managerName FROM managers;`);
                     const {mgrName} = await inquirer.prompt({
                         name: 'mgrName',
                         type: 'list',
                         message: 'Who is the Employee\'s manager? Use self if they are the manager? ',
                         choices: mgrs.map(mgr => ({name: mgr.managerName, value: mgr}) )
                     })
                 const dptId = await db.query(`SELECT departments.id as department
                 FROM roles
                 INNER JOIN departments ON departments.id = roles.department_id
                 WHERE title = '${empRole.role}';`);
                 const mgrId = await db.query(`SELECT id FROM managers WHERE name = \'${mgrName.managerName}\';`);    
                 const roleId =  await db.query(`SELECT id FROM roles WHERE title = \'${empRole.role}\'; `)
                 params =  await (`\"${fName.firstName}\", \"${lName.lastName}\", \"${roleId[0][0].id}\", \"${dptId[0][0].department}\", \"${mgrId[0][0].id}\"`);
                 await db.query(`INSERT INTO employees (firstName,lastName,role_id, department_id, manager_id ) VALUES (${params});`);
                 console.log(`${fName.firstName} ${lName.lastName} was added to the database.`)    
             } catch (err) {
                  console.log(err);
                  process.exit(1);
              }
                 askQuestions();
             }


async function updateEmployee (){
    try {
        const [empNames] = await db.query(`Select concat(firstName, " ", lastName) as employeeName, id
        FROM employees;`);
        const {upEmp} = await inquirer.prompt({
            name: 'upEmp',
            type: 'list',
            message: 'Which employee\'s role would you like to update? ',
            choices: empNames.map(empName => ({name: empName.employeeName, value: empName}) )
        })
        console.log(upEmp.employeeName);
         const [empRoles] = await db.query(`SELECT id, title as role
         FROM roles;`); 
         const {upRole} = await inquirer.prompt({
            name: 'upRole',
            type: 'list',
            message: 'What is the employee\'s new role? ',
            choices: empRoles.map(empRole => ({name: empRole.role, value: empRole}) )
        })
       saveRole = await upRole.role;
        console.log(saveRole);
        const evalInput = await db.query(`SELECT id
        FROM roles
        WHERE roles.title = \'${upRole.role}\';`);
        let nameId = await db.query(`Select id
        FROM employees
        WHERE concat(firstName, " ", lastName)  = "${upEmp.employeeName}";`);
        await db.query(`UPDATE employees SET role_id = ${evalInput[0][0].id} WHERE ID = ${nameId[0][0].id};`)


        console.log(`Updated ${upEmp.employeeName}'s role.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    } 
        askQuestions();     
    
   
}


async function addRole(){
 try {
    const db= await mysql.createConnection({host:'localhost', user: 'root', database: 'employees_db'});
    const newRole = await inquirer.prompt({
               type: 'input',
               name: 'role',
               message: 'What is the name of the role you wish to add? ',
               validate(value) {
                   const fails = value.match(
                       /([0-9])/i
                       );
                       if (fails || value === "") {
                           return 'Please enter in a valid role.';
                           
                       }
                       return true;
                   },
                   filter(value) {
                       value.toLowerCase();
                       return value.charAt(0).toUpperCase() + value.slice(1);
                   }, 
               })
    const [departs] = await db.query(`SELECT departments.name as department
    FROM departments;`);
        const {daDep} = await inquirer.prompt({
            name: 'daDep',
            type: 'list',
            message: 'Which department does the role belong to? ',
            choices: departs.map(depart => ({name: depart.department, value: depart}) )
         })
    const newSalary = await inquirer.prompt({
            type: 'number',
            name: 'salary',
            message: 'What is the salary amount? ',
            })
    const deptId = await db.query(` SELECT id
    FROM departments
    WHERE name = '${daDep.department}';`);
    let params = await (`\"${newRole.role}\", \"${deptId[0][0].id}\", \"${newSalary.salary}\"`);
    await db.query(`INSERT INTO roles (title, department_id, salary) VALUES (${params});`)
    console.log(`${newRole.role} was added to the database.`)
    askQuestions();
 } catch (err) {
    console.log(err);
 }   
}    
async function addDepartment(){
    try {
       const newDep = await inquirer.prompt({
           type: 'input',
           name: 'name',
           message: 'What is the name of the department you wish to add? ',
           validate(value) {
               const fails = value.match(
                   /([0-9])/i
                   );
                   if (fails || value === "") {
                       return 'Please enter in a valid department name.';
                       
                   }
                   return true;
               },
               filter(value) {
                   value.toLowerCase();
                   return value.charAt(0).toUpperCase() + value.slice(1);
               }, 
           })
           
           db.query(`INSERT INTO departments (name) VALUE ('${newDep.name}');`)
       } catch (err) {
           console.log(err);
           process.exit(1);
       }
       askQuestions();
}

