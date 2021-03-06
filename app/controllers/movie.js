var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

//detail page
exports.detail = function(req, res){
    var id = req.params.id;
    Movie.update({_id: id}, {$inc: {pv: 1}}, function(err){
        if(err) throw(err);
    });
    Movie.findById(id, function(err, movie){
        Comment
            .find({ movie: id})
            .populate( 'from', 'name')
            .populate( 'reply.from reply.to', 'name')
            .exec(function( err, comments){
            //console.log(comments);
                res.render('detail', {
                    title: 'IMOVIE ' + movie.title,
                    movie: movie,
                    comments: comments
                })
            });
    })
};

//admin page
exports.new = function(req,res){
    Category.find({}, function(err, categories){
        res.render('admin',{
            title: 'IMOVIE 后台录入页',
            categories: categories,
            movie: {
                title: '',
                category: '',
                categoryName: '',
                director: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        });
    })
};

//admin save poster
exports.savePoster = function(req, res, next){
    console.log(req.files);
    var posterData = req.files.uploadPoster;
    var posterPath = posterData.path;
    var originalFilename = posterData.originalFilename;
    if(originalFilename){
        fs.readFile(posterPath, function(err, data){
            var timestamp = Date.now();
            var type = posterData.type.split('/')[1];
            var poster = timestamp + '.' + type;
            var newPath = path.join(__dirname, '../../', '/public/upload/' + poster);

            fs.writeFile(newPath, data, function(err){
                req.poster = poster;
                next();
            })
        })
    }
    else{
        next();
    }
};

//admin add movie
exports.save = function(req, res){
    var id = req.body._id;
    var movieObj = req.body;
    console.log(movieObj);
    var _movie;

    if(req.poster){
        movieObj.poster = req.poster;
    }
    if(id){
        Movie.findById(id, function(err, movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie){
                if(err){
                    console.log(err);
                }
                /*Category.findById(movie.category, function(err, category){
                    category.movies.push(movie._id);
                    Array.prototype.unique = function(){
                        var n = [];
                        for(var i=0;i<this.length;i++){
                            if(n.indexOf(this[i]) == -1) n.push(this[i]);
                        }
                        return n;
                    };
                    //category.movies = [];
                    category.save(function(err, category) {
                        return res.redirect('/movie/' + movie._id);
                    })
                });*/
                res.redirect('/movie/' + movie._id);
            })
        })
    }
    else{
        /*_movie = new Movie({
             category: movieObj.category,
            title: movieObj.title,
            director: movieObj.director,
            country: movieObj.country,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary,
            language: movieObj.language
        });*/
        var categoryId = movieObj.category;
        var categoryName = movieObj.categoryName;
        _movie = new Movie(movieObj);
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err)
            }

            if (categoryId) {
                Category.findById(categoryId, function(err, category) {
                    category.movies.push(movie._id);

                    category.save(function(err, category) {
                        res.redirect('/movie/' + movie._id);
                    })
                })
            }
            else if(categoryName){
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });

                category.save(function(err, category){
                    movie.category = category._id;
                    movie.save(function(err, movie){
                        return res.redirect('/movie/' + movie._id);
                    })
                })
            }
            else res.redirect('/movie/' + movie._id);
        })
    }
};

//movie list
exports.list = function(req, res){
    Movie
        .find({})
        .populate('category', 'name')
        .exec(function(err, movies){
            if(err){
                console.log(err);
            }
            res.render('list', {
                title: 'IMOVIE 列表页',
                movies: movies
            })
    })
};

//delete movie
exports.del = function(req, res){
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
};

//update movie
exports.update = function(req, res){
    var id = req.params.id;
    if(id){
        Movie.findById(id, function(err, movie){
            Category.find({}, function(err, categories){
                res.render('admin', {
                    title: 'IMOVIE 后台更新页',
                    movie: movie,
                    categories: categories
                });
            })
        })
    }
};