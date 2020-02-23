const createApp = require("./express").createApp;
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

app.use("/post", (req, res) => {
    console.log("after");
})

app.serve();

app.listen(3000);
