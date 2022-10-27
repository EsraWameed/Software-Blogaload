//exporting all our used Models from their folder ../models
const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');
//get requests... like read only
router.get('/', async (req, res) => {
	try {
	//this statement find all blogs and include who they are by
		const blogData = await Blog.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},],
		});
		//map used to loop through blogs in the array and serialize them
		const blogs = blogData.map((blog) => blog.get({
			plain: true
		}));
		//info is rendered/displayed on homepage under views (the blogs, if users are logged in)
		res.render('homepage', {
			blogs,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// endpoint for a specific blog post http://localhost:3001/blog/id
router.get('/blog/:id', async (req, res) => {
	try {
		//using primary key to find specific blog
		const blogData = await Blog.findByPk(req.params.id, {
			//blog will include username, and includes comment model to allow users to comment
			include: [
				{
					model: User,
					attributes: ['username'],
				}, {
					model: Comment,
					include: [
						User
					]
				}
			],
		});

		const blog = blogData.get({
			plain: true
		});
//rendering to blogs template if logged in
		res.render('blog', {
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
//view all user info aside from password
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Blog
			}],
		});

		const user = userData.get({
			plain: true
		});
		//render this info to dashboard handlebar
		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signUp');
});

module.exports = router;