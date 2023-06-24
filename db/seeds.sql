INSERT INTO department (name)
VALUES  ("Screening"),
        ("Receiving"),
        ("Data Review"),
        ("Confirmations Aliquoting"),
        ("GC/MS"),
        ("QC");

INSERT INTO role (title, salary, department_id)
VALUES  ("Supervisor", 70000, 1),
        ("Supervisor", 50000, 2),
        ("Supervisor", 90000, 3),
        ("Supervisor", 50000, 4),
        ("Supervisor", 80000, 5),
        ("Supervisor", 60000, 6),
        ("Accessioner", 35000, 2),
        ("Technologist", 50000, 1),
        ("QC Analyst", 50000, 6), 
        ("Technologist", 55000, 5),
        ("Certifying Scientist", 65000, 3),
        ("Technician", 40000, 4),
        ("Technician", 40000, 1),
        ("Team Lead", 60000, 1),
        ("Team Lead", 45000, 2),
        ("Team Lead", 45000, 4),
        ("Team Lead", 65000, 5),
        ("Team Lead", 55000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Amos", "McKenzie", 1, NULL), 
        ("Charles", "Hanna", 4, NULL), 
        ("Cory", "Bell", 5, NULL), 
        ("Odebowale", "Ojutiku", 3, NULL),
        ("Tina", "Doles", 3, NULL), 
        ("Debbie", "McLean", 6, NULL), 
        ("Vivekananda", "Murthy", 5, NULL),
        ("Gloria", "Gamble", 2, NULL),
        ("Scott", "DeVries", 14, 1),
        ("Kim", "Carrington", 2, 8), 
        ("Sandro", "Rojas", 8, 1), 
        ("Michael", "Hodges", 13, 1),
        ("Korie", "Huggins", 11, 4),
        ("Julian", "Bartkiewicz", 8, 1),
        ("Kimberly", "Jones", 8, 1), 
        ("Devonda", "McGowan", 8, 1),
        ("Michael", "Slade", 8, 1),
        ("Ben", "Holderby", 14, 1),
        ("Flossie", "Sowe", 11, 7),
        ("Tammi", "Shirey", 11, 4), 
        ("Val", "Mack", 11, 5),
        ("Steve", "Henson", 6, 6),
        ("Beverly", "Pressly", 9, 6),
        ("Rahim", "Uddin", 7, 8),
        ("Anita", "Snow", 15, 8),
        ("Deborah", "Snype", 7, 9);