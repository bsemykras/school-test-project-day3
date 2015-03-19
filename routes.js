module.exports = {
  "get": {
    "/hello": require("./controllers/helloController").getAction,
     "/users":require("./controllers/usersController").getAction
  },
    "post":{
        "/users":require("./controllers/usersController").postAction
    }
};
