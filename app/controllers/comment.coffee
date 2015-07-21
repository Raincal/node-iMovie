Comment = require '../models/comment'

exports.save = (req, res) ->
  _comment = req.body
  console.log(_comment);
  movieId = _comment.movie

  if _comment.cid
    Comment.findById _comment.cid, (err, comment) ->
      reply = {
        from: _comment.from
        to: _comment.tid
        content: _comment.content
      }

      comment.reply.push(reply)
      comment.save (err, comment) ->
        if err
          console.log err
        res.redirect('/movie/' + movieId)
  else
    comment = new Comment _comment
    comment.save (err, comment) ->
      if err
        console.log err
      res.redirect '/movie/' + movieId