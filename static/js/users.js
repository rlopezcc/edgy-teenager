$('.edit').on('click', function () {
    $(this).closest('td').find('.permission-panel').slideToggle();
});

$('.select2').on('change', function () {
    
    select2Extra = $(this).parent().find('.select2-extra');
    select2Extra.html('<i class="glyphicon glyphicon-refresh spinner"></i>');
    permissions = {}
    $(this).find('option:selected').each(function(){
        permissions[$(this).val()] = true;
    });
    $.ajax({
        method: 'POST',
        url: '/users/' + $(this).closest('.select2').data('userid') + '/permissions',
        data: { permissions: permissions },
        success: function(data){
            if(data.status == 'OK'){
                select2Extra.html('<i class="glyphicon glyphicon-ok"></i>');
                setTimeout(function(){
                    select2Extra.children().fadeOut();
                }, 1500);
            }else{
                select2Extra.html('<i class="glyphicon glyphicon-remove text-danger"></i>');
            }
        }
    });
});

$('.delete').on('click', function(){
        var delete_button = $(this);
        delete_button.hide();

        var userId = delete_button.data('userid');
        var userEmail = delete_button.data('useremail');

        var delete_dialog = makeDialogBox('Confirm delete<span class="pull-right"><a class="glyphicon glyphicon-remove dialog-close"></a></span>',
            '<p>Delete user '+ userEmail +'?</p><span class="pull-right"><button id="confirm-user-delete" class="btn btn-default btn-sm">Yes</button><button class="btn btn-default btn-sm dialog-close">No</button></span>');

        $('.dialog-close').on('click', function(){
            $(this).closest('.dialog').remove();
            delete_button.show();
        });

        $('#confirm-user-delete').on('click', function(){
            $.ajax({
                url: '/users/' + userId + '/delete',
                method: 'POST',
                success: function(data){
                    // TODO: remove dialog!!
                    // $(this).closest('.dialog').remove();
                    $('#' + userId).remove();
                },
            });
        });
});