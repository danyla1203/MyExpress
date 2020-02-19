const http = require("http");

let createApp = function () {
    const app = http.createServer();

    app.routers = [];

    app.get = (url, callback) => {
        app.routers.push({
            url: url,
            callback: callback
        });
    }

    app.use = (url, callback) => {
        app.routers.push({
            url: url,
            callback: callback
        });
    }

    app.serve = () => {
        app.on("request", (req, res) => {
            let callStack = [];

            for (let i = 0; i < app.routers.length; i++) {
                if (req.url == app.routers[i].url) {
                    callStack.push(app.routers[i]);
                }
            }

            for (let i = 0; i < callStack.length; i++) {
                callStack[i].callback(req, res);
            }
        });
    }
    return app;
}

module.exports.createApp = createApp;