const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const http = require('http');

//what we need to use for register/login/logout
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('flash');
const passport = require('passport')



const container = require('./container');

container.resolve(function(user){
    const app = SetupExpress();
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/JeffChattingRoom');
    
 
    function SetupExpress(){
       const app = express();
       const server = http.createServer(app);
       server.listen(3000, function(){
           console.log('Listening on port 3000');
       });
       
       //ConfigureExpress
       ConfigureExpress(app);
       
       //setup router
        const router = require('express-promise-router')();
        
        user.SetRouting(router);
        
        app.use(router);
    }
    
    function ConfigureExpress(app)
    {
        //we can use all the resources in the file 'public'
        app.use(express.static('public'));
        //add cookie-parser
        app.use(cookieParser());
        //call ejs for front-end
        app.set('view engine', 'ejs');
        //configure body-parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        
        //middleware
        app.use(validator());
        app.use(session({
            secret: 'thisisasecretkey',
            resave: true,
            saveInitialized: true,
            //set a database for our session storage
            store: new MongoStore({mongooseConnection: mongoose.connection()})
        }));
        
        app.use(flash());
        
        app.use(passport.initalize());
        app.use(passport.session());
    }
    
});