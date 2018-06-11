'use strict';

module.exports = function(_){
    return{
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signupPage);
        },
        
        indexPage: function(req, res){
            return res.render('index', {test: 'Login'});
        },
        
        signupPage: function(req, res){
            return res.render('signup');
        }
    }
   
};