const inquirer = require('inquirer');

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
        factionDirectory();
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
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
    })
  })
}

function terminateMember() {

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

}

module.exports = {
    terminalPrompts,
}