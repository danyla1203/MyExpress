const http = require("http");
const fs = require("fs");

let createApp = function () {
    const app = http.createServer();
    app.routers = [];

    app.get = (url, callback) => {
        app.routers.push({
            url: url,
            callback: callback,
            type: "router"
        });
    }

    app.static = (req, res) => {
        fs.readFile(`.${req.url}`, "utf8", (err, result) => {
            if (err) return;
            res.end(result);
        });
    }

    app.use = (url, callback) => {
        app.routers.push({
            url: url,
            callback: callback,
            type: "middleware"
        });
    }

    app.serve = () => {
       
        app.on("request", (req, res) => {
            let lable;
            console.time(lable);

            let callStack = [];

            for (let i = 0; i < app.routers.length; i++) {
                //split path from url, and router path

                let splitedRouterPath = app.routers[i].url.split("/");
                let splitedPath = req.url.split("/");
                console.log(splitedRouterPath, splitedPath);
                
                if (app.routers[i].type == "router") {
                    let isPath = true;

                    for (let j = 1; j < splitedPath.length; j++) {
                        if (splitedPath[j] == splitedRouterPath[j]) {
                            //if splited path from client with index j equal splited router with index j 
                            continue;

                        } else if ( splitedRouterPath[j][0] == ":") {
                            //if router have a path like /example/:variable
                            //add variable to request object
                            let variableName = splitedRouterPath[j].slice(1);

                            if (req.params) {
                                let obj = {};
                                obj[variableName] = splitedPath[j];
                                req.params = Object.assign({}, req.params, obj);

                            } else {
                                req.params = {};
                                req.params[variableName] = splitedPath[j];
                            }
                            
                        } else {
                            //client path doesn't equal router with index j
                            isPath = false;
                            break;
                        }
                    }
                    if (isPath) {
                        callStack.push(app.routers[i]);
                    }

                } else if (app.routers[i].type == "middleware") {
                    //if middleware path == "/"
                    if (app.routers[i].url == "/") {
                        callStack.push(app.routers[i]);
                        continue;
                    }

                    let isPath = true;
                    
                    for (let j = 1; j < splitedRouterPath.length; j++) {
                        if (splitedRouterPath[j] == splitedPath[j]) {
                            continue;
                        }
                        else {
                            isPath = false;
                            break;
                        }
                    }
                    if (isPath) {
                        callStack.push(app.routers[i]);
                    }

                }
            }
            console.log(callStack);
            console.timeEnd(lable);
            for (let i = 0; i < callStack.length; i++) {
                callStack[i].callback(req, res);
            }
        
        });
    }
    return app;
}

module.exports.createApp = createApp;