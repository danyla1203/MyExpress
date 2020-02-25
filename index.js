const createApp = require("./express").createApp;
const fs = require("fs");
const app = createApp();

/* app.use("/", (req, res, next) => {
    console.log("Middle");
});

app.get("/", (req, res) => {
    console.log("H1"); 
    res.end(""); 
});


app.use("/post/hello", (req, res) => { console.log("Test") });

app.use("/post", (req, res) => {
    console.log("Foo!");
}); */

app.use("/", app.static);

app.get("/favicon.ico", (req, res) => { res.end("") });

app.get("/", (req, res) => {
    fs.readFile("index.html", "utf8", (err, result) => {
        if (err) throw err;
        res.end(result);
    })
});

app.use("/test", (req, res) => {
    console.log("test middle!");
})
app.get("/test/:str", (req, res) => {
    console.log(req.params, "HERE");
    res.end("Test" + app.params.str);
})

app.use("/post", (req, res) => {
    console.log("some action");
});

app.get("/post/:text/:name", (req, res) => {
    console.log("Deb"); 
    console.log(req.params);
    res.end("1");
});

app.serve();

app.listen(3000);
