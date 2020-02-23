const http = require("http");

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

                //console.log(splitedPath, splitedRouterPath);
                
                if (app.routers[i].type == "router") {
                    let isPath = true;

                    for (let j = 1; j < splitedPath.length; j++) {
                        if (splitedPath[j] == splitedRouterPath[j]) {
                            continue;
                        } else if ( splitedRouterPath[j][0] == ":") {
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
                            isPath = false;
                            break;
                        }
                    }
                    if (isPath) {
                        callStack.push(app.routers[i]);
                    }
                } else if (app.routers[i].type == "middleware") {

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

            //console.log(callStack, "-- callStack");
            console.timeEnd(lable);
            for (let i = 0; i < callStack.length; i++) {
                callStack[i].callback(req, res);
            }
        
        });
    }
    return app;
}

module.exports.createApp = createApp;