$(function(){
    $('tr').hover(function(){
        $('.index-table-post-body[data-postid="' + $(this).data('postid') + '"]').slideDown(function(){
            $(this).clearQueue(); // So it doesn't keep bouncing.
        });
    },function(){
        $('.index-table-post-body[data-postid="' + $(this).data('postid') + '"]').slideUp(function(){
            $(this).clearQueue();
        });
    });
});