const pool = require('./pool');

/* USERS */
//createUser
async function createUser(name, email, password){
    await pool.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)`, [name, email, password]
    );
}

//getAllUsers
async function getAllUsers(){
    const { rows } = await pool.query(`SELECT * FROM users`);
    return rows;
}

//getUser
async function getUser(email){
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE email = $1`, [email]
    );
    return rows[0];
}

//getUserById
async function getUserById(id) {
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE id = $1`, [id]
    );
    return rows[0];
}

/*editUser

async function editUser(id, email, password) {
    
}*/

/* FOLLOWING */

async function followUser(userId, followingId) {
    await pool.query(`
        INSERT INTO user_following(user_id, following_id) VALUES ($1, $2)`, [userId, followingId]
    );
}

async function unfollowUser(userId, unfollowingId) {
    await pool.query(`
        DELETE FROM user_following
        WHERE user_id = $1
        AND unfollowing_id = $2`, [userId, unfollowingId]
    );
}

async function getFollowing(userId) {
    const { rows } = await pool.query(`
        SELECT * FROM user_following 
        WHERE user_id = $1`, [userId]
    );
    const followingList = [];
    for(const row of rows) {
        followingList.push(row.following_id)
    }
    return followingList;
}  

async function getFollowers(userId) { 
        const { rows } = await pool.query(`
        SELECT * FROM user_following 
        WHERE following_id = $1`, [userId]
    );
    const followersList = [];
    for(const row of rows) {
        followersList.push(row.user_id)
    }
    return followersList;
}

/* POSTS */

async function createPost(authorId, content) {
    await pool.query(`INSERT INTO posts(author, content) VALUES ($1, $2)`, [authorId, content]
    );
}

async function deletePost(postId) {
    const content = "Post Deleted";
    await pool.query(`
        UPDATE posts 
        SET content = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2`, [content, postId]
    );

}

async function getAllPosts(){
    const { rows } = pool.query(`SELECT * FROM posts`);
    return rows;
}

async function getUserPosts(userId) {
    const { rows } = await pool.query(`
        SELECT * FROM posts
        WHERE author = $1`, [userId]
    );
    return rows;
}
/* LIKES */

async function togglePostLike(userId, postId){
    const deleted = await pool.query(`
        DELETE post_likes
        WHERE user_id = $1
        AND post_id = $2`, [userId, postId]
    );

    if(deleted.rowCount === 0){
        await pool.query(`
            INSERT INTO post_likes(user_id, post_id) VALUES ($1, $2)`, [userId, postId]
        );
    }
}

/* COMMENTS */


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    createPost,
    deletePost,
    getAllPosts,
    getUserPosts,
    togglePostLike
}