const express = require("express");
const app = express();

//set template engine with ejs

app.set("view engine", "ejs");

//middlewares

app.use(express.static("public"));

//routes

app.get("/", (req, res) => {
  res.render("index");
});

//Listen on port 3000
server = app.listen(3000);

//socket.io initialisation
const io = require("socket.io")(server);

//listen on every connecion

io.on("connection", socket => {
  console.log("New user connected");

  //default username
  socket.username = "Anonymous";

  //listen on change_username
  socket.on("change_username", data => {
    console.log(data);
    socket.username = data.username;
  });

  //listen on new_message
  socket.on("new_message", data => {
    console.log(data);
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username
    });
  });

  //listen on typing
  socket.on("typing", data => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});
