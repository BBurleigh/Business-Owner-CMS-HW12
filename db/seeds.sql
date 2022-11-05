INSERT INTO department (department_name)
VALUES ("Mission Control"),
       ("Agent Resources"),
       ("Medical Facility"),
       ("Training Grounds"),
       ("Armory"),
       ("Agent Control"),
       ("The Chief's Wing")

INSERT INTO position (title, salary, department_id)
VALUES ("Mission Coordinator, 100000.00, 1"),
("Translator, 80000.00, 2"),
("Healer, 175000.00, 3"),
("Agent Trainer, 130000.00, 4"),
("Quartermaster, 95200.00, 5"),
("Field Agent, 330750.50, 6"),
("The Chief, 999999.99, 7")

INSERT INTO employee (fist_name, last_name, role_id, manager_id)
VALUES ("Leon, Bryant, 6, 2"),
("Chief, Abbot, 7, null"),
("Christian, Endurall, 6, 2"),
("Marigold, Harmony , 1, 2"),
("Jose, Quantanilla, 1, 2"),
("Umbrine, Mohommad, 2, null"),
("Saskama, Rockenfoot, 4, 2"),
("Vincent, Drimmer, 3, 2"),
("Uhonno, Kumpo, 5, 2"),
("Fransesca, Giselle, 6, 2")