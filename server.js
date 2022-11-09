const express = require('express');

const { default: inquirer } = require('inquirer');

const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'guild_db'
    },
    console.log(`You are connected to the company_db.`)
)

const listQuestions = {
    name: "options",
        type: "list",
        message: "You have accessed your guild's database. What would you like to do? Scroll up/down for more options.",
        choices: ["View all factions of your guild (departments).", "Add a new faction.", "View all guild members (employees).", "View all guild members by their factions.", "Add a new guild member to the roster.", "Terminate a member's guild status.", "View all positions within the guild.", "Add a position within the guild.", "There is nothing else to be done (quit)."]
}

app.use((req, res) => {
    res.status(404).end();
})

db.connect(err => {
    if (err) throw err;
    console.log('Database is connected.');

   app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`); 

   terminalPrompts();
   })
})


function terminalPrompts() {
    inquirer.prompt(listQuestions)
    .then (function(response) {
        switch (response.options) {
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