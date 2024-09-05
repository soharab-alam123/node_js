const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path"); // Importing the path module
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("recived-location", { id: socket.id, ...data });
    });
    console.log("connected");
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, function () {
    console.log("Server is listening on port 4000");
});
