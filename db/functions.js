const db = require('./connection');

// const { terminalPrompts } = require('../index');

// console.log(terminalPrompts);

async function factionDirectory() {
    const sql = `SELECT * FROM FACTIONS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("/n")
        console.table(rows);
        // terminalPrompts();
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
    factionDirectory,
}