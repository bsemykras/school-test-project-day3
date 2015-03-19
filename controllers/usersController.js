/**
 * Created by bogdan on 18.03.15.
 */
var ect = require("ect");
var users = require("../lib");
var renderer = ect({ root : __dirname + '/../views' });
var validator = require('validator');

module.exports = {
    getAction: function(request, response, next){
        setTimeout(function(next){
            response.statusCode = 200;
            try{
                response.write(renderer.render('users.ect', {
                    allUsers: users.Users
                })) ;
                next();
            }catch(e){
                next(e);
            }
        }, 500, next)
    },
    postAction: function(request, response, next) {
        var path = "";

        request.on("data", function (data) {
            path += data;
        });

        request.on("end", function () {

            var personinfo = JSON.parse(path);

            if (validator.isLength(personinfo["name"], 1, 255) && validator.isEmail(personinfo["e-mail"]) &&
                validator.isNumeric(personinfo["age"]) && validator.isLength(personinfo["description"], 1, 255)) {
                users.Users.push({
                    name: personinfo["name"],
                    email: personinfo["e-mail"],
                    description: personinfo["description"],
                    age: personinfo["age"]
                });
                response.write("Save new object");
                next();
            } else{
                response.statusCode=404;
                response.write(response.statusCode+" Error in Url");
                next();
            }
        });
    }};








