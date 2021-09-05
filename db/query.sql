SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
FROM employees
INNER JOIN roles ON roles.id = employees.role_id 
INNER JOIN departments ON departments.id = employees.department_id
INNER JOIN managers ON managers.id = employees.manager_id
ORDER BY employees.id;