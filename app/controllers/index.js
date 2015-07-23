var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index = function(req, res){
    Category
        .find({})
        .populate({
            path: 'movies',
            options: {limit: 5}
        })
        .exec(function(err, categories){
            if(err){
                console.log(err);
            }
            res.render('index', {
                title: 'IMOVIE',
                categories: categories
            })
        })
};

//search
exports.search = function(req, res){
    var catId = req.query.cat;
    var q = req.query.q;
    var page = parseInt(req.query.p) || 0;
    var count = 3;
    var index = page * count;
    if(catId){
        Category
            .find({ _id: catId})
            .populate({
                path: 'movies',
                select: 'title poster'
                //options: {limit: 2, skip: index}
            })
            .exec(function(err, categories){
                if(err){
                    console.log(err);
                }

                var category = categories[0] || {};
                var movies = category.movies || [];
                var results = movies.slice(index, index + count);
                console.log(results.length);
                res.render('results', {
                    title: 'IMOVIE 结果列表',
                    keywords: category.name,
                    query: 'cat=' + catId,
                    movies: results,
                    currentPage: page + 1,
                    totalPages: Math.ceil(movies.length / count)
                })
            })
    }
    else{
        Movie
            .find({ title: new RegExp(q + '.*', 'i')})
            .exec(function(err, movies){
                if(err) throw(err);
                var results = movies.slice(index, index + count);
                res.render('results', {
                    title: 'IMOVIE 搜索结果',
                    keywords: q,
                    query: 'q=' + q,
                    movies: results,
                    currentPage: page + 1,
                    totalPages: Math.ceil(movies.length / count)
                })
            })
    }
};