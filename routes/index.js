var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');
var crypto = require('crypto');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res){
    console.log('user in session: ');
    console.log(req.session.user);
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }

    res.render('pages/index', {
      title: 'iMovie 首页',
      movies: movies
    })
  })
});

//detail page
router.get('/movie/:id', function(req, res){
  var id = req.params.id;
  Movie.findById(id, function(err, movie){
    if(err){
      console.log(err);
    }
    res.render('pages/detail', {
      title: 'iMovie ' + movie.title,
      movie: movie
    })
  })
});

//admin page
router.get('/admin/movie',function(req,res){
  res.render('pages/admin',{
    title: 'iMovie 后台录入页',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});

//admin add movie
router.post('/admin/movie', function(req, res){
  var id = req.body._id;
  var movieObj = req.body;
  var _movie;

  if(id !== 'undefined'){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie){
        if(err){
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      })
    })
  }
  else{
    _movie = new Movie({
      title: movieObj.title,
      director: movieObj.director,
      country: movieObj.country,
      year: movieObj.year,
      poster: movieObj.poster,
      flash: movieObj.flash,
      summary: movieObj.summary,
      language: movieObj.language
    });

    _movie.save(function(err, movie){
      if(err){
        console.log(err);
      }
      res.redirect('/movie/' + movie._id);
    })
  }
});

//list page

router.get('/admin/list', function(req, res){
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }
    res.render('pages/list', {
      title: 'iMovie 列表页',
      movies: movies
    })
  })
});


//admin update movie
router.get('/admin/update/:id', function(req, res){
  var id = req.params.id;
  if(id){
    Movie.findById(id, function(err, movie){
      res.render('pages/admin', {
        title: 'iMovie 后台更新页',
        movie: movie
      });
    })
  }
});

//admin delete movie
router.delete('/admin/list', function(req, res){
  var id = req.query.id;
  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err);
      }
      else{
        res.json({success: 1});
      }
    })
  }
});

//admin delete userlist
router.delete('/admin/userlist', function(req, res){
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
});
//sign up
router.post('/user/signup', function(req, res){
    var md5 =  crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var _user = req.body.name;
    User.findOne({name: _user}, function(err, user){
       if(err){
           console.log(err);
       }
        if(user){
            console.log('already used');
            res.redirect('/');
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
                res.redirect('/admin/userlist');
            });

        }
    });
});

//sign in
router.post('/user/signin', function(req, res){
    var md5 =  crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var name = req.body.name;
    User.findOne({name: name}, function(err, user){
        if(err){
            console.log(err);
        }
        if(!user){
            console.log('user not sign up');
            res.redirect('/');
        }
        if(password !== user.password){
            console.log('password wrong');
            res.redirect('/');
        }
        else{
            req.session.user = user;
            console.log('success');
            res.redirect('/');
        }
    })
});

//logout
router.get('/logout', function(req, res){
   delete req.session.user;
    res.redirect('/');
});

//user list page
router.get('/admin/userlist', function(req, res){
    if(req.session.user){
        User.fetch(function(err, users){
            if(err){
                console.log(err);
            }
            res.render('pages/userlist', {
                title: 'iMovie 用户列表页',
                users: users
            })
        })
    }
    else{
        console.log('not login');
        res.redirect('/');
    }
});

module.exports = router;
