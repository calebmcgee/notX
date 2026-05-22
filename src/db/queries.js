const pool = require('./pool');

/* USERS */
//createUser
async function createUser(name, email, password){
    await pool.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)`, 
        [name, email, password]
    );
}

//getAllUsers
async function getAllUsers(){
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

//getUser
async function getUser(email){
    const { rows } = pool.query(`
        SELECT * FROM users 
        WHERE id = ($1)`, [email]
    );
    return rows;
}

//editUser

async function editUser(id, email, password) {
    
}

/* */



module.exports = {
    createUser,
    getAllUsers,
    getUser,
    editUser
}