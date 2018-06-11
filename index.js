const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const http = require('http');
const container = require('./container');

container.resolve(function(user){
    const app = SetupExpress();
    
    function SetupExpress(){
       const app = express();
       const server = http.createServer(app);
       server.listen(process.env.PORT, process.env.IP, function(){
           console.log('Server Start');
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
        //call ejs for front-end
        app.set('view engine', 'ejs');
        //configure body-parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
    }
    
});