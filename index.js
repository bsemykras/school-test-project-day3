"use strict";

var domain = require("domain"),
    myDomain = domain.create();


myDomain.on("error", function (err) {
    //console.log("error --> ", err);
    console.log("arguments --> ", arguments);
});

myDomain.run(function () {
    var http = require("http"),
        url = require("url"),
        routes = require("./routes");

   /* code here */
    function requestHandler(request, response){

        var parsedUrl = url.parse(request.url, true),
            method = request.method.toLowerCase();

        if(routes[method][parsedUrl.pathname]){
            var requestDomain = domain.create();
            requestDomain.on("error", function (err) {
                response.statusCode = 500;
                response.end(JSON.stringify({
                    "code": "Internal Server Error",
                    "message": err.message
                }));
            });
            requestDomain.run(function(){
                routes[method][parsedUrl.pathname](request, response, function(err){
                    if(err){
                        response.statusCode = 500;
                        response.write(JSON.stringify({
                            "message": err.message,
                            "status": "Internal Server Error"
                        }));
                        response.end();
                    }else{
                        response.end();
                    }
                });
            });

        }else{
            response.statusCode = 404;
            response.end("Not Found");
        }
    }


    var server  = http.createServer(requestHandler);


    server.listen(3000);
});




