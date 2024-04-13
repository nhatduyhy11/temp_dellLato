// Socket.emit gửi tin nhắn 1 - 1
// io.emit gửi tin nhắn tới tất cả
// broadcast gửi tin nhắn tới tất cả mọi người trừ người mới vào server

const express = require("express");
// Sử dụng design button (Observer {publisher, subscriber})
const socketIO = require("socket.io");
// Built in nodeJS
const path = require("path");
const http = require("http");
const moment = require("moment");
const { Users } = require("./user");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname + "/../public");
const io = socketIO(server);

const users = new Users();

io.on("connection", (socket) => {
  socket.on("USER_INFO", (msg) => {
    const { name, room } = msg;

    socket.join(room);

    users.addUser(socket.id, name, room);

    io.to(room).emit("USERS_IN_ROOM", {
      usersInRoom: users.getListOfUserInRoom(room),
    });

    socket.emit("CREATE_MESSAGE_FROM_SERVER_TO_CLIENT", {
      from: "Admin",
      content: `Welcome to the chat app room ${room}`,
      createAt: moment().format("hh:mm a"),
    });

    socket.broadcast.to(room).emit("CREATE_MESSAGE_FROM_SERVER_TO_CLIENT", {
      from: "Admin",
      content: `${name} joins`,
      createAt: moment().format("hh:mm a"),
    });

    socket.on("CREATE_MESSAGE_FROM_CLIENT_TO_SERVER", (msg) => {
      if (msg.content !== "") {
        io.to(room).emit("CREATE_MESSAGE_FROM_SERVER_TO_CLIENT", {
          from: msg.from,
          content: msg.content,
          createAt: moment().format("hh:mm a"),
        });
      }
    });

    socket.on("LOCATION_TO_SERVER", (msg) => {
      io.to(room).emit("LOCATION_TO_CLIENT", {
        from: msg.from,
        lat: msg.lat,
        lng: msg.lng,
        createAt: moment().format("hh:mm a"),
      });
    });

    socket.on("disconnect", () => {
      const user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("USERS_IN_ROOM", {
          usersInRoom: users.getListOfUserInRoom(user.room),
        });

        io.to(user.room).emit("CREATE_MESSAGE_FROM_SERVER_TO_CLIENT", {
          from: "Admin",
          content: `${name} has left the room`,
        });
      }
    });
  });
});

// Thực thi ngay tại folder index.js nên k dùng đường dẫn tương đối
// app.use(express.static("public"));
// console.log("publicPath", publicPath);
app.use(express.static(publicPath));

// Server chỉ giúp client xài được thư viện socket trừ (react... phải xài socket riêng)
server.listen(port, () => {
  console.log(`App is running on port ${port}!`);
});
