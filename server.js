const express = require("express");
const proxy = require("express-http-proxy");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"));
app.use("/", proxy("https://healthtrackerrest-production-9cc1.up.railway.app"));
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("Server started...");