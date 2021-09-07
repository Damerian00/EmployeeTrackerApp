const inquirer = require('inquirer');
// const db = require('./server');
const sql = require('./index');
let empRoleArr = [];
let empMgrArr = [];
let empNameArr = [];
let empDepArr = [];
let tempAns;
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
//   console.log('Connection Established');
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
        process.exit(1)
    }else{

        switch (answers.mainMenu) {
            case 'Add Employee':
              addEmployee();
                break;
            case 'Update Employee Role':
              updateEmployee(answers);  
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
            case 'Update Employee Role':
            updateEmployee();
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

         console.log(`
id  first_name      last_name      title               department                    salary         manager
--- -------------  --------------  ------------------  --------------------------    -------------- ------------------`);
Object.keys(rows).forEach( function(key) {
            let row = rows[key]
           console.table(`
${row.id}    ${row.First_Name}          ${row.Last_Name}            ${row.Title}             ${row.Department}              ${row.salary}           ${row.Manager_Name}`);
        }) 
        console.log(' ');
        askQuestions();
       });
       
   }

function viewRoles(){
    const sql = `SELECT roles.id, roles.title, departments.name as department, salary FROM roles
    INNER JOIN departments ON departments.id = roles.department_id ORDER BY roles.id;`;  
    db.query(sql, (err, rows) => {
      if (err) {
          console.log(err);

        return;
      }
       
      

     console.log(` 
id  title               department                    salary        
--- -------------      --------------------------    -------------- `);
Object.keys(rows).forEach( function(key) {
            let row = rows[key]
        console.table(`
${row.id}   ${row.title}             ${row.department}                         ${row.salary}`);
     }) 
     console.log(' ');
     askQuestions();
    });
}

function viewDepartments(){
    const sql = `SELECT * FROM departments
    ORDER BY departments.name;`;  
    db.query(sql, (err, rows) => {
      if (err) {
          console.log(err);

        return;
      }
       
      

      console.log(' ');
     console.log(` 
id  department  
--- -------------`);
Object.keys(rows).forEach( function(key) {
    let row = rows[key]
    console.table(`${row.id}   ${row.name}`); 
//         rows.forEach( (row) =>{
//         console.log(`
// ${row.id}    ${row.name}`);
     }) 
     console.log(' ');
         

     askQuestions();
    });

}

function addEmployee (){
    let daRole;
    let daDep;
    let daMgr;
    let params;
    let sql = `SELECT id, title as role
    FROM roles`;  
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
        tempAns = answers;
        return answers;})
   
        
        .then(()=>{
            let answers = tempAns;      
        for (let i = 0; i < empRoleArr.length; i++) {
            const el = empRoleArr[i];
            if (el === answers.employeeRole){
                daRole = i+1;
                i = empRoleArr.length;
            } else {
                
            }
        }
        for (let i = 0; i < empMgrArr.length; i++) {
            const el = empMgrArr[i];
            if (el === answers.employeeMgr){
                daMgr = i+1;
                i = empMgrArr.length;
            } else { 
            }
            
        }
        
    })
    .then(() =>{
        sql = `SELECT departments.id as department
        FROM roles
        INNER JOIN departments ON departments.id = roles.department_id
        WHERE title = \'${tempAns.employeeRole}\';`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                
                return;
            }
            Object.keys(rows).forEach( function(key) {
                let row = rows[key]
                empDepArr.push(row.department);
                
            }) 
            daDep = empDepArr[0];
            let answers = tempAns;
            params =  (`\"${answers.firstName}\", \"${answers.lastName}\", \"${daRole}\", \"${daDep}\", \"${daMgr}\"`);
            
            sql = `INSERT INTO employees (firstName,lastName,role_id, department_id, manager_id ) VALUES (${params})`;
           db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${answers.firstName} ${answers.lastName} was added to the database.`)
            }
          });
        })
        })
        .then(()=>{
            
            if (tempAns.employeeMgr === "Self"){
                let val = `${tempAns.firstName} ${tempAns.lastName}`;
                let sql = `INSERT INTO managers (name) VALUE ('${val}')`;
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                    }
                });
            }
            askQuestions();
        })    
  
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


        console.log(`Updated ${answers.updateName}'s role.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    } 
        askQuestions();     
    
   
}

function addRole(){
    empDepArr = [];
    let sql = `SELECT departments.name as department
    FROM departments`;  
       db.query(sql, (err, rows) => {
         if (err) {
             console.log(err);
             
             return;
            }
            rows.forEach( (row) =>{
                empDepArr.push(row.department);
               
            }) 
        })
    const questions = [
        {
            type: 'input',
                name: 'newRole',
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
                    
        },
        {
                type: 'number',
                name: 'newSalary',
                message: 'What is the salary amount? ',
        },
        {
            type: 'list',
            name: 'roleDep',
            message: 'Which department doe the role belong to? ',
            choices: empDepArr,
        },
       
    ];
    inquirer.prompt(questions).then((answers) => {
        tempAns = answers;
    })
    .then(() =>{
        let tempArr = [];
     let sql = ` SELECT id
        FROM departments
        WHERE name = \'${tempAns.roleDep}\';`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                
                return;
            }
            Object.keys(rows).forEach( function(key) {
                let row = rows[key]
                tempArr.push(row.id);
                
            }) 
            daDep = tempArr[0];
            let answers = tempAns;
            params =  (`\"${answers.newRole}\", \"${daDep}\", \"${answers.newSalary}\"`);
            
            sql = `INSERT INTO roles (title, department_id, salary) VALUES (${params})`;
           db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${answers.newRole} was added to the database.`)
              askQuestions();
            }
          });
        })
        });  
    // askQuestions();
}
function addDepartment(){
    const questions = [
        {
            type: 'input',
                name: 'newDep',
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
        }
       
    ];
    inquirer.prompt(questions).then((answers) => {
        tempAns = answers;
    })
    .then(()=>{
        let val = tempAns.newDep;
     let sql = `INSERT INTO departments (name) VALUE ('${val}')`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${val} was added to the database.`)
                askQuestions();
            }
        });
    })
    // console.log(`Addded to the database.`);
    // askQuestions();
}

module.exports = sql