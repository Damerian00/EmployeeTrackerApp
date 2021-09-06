
INSERT INTO departments (name)
VALUES ("Finance"),
       ("Sales"),
       ("Engineering"),
       ("Legal");

INSERT INTO roles (title,department_id, salary)
VALUES ("Sales Lead",2,100000),
       ("Salesman",2,50000),
       ("Lead Engineer",3,110000),
       ("Software Engineer",3,70000),
       ("Account Manager",1,90000),
       ("Accountant",1,45000),
       ("Legal Team Lead",4,220000),
       ("Lawyer",4,120000);

INSERT INTO managers (name)
VALUES ("Self"),
       ("John Doe"),
       ("Mary Cohn"),
       ("Tim Wilson"),
       ("Rhea Zhi");

INSERT INTO employees (firstName, lastName, role_id, department_id, manager_id)
VALUES ("John","Doe",1,2,1),
       ("Mike","Snow",2,2,2),
       ("Mary","Cohn",3,3,1),
       ("Bart","Hairy",4,3,3),
       ("Tim","Wilson",5,1,1),
       ("Perth","Berry",6,1,4),
       ("Rhea","Zhi",7,4,1),
       ("Ari","Jelly",8,4,5);

