// Generated by CoffeeScript 1.9.3
(function() {
  $(function() {
    return $(".comment").click(function(e) {
      var commentId, target, toId;
      target = $(this);
      toId = target.data('tid');
      commentId = target.data('cid');
      if ($('#toId').length > 0) {
        $('#toId').val(toId);
      } else {
        $('<input>').attr({
          type: 'hidden',
          id: 'toId',
          name: 'tid',
          value: toId
        }).appendTo('#commentForm');
      }
      if ($('#commentId').length > 0) {
        return $('#commentId').val(commentId);
      } else {
        return $('<input>').attr({
          type: 'hidden',
          id: 'commentId',
          name: 'cid',
          value: commentId
        }).appendTo('#commentForm');
      }
    });
  });

}).call(this);

//# sourceMappingURL=detail.js.map