var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {
    title: 'iMovie 首页',
    movies: [{
      title: '大圣归来',
      _id: 1,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg'
    },{
      title: '大圣归来',
      _id: 1,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg'
    },{
      title: '大圣归来',
      _id: 1,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg'
    },{
      title: '大圣归来',
      _id: 1,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg'
    },{
      title: '大圣归来',
      _id: 1,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg'
    },{
      title: '大圣归来',
      _id: 1,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg'
    }]
  });
});

//detail page
router.get('/node-iMovie/:id',function(req,res){
  res.render('pages/detail',{
    title: 'iMovie 详情页',
    movie: {
      director: '田晓鹏',
      country: '中国',
      title: '西游记之大圣归来',
      year: 2015,
      poster: 'http://img31.mtime.cn/mg/2015/07/09/163517.43596355_270X405X4.jpg',
      language: '中文',
      flash: 'http://player.youku.com/player.php/sid/XMTI4NjY1MTkyMA==/v.swf',
      summary: '大闹天宫后四百年多年，齐天大圣成了一个传说，在山妖横行的长安城，孤儿江流儿与行脚僧法明相依为命，小小少年常常神往大闹天宫的孙悟空。有一天，山妖来劫掠童男童女，江流儿救了一个小女孩，惹得山妖追杀，他一路逃跑，跑进了五行山，盲打误撞地解除了孙悟空的封印。悟空自由之后只想回花果山，却无奈腕上封印未解，又欠江流儿人情，勉强地护送他回长安城。一路上八戒和白龙马也因缘际化地现身，但或落魄或魔性大发，英雄不再。妖王为抢女童，布下夜店迷局，却发现悟空法力尽失，轻而易举地抓走了女童。悟空不愿再去救女童，江流儿决定自己去救。日全食之日，在悬空寺，妖王准备将童男童女投入丹炉中，江流儿却冲进了道场，最后一战开始了……'
    }
  });
});
//admin page
router.get('/admin/node-iMovie',function(req,res){
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

//list page
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
module.exports = router;
