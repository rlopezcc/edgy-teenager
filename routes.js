var middlewares = require('./middlewares');
var views = require('./views');
var ajaxViews = require('./ajax');

module.exports = function (app) {

    app.get('/', views.index);

    app.get('/posts/new', middlewares.checkPermission('createPost'), views.newPostTemplate);
    app.post('/posts/new', middlewares.checkPermission('createPost'), views.newPost);

    app.get('/posts/:id', views.detailPost);

    app.get('/posts/:id/delete', views.deletePost);

    app.get('/posts/:id/update', views.updatePostTemplate);
    app.post('/posts/:id/update', views.updatePost);

    app.get('/users/new', middlewares.checkPermission('createUser'), views.createUserTemplate);
    app.post('/users/new', middlewares.checkPermission('createUser'), views.createUser);
    app.post('/users/:id/permissions', middlewares.checkPermission('deleteUser'), ajaxViews.setUserPermissions);
    app.post('/users/:id/delete', middlewares.checkPermission('deleteUser'), ajaxViews.deleteUser);
    app.get('/users', middlewares.checkPermission('createUser'), views.Users);

    app.get('/login', views.loginTemplate);
    app.post('/login', ajaxViews.login);
};