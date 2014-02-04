$(function(){
	$('#post-delete').on('click', function(){
		var delete_button = $(this);
		var post_id = delete_button.data('post-id');

		var delete_dialog = '<div class="index-panel dialog"><div class="panel panel-default"><div class="panel-heading">Confirm delete<span class="pull-right"><a class="glyphicon glyphicon-remove dialog-close"></a></span></div>';
		delete_dialog += '<div class="panel-body"><p>Delete this post?</p>';
		delete_dialog += '<span class="pull-right"><button id="confirm-post-delete" class="btn btn-default btn-sm">Yes</button><button class="btn btn-default btn-sm dialog-close">No</button></span></div>';
		delete_dialog += '</div></div>';
		delete_button.hide();
		$('body').append(delete_dialog);

		$('.dialog-close').on('click', function(){
			$(this).closest('.dialog').remove();
			delete_button.show();
		});
		$('#confirm-post-delete').on('click', function(){
			$.ajax({
				url: '/posts/' + post_id + '/delete',
				success: function(data){
					window.location = '/';
				}
			});
		})
	});


});

