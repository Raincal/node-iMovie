var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
var crypto = require('crypto');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
//var _ = require('underscore');

router.use(function(req, res, next) {
    res.locals.user = req.session.user;
    /*console.log('session in local');
    console.log(res.locals.user);*/
    next();
});

// Index
router.get('/', Index.index);

// User
router.get('/signin', User.showsignin);
router.get('/signup', User.showsignup);
router.post('/signin', User.signin);
router.post('/signup', User.signup);
router.get('/logout', User.logout);
router.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
router.delete('/admin/user/list', User.del);

// Movie
router.get('/movie/:id', Movie.detail);
router.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
router.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
router.post('/admin/movie', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
router.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
router.delete('/admin/movie/list',User.signinRequired, User.adminRequired, Movie.del);

// Comment
router.post('/user/comment', User.signinRequired, Comment.save);

// Category
router.get('/admin/category/new', Category.new);
router.post('/admin/category', Category.save);
router.get('/admin/category/list', Category.list);

// Search
router.get('/results', Index.search);

module.exports = router;
