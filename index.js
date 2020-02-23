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
    console.log(app.params, "HERE");
    res.end("Test" + app.params.str);
})


app.get("/post/:text", (req, res) => {
    console.log("Deb"); 
    console.log(app.params);
    res.end("1");
});


app.serve();

app.listen(3000);
