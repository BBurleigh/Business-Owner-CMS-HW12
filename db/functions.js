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

}

function guildMemberDirectory() {
    const sql = `SELECT * FROM MEMBERS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        return terminalPrompts();
    })
}

function membersAndFactions() {

}

function addNewMember() {

}

function terminateMember() {

}

function guildPositionsDirectory() {
    const sql = `SELECT * FROM POSITIONS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        return terminalPrompts();
    })
}

function addNewPosition() {

}




// const connection = require("./connection");

// class DB {
//     constructor(connection){
//         this.connection = connection;
//     }

//     factionDirectory() {
//         return this.connection.promise().query("SELECT * FROM FACTIONS")
//     }

// }

// module.exports = new DB(connection);

module.exports = {
    terminalPrompts,
}