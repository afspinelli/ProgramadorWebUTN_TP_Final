var pool = require('./bd');

async function getTutorials() {
    var query = 'select * from tutorials';
    var rows = await pool.query(query);
    return rows;
}

async function deleteTutorialsById(id) {
    var query = 'delete from tutorials where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function addTutorial(obj) {
    try {
        var query = 'insert into tutorials set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/* Traigo los datos para modificar una sola entrada */
async function getTutorialsById(id) {
    var query = 'select * from tutorials where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

/* Update entrada */
async function editTutorialsById(obj, id) {
    try {
        var query = 'update tutorials set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



module.exports = { getTutorials, deleteTutorialsById, addTutorial, getTutorialsById, editTutorialsById }