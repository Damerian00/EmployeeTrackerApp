const mysql = require('mysql2');
const express = require('express');
const sql = require('./index');

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
db.end((err) => {

});
async function viewEmployees (){
 
     const sql = `SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
    FROM employees
    INNER JOIN roles ON roles.id = employees.role_id 
    INNER JOIN departments ON departments.id = employees.department_id
    INNER JOIN managers ON managers.id = employees.manager_id
    ORDER BY employees.id;`;  
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.table(result);
      
    });
  
}
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

  module.exports = { 
    viewEmployees
    
  }