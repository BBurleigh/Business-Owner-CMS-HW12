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
        database: 'company_db'
    },
    console.log(`You are connected to the company_db.`)
)

app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`); 
})

function terminalPrompts() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "You have accessed your guild's database. What would you like to do? Scroll up/down for more options.",
        choices: ["View all factions of your guild (departments).", "View all guild members (employees).", "View all guild members by their factions."]
    })
}