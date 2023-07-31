const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("send_message", (data) => {
    console.log("received", data);
    socket.broadcast.emit("broadcast_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
