var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res){
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
/*
router.get('/admin/list',function(req,res){
  res.render('pages/list', {
      title: 'iMovie 列表页',
      movies: [{
          title: '大圣归来',
          _id: 1,
          director: '田晓鹏',
          country: '中国',
          year: 2015,
          poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg',
          language: '中文',
          flash: 'http://player.youku.com/player.php/sid/XMTI4NjY1MTkyMA==/v.swf',
          summary: '大闹天宫后四百年多年，齐天大圣成了一个传说，在山妖横行的长安城，孤儿江流儿与行脚僧法明相依为命，小小少年常常神往大闹天宫的孙悟空。有一天，山妖来劫掠童男童女，江流儿救了一个小女孩，惹得山妖追杀，他一路逃跑，跑进了五行山，盲打误撞地解除了孙悟空的封印。悟空自由之后只想回花果山，却无奈腕上封印未解，又欠江流儿人情，勉强地护送他回长安城。一路上八戒和白龙马也因缘际化地现身，但或落魄或魔性大发，英雄不再。妖王为抢女童，布下夜店迷局，却发现悟空法力尽失，轻而易举地抓走了女童。悟空不愿再去救女童，江流儿决定自己去救。日全食之日，在悬空寺，妖王准备将童男童女投入丹炉中，江流儿却冲进了道场，最后一战开始了……'
      }]
  });
});
*/

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

module.exports = router;
