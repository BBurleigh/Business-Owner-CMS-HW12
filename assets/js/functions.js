function factionDirectory() {
    const sql = `SELECT * FROM FACTIONS`;
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        return terminalPrompts();
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