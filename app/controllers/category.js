var Movie = require('../models/movie');
var Category = require('../models/category');

//admin page
exports.new = function(req,res){
    res.render('category_admin',{
        title: 'IMOVIE 电影分类后台录入页',
        category: {
            name: ''
        }
    });
};

//admin add movie
exports.save = function(req, res){
    var _category = req.body.category;
    console.log(_category);
    var category = new Category({
        name: _category
    });

    category.save(function(err, category){
        if(err){
            console.log(err);
        }
        res.redirect('/admin/category/list');
    })
};

//movie list
exports.list = function(req, res){
    Category.fetch(function(err, categories){
        if(err){
            console.log(err);
        }
        res.render('categorylist', {
            title: 'IMOVIE 列表页',
            categories: categories
        })
    })
};