INSERT INTO factions (faction_name)
VALUES ("Mission Control"),
       ("Agent Resources"),
       ("Medical Facility"),
       ("Training Grounds"),
       ("Armory"),
       ("Agent Control"),
       ("The Chief's Wing");

INSERT INTO positions (title, salary, faction_id)
VALUES ("Mission Coordinator", 100000.00, 1),
("Translator", 80000.00, 2),
("Healer", 175000.00, 3),
("Agent Trainer", 130000.00, 4),
("Quartermaster", 95200.00, 5),
("Field Agent", 330750.50, 6),
("The Chief", 999999.99, 7);

INSERT INTO members (first_name, last_name, role_id, captain_id)
VALUES ("Chief", "Abbot", 7, null),
("Leon", "Bryant", 6, 1),
("Christian", "Endurall", 6, 1),
("Marigold", "Harmony", 1, 1),
("Jose", "Quantanilla", 1, 1),
("Umbrine", "Mohommad", 2, 1),
("Saskama", "Rockenfoot", 4, 1),
("Vincent", "Drimmer", 3, 1),
("Uhonno", "Kumpo", 5, 1),
("Fransesca", "Giselle", 6, 1);