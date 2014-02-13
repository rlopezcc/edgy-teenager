$("#login-form").on('submit', function(event){
    event.preventDefault();

    var form = $(this);
    var formData = JSON.stringify({email: form.find("input[name='email']").val(), password: form.find("input[name='password']").val()});
    $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: "json",
        data: formData,
        contentType: "application/json",
        timeout: 5000,
        success: function(data) {
            if (data.hasOwnProperty('loginError')) {
                $('.form-error').text(data.loginError);
            }else{
                window.location = '/';
            }
        },
        error: function(error) {
            makeDialogBox('Oops<span class="pull-right"><a class="glyphicon glyphicon-remove dialog-close"></a></span>',
            '<p>Something went wrong, try again later</p><span class="pull-right btn btn-default dialog-close">Ok</span>');
        },
    });
}); 