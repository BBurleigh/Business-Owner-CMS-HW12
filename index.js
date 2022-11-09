const inquirer = require('inquirer');
const db = require("./db/functions");


const listQuestions = {
    name: "options",
        type: "list",
        message: "You have accessed your guild's database. What would you like to do? Scroll up/down for more options.",
        choices: ["View all factions of your guild (departments).", "Add a new faction.", "View all guild members (employees).", "View all guild members by their factions.", "Add a new guild member to the roster.", "Terminate a member's guild status.", "View all positions within the guild.", "Add a position within the guild.", "There is nothing else to be done (quit)."]
}




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

terminalPrompts();

// function factionDirect(){
//     db.factionDirectory()
//     .then(([data]) => {
//         let fac = data;
//         console.table(fac);
//     })
//     .then(()=> terminalPrompts())
// }