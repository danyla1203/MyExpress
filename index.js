const createApp = require("./express").createApp;
const app = createApp();

app.use("/", (req, res, next) => {
    console.log("Middle");
});

app.get("/", (req, res) => {
    console.log("H1"); 
    res.end(""); 
});

app.get("/post", (req, res) => {
    console.log("Deb"); 
    res.end("") 
});

app.serve();

app.listen(3001);
