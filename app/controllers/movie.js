var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');

//detail page
exports.detail = function(req, res){
    var id = req.params.id;
    Movie.findById(id, function(err, movie){
        Comment
            .find({ movie: id})
            .populate( 'from', 'name')
            .populate( 'reply.from reply.to', 'name')
            .exec(function( err, comments){
            console.log(comments);
                res.render('detail', {
                    title: 'iMovie ' + movie.title,
                    movie: movie,
                    comments: comments
                })
            });
    })
};

//admin page
exports.new = function(req,res){
    res.render('admin',{
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
};

//admin add movie
exports.save = function(req, res){
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
};

//movie list
exports.list = function(req, res){
    Movie.fetch(function(err, movies){
        if(err){
            console.log(err);
        }
        res.render('list', {
            title: 'iMovie 列表页',
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
            res.render('admin', {
                title: 'iMovie 后台更新页',
                movie: movie
            });
        })
    }
};