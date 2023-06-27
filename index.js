const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
)

function initprompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do with the company database?',
            name: 'choice',
            choices: [
                'Exit',
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        },
    ])
        .then((response) => {
            let sql;
            let params;
            let answer;
            let answers2;
            switch (response.choice) {
                case 'Exit':
                    break;
                case 'View all departments':
                    sql = `SELECT * FROM department;`;
                    db.query(sql, (err, result) => {
                        console.table(result);
                        initprompt();
                    });
                    break;
                case 'View all roles':
                    sql = `SELECT r.title, r.id, d.name, r.salary FROM role as r LEFT JOIN 
                        department as d ON r.department_id = d.id;`;
                    db.query(sql, (err, result) => {
                        console.table(result);
                        initprompt();
                    });
                    break;
                case 'View all employees':
                    sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department,
                        r.salary, concat(manager.first_name, ' ', manager.last_name) as manager
                        from (((employee as e left join role as r on e.role_id=r.id) left join 
                        department as d on r.department_id=d.id) left join employee manager on 
                        e.manager_id=manager.id);`;
                    db.query(sql, (err, result) => {
                        console.table(result);
                        initprompt();
                    });
                    break;
                case 'Add a department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the department you would like to add?',
                            name: 'dept'
                        },
                    ])
                        .then((response) => {
                            sql = `INSERT INTO department (name) VALUES (?);`;
                            db.query(sql, response.dept, (err, result) => {
                                console.log(`${response.dept} has been added.`)
                                initprompt();
                            })
                        });
                    break;
                case 'Add a role':
                    sql = `SELECT name, id as value from department`;
                    db.query(sql, (err, result) => {

                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'What is the name of the role you would like to add?',
                                name: 'role'
                            },
                            {
                                type: 'input',
                                message: 'What is the base salary?',
                                name: 'salary'
                            },
                            {
                                type: 'list',
                                message: 'What department is the role being added to?',
                                name: 'dept',
                                choices: result,
                            },
                        ])
                            .then((response) => {
                                sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
                                params = [response.role, response.salary, response.dept];
                                db.query(sql, params, (err, result) => {
                                    console.log(`${response.role} has been added.`);
                                    initprompt();
                                });
                            });
                    });
                    break;
                case 'Add an employee':
                    sql = `SELECT title as name, id as value from role;`;
                    db.query(sql, (err, result) => {
                        sql = `SELECT concat(first_name, ' ', last_name) as name, id as value from employee where role_id<=6;`;
                        db.query(sql, (err2, result2) => {
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    message: 'What is the first name of the new employee?',
                                    name: 'firstname'
                                },
                                {
                                    type: 'input',
                                    message: 'Last name?',
                                    name: 'lastname'
                                },
                                {
                                    type: 'list',
                                    message: 'What role does the new employee have?',
                                    name: 'role',
                                    choices: result,
                                },
                                {
                                    type: 'list',
                                    message: 'Who is the manager of the new employee?',
                                    name: 'manager',
                                    choices: result2,
                                },
                            ])
                                .then((response) => {
                                    sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                                    params = [response.firstname, response.lastname, response.role, response.manager];
                                    db.query(sql, params, (err, result) => {
                                        console.log(`${response.role} has been added.`)
                                        initprompt();
                                    })
                                })
                        })
                    });
                    break;
                case 'Update an employee role':
                    sql = `SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee;`;
                    db.query(sql, (err, result) => {
                        answer = result;
                    });
                    sql = `SELECT title AS name, id AS value FROM role;`;
                    db.query(sql, (err, result) => {
                        inquirer.prompt([
                            {
                                type: 'list',
                                message: 'Which employee would you like to update?',
                                name: 'employee',
                                choices: answer,
                            },
                            {
                                type: 'list',
                                message: 'What is the new role?',
                                name: 'role',
                                choices: result,
                            },
                        ])
                            .then((response) => {
                                sql = `UPDATE employee SET role_id=(?) WHERE id=(?);`;
                                params = [response.role, response.employee];
                                db.query(sql, params, (err, result) => {
                                    console.log(`Employee updated.`);
                                    initprompt();
                                })
                            });
                    })
                // })
            }
        }
        )
}

initprompt();


