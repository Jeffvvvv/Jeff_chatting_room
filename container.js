// const dependable = require("dependable");
// const path = require("path");
// // create a container to store all the packages
// const container = dependable.container();

// const simpleDependencies = [
//         ['_', 'lodash'],
//     ];
    
// simpleDependencies.forEach(function(val){
//   container.register(val[0], function(){
//       return require(val[1]);
//   });
// });




//require dependable
const dependable = require("dependable");

//create a path variable
//path is a inside package
const path = require('path');

//create a dependable container to store the packages we will use
//a method inside dependable package
const container = dependable.container();

//create a simpleDependencies to store the packages
//[nickname, formalname]
const simpleDependencies = [
        ['_', 'lodash']
    ];
    
//foreach simpleDependencies, container.register
simpleDependencies.forEach(function(val){
    container.register(val[0], function(){
        return require(val[1]);
    })
});


container.load(path.join(__dirname, './controller'));

container.register('container', function(){
    return container;
});

module.exports = container;