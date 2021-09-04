const inquirer = require('inquirer');





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
        },
       
    ];
    inquirer.prompt(questions).then((answers) => {
       moreQuestions(answers);  
 });
        
}

function moreQuestions(answers){
    switch (answers.mainMenu) {
        case 'Add Employee':
          addEmployee(answers);
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
     
        default:
            break;
    }
    if (answers.mainMenu === "Quit"){
        
    }else{
        askQuestions();

    }
}

function addEmployee (answers){
    let tempObject = answers;
    console.log(tempObject);
}

function updateEmployee (answers){
    let tempObject = answers;
    console.log(tempObject);
}
function addRole(answers){
    let tempObject = answers;
    console.log(tempObject);
}
function addDepartment(answers){
    let tempObject = answers;
    console.log(tempObject);
}
