function capitalizeFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeDialogBox(title, html){
	var heading = '<div class="panel-heading">' + title + '</div>';	
	var body = '<div class="panel-body">' + html + '</div>';
	var panel = '<div class="index-panel dialog"><div class="panel panel-default">' + heading + body + '</div></div>';
	$('body').append(panel);	

	$('.dialog-close').on('click', function(){
		$(this).closest('.dialog').remove();
	});

	return panel;
}

function popRequiredFieldErrors(){
	ret = true;
	$('.required').each(function(index){
		if($(this).val() == ''){
			makeDialogBox('Nope<span class="pull-right"><a class="glyphicon glyphicon-remove dialog-close"></a></span>', 
				'<p>' + capitalizeFirst($(this).attr('name')) + ' cannot be empty.</p><span class="pull-right"><button class="btn btn-default btn-sm dialog-close">Okay</button></span>');
			
			$('.dialog-close').on('click', function(){
				$(this).closest('.dialog').remove();
			});

			// This is to return false (and stop submit) if some required field is empty.
			ret = false;

			// return to stop the loop.
			return ret;
		}
	});
	return ret;
}

$(function(){	

	$('.select2').select2();

	$('#post-delete').on('click', function(){
		var delete_button = $(this);
		delete_button.hide();

		var post_id = delete_button.data('post-id');

		var delete_dialog = makeDialogBox('Confirm delete<span class="pull-right"><a class="glyphicon glyphicon-remove dialog-close"></a></span>',
			'<p>Delete this post?</p><span class="pull-right"><button id="confirm-post-delete" class="btn btn-default btn-sm">Yes</button><button class="btn btn-default btn-sm dialog-close">No</button></span>');

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
		});

	});
	
	$('form').on('submit', function(){
		return popRequiredFieldErrors();
	});
});