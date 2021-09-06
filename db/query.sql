-- SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
-- FROM employees
-- INNER JOIN roles ON roles.id = employees.role_id 
-- INNER JOIN departments ON departments.id = employees.department_id
-- INNER JOIN managers ON managers.id = employees.manager_id
-- ORDER BY employees.id;


-- SELECT title as role
--        FROM roles
--        ORDER BY role;

-- SELECT name
--     FROM managers;

-- SELECT employees.id, firstName as First_Name, lastName as Last_Name, roles.title as Title, departments.name as Department, roles.salary, managers.name as Manager_Name
--     FROM employees
--     INNER JOIN roles ON roles.id = employees.role_id 
--     INNER JOIN departments ON departments.id = employees.department_id
--     INNER JOIN managers ON managers.id = employees.manager_id
--     ORDER BY employees.id;    

-- SELECT roles.id, title, departments.name as department, salary FROM roles
--     INNER JOIN departments ON departments.id = roles.department_id;

-- SELECT * FROM departments
--     ORDER BY departments.name;    

-- SELECT roles.id, title, departments.name as department, salary FROM roles
--      INNER JOIN departments ON departments.id = roles.department_id;

-- SELECT title, departments.name
-- FROM roles
-- INNER JOIN departments ON departments.id = roles.department_id;

-- SELECT departments.id as department
--         FROM roles
--         INNER JOIN departments ON departments.id = roles.department_id
--         WHERE departments.name = "Legal Team Lead";

        -- SELECT departments.id as department
        -- FROM roles
        -- INNER JOIN departments ON departments.id = roles.department_id
        -- WHERE title = "Software Engineer";

        SELECT id
        FROM departments
        WHERE name = "Engineering";
        -- SELECT roles.department_id as department
        -- FROM departments
        -- INNER JOIN roles ON roles.department_id = departments.id
        -- WHERE roles.department_id = \'${tempAns.roleDep}\';
        -- { newRole: 'Trashman', newSalary: 30000, roleDep: 'Legal' }