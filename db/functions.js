const inquirer = require('inquirer');
const { removeListener } = require('./connection');

const db = require('./connection');

const listQuestions = require('./listQuestions.json');

function terminalPrompts() {
    inquirer.prompt(listQuestions)
    .then (function(response) {
        let choice = response.options;
        switch (choice) {
            case "View all factions of your guild (departments).":
                factionDirectory();
                break;
            case "Add a new faction.":
                addFaction();
                break;
            case "View all guild members (employees).":
                guildMemberDirectory();
                break;
            case "View all guild members by their factions.":
                membersAndFactions();
                break;
            case "Add a new guild member to the roster.":
                addNewMember();
                break;
            case "Terminate a member's guild status.":
                terminateMember();
                break;
            case "View all positions within the guild.":
                guildPositionsDirectory();
                break;
            case "Add a position within the guild.":
                addNewPosition();
                break;
            case "There is nothing else to be done (quit).":
                process.exit(0);
        } 
        
    })
}

function factionDirectory() {
    const sql = `SELECT * FROM FACTIONS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
        terminalPrompts(listQuestions);
    }) 
}

function addFaction() {
    inquirer.prompt([
        {
            type: "input",
            name: "factionName",
            message: "What is the name of this new faction in your guild?",
            validate: nameInput => {
                if (nameInput != '') {
                    console.log(": One moment while this faction is being added to the directory of other factions.")
                    return true;
                } else {
                    console.log("Please enter the name of the new faction.")
                    return false;
                }
            }
        }
    ])
    
    .then(response => {
        const sql = `INSERT INTO FACTIONS (faction_name)
        VALUES (?)`;
        const params = response.factionName;
        db.query(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log("\n");
        console.table(rows);
        console.log("\n");
        terminalPrompts(listQuestions);
        })
    })
}

function guildMemberDirectory() {
    const sql = `SELECT * FROM MEMBERS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
        terminalPrompts(listQuestions);
    })
}

function membersAndFactions() {
    const sql = `SELECT factions.faction_name, members.first_name, members.last_name
    FROM members
    LEFT JOIN factions
    ON factions.id = members.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
        terminalPrompts(listQuestions);
    })
}

function addNewMember() {
  inquirer.prompt([
    {
    type: "input",
    name: "firstName",
    message: "What is the first and preferred name of your new guild member?",
    validate: nameInput => {
        if (nameInput != '') {
            console.log(": An excellent first name for our new member.")
            return true;
        } else {
            console.log("Please enter the first and preferred name of the new guildmate.")
            return false;
        }
    }
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the last name of your new guild member?",
        validate: nameInput => {
            if (nameInput != '') {
                console.log(": An excellent last name for our new member.")
                return true;
            } else {
                console.log("Please enter the last name of the new guildmate.")
                return false;
            }
        }
        }
  ])

  .then (response => {
    const params = [response.firstName, response.lastName];
    const sql = `SELECT * FROM POSITIONS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        const positions = rows.map(({title, id}) => ({name: title, value: id}));
        inquirer.prompt([
            {
                type: "list",
                name: "position",
                message: "What position/job will this new member have in the guild?",
                choices: positions
            }
        ])

    .then(chosenPosition => {
        const position = chosenPosition.position;
        params.push(position);
        const sql = `SELECT * FROM MEMBERS`;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const captain = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
            captain.push({name:"No captain", value: null});
            inquirer.prompt([
                {
                type: "list",
                name: "captain",
                message: "Who is this new member's commanding officer?",
                choices: captain
                }
            ])

            .then(captainAnswer => {
                const leader = captainAnswer.captain;
                params.push(leader);
                const sql = `INSERT INTO MEMBERS (first_name, last_name, role_id, captain_id)
                VALUES (?, ?, ?, ?)`;
                db.query(sql, params, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("The new member has been successfully added to the member directory!");
                    guildMemberDirectory();
                })
            })
        })
    })
    })
  })
}

function terminateMember() {
    const sql = `SELECT first_name, last_name, id FROM MEMBERS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        const members = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
        inquirer.prompt([
            {
                type: "list",
                name: "member",
                message: "Which member is designated for termination from the guild?",
                choices: members
            }
        ])

        .then (terminationChoice => {
            const member = terminationChoice.member;
            const params = member;
            const sql = `DELETE FROM MEMBERS WHERE id = ?`;
            db.query(sql, params, (err) => {
                if (err) {
                    throw err;
                }
                console.log("The member has been terminated from the guild.");
                guildMemberDirectory();
            })
        })
    })
}

function guildPositionsDirectory() {
    const sql = `SELECT * FROM POSITIONS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("\n");
        console.table(rows);
        console.log("\n");
        terminalPrompts(listQuestions);
    })
}

function addNewPosition() {
    inquirer.prompt([
        {
            type: "input",
            name: "position",
            message: "What is the name of this new position within the guild?",
            validate: nameInput => {
                if (nameInput != '') {
                    console.log("This new position will do wonders for our guild!");
                    return true;
                } else {
                    console.log("Please enter the name of the new position/job within the guild.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "For this new position, what will its base salary be?",
            validate: salaryInput => {
                if (isNaN(salaryInput)) {
                    console.log("Please enter an appropriate salary for this new position.");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])

    .then (response => {
        const params = [response.position, response.salary];
        const sql = `SELECT * FROM FACTIONS`;
        db.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            const factions = rows.map(({name, id}) => ({name: name, value: id}));
            inquirer.prompt([
                {
                type: "list",
                name: "faction",
                message: "In which faction of the guild would this position exist?",
                choices: factions
                }
            ])
            .then (factionMembership => {
            const faction = factionMembership.faction;
            params.push(faction);
            const sql = `INSERT INTO POSITIONS (title, salary, faction_id)
            VALUES (?, ?, ?)`;
            db.query(sql, params, (err) => {
                if (err) {
                    throw err;
                }
                console.log("The new position has been added to the positions directory!");
                guildPositionsDirectory();
            })
            }) 
        })
    })
}

module.exports = {
    terminalPrompts,
}