var User = require('../models/user');
var crypto = require('crypto');

//sign up
exports.signup = function(req, res){
    var md5 =  crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var _user = req.body.name;
    User.findOne({name: _user}, function(err, user){
        if(err){
            console.log(err);
        }
        if(user){
            console.log('already used');
            res.redirect('/signup');
        }
        else{
            var user = new User({
                name: _user,
                password: password
            });

            user.save(function(err, user){
                if(err){
                    console.log(err);
                }
                console.log(user);
                req.session.user = user;
                res.redirect('/');
            });

        }
    });
};

//sign in
exports.signin = function(req, res){
    var md5 =  crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var name = req.body.name;
    User.findOne({name: name}, function(err, user){
        if(err){
            console.log(err);
        }
        if(!user){
            console.log('user not sign up');
            res.redirect('/signup');
        }
        else if(password !== user.password){
            console.log('password wrong');
            res.redirect('/signin');
        }
        else{
            req.session.user = user;
            console.log('success');
            res.redirect('/');
        }
    })
};

exports.showsignin = function(req, res){
    res.render('signin', {
        title: 'IMOVIE 登陆'
    });
};

exports.showsignup = function(req, res){
    res.render('signup', {
        title: 'IMOVIE 注册'
    });
};

//logout
exports.logout = function(req, res){
    delete req.session.user;
    res.redirect('/');
};

//user list page
exports.list = function(req, res){
    User.fetch(function(err, users){
        if(err){
            console.log(err);
        }
        res.render('userlist', {
            title: 'IMOVIE 用户列表页',
            users: users
        })
    })
};

//delete user
exports.del = function(req, res){
    var id = req.query.id;
    if(id){
        User.remove({_id: id}, function(err, user){
            if(err){
                console.log(err);
            }
            else{
                res.json({success: 1});
            }
        })
    }
};

exports.signinRequired = function(req, res, next){
    var user = req.session.user;
    if(!user){
        res.redirect('/signin');
    }
    next();
};

exports.adminRequired = function(req, res, next){
    var user = req.session.user;
    if( user.role <= 10){
        console.log('权限不足');
        return res.redirect('/');
    }
    next();
};