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

}

function membersAndFactions() {

}

function addNewMember() {

}

function terminateMember() {

}

function guildPositionsDirectory() {

}

function addNewPosition() {
    
}