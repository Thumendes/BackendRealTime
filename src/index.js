require("dotenv").config();
const app = require("express")();
const morgan = require("morgan");

app.use(morgan("dev"));

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3001;

const pessoas = [
  {
    name: "Arthur",
    age: 17,
    genre: "M",
  },
];

io.on("connection", (socket) => {
  console.log(`New User connected: ${socket.id}`);
  socket.emit("render", pessoas);

  socket.on("add", (data) => {
    pessoas.push(data);
    io.emit("render", pessoas);
  });

  socket.on("delete", (id) => {
    pessoas.splice(id, 1);
    io.emit("render", pessoas);
  });
});

server.listen(PORT, () => console.log(`Running in ${PORT}`));
