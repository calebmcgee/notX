const db = require('../db/queries');

async function renderHome(req, res) {
    const posts = await db.getAllPosts();
    for (const post of posts) {
        post.author = await db.getUserById(post.author);
        const date = new Date(post.created_at);
        post.date = date.toLocaleDateString();
        const likes = await db.getPostLikes(post.id);
        post.likeCount =  likes > 0 ? likes.length : 0;
        const comments = await db.getPostComments(post.id);
        post.commentCount = comments > 0 ? comments.length : 0;
    }
    res.render('home', {
        title: 'Home',
        user: req.user,
        posts: posts
    });
}


module.exports = {
    renderHome
};