const http = require("http");
const app = require("express")();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const chatRoute = require("./routes/chatRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Successfully Connected");
  });

app.use("/v1/chat/", chatRoute);

const port = process.env.PORT || 5000;
const socketServer = http.createServer(app);
const server = socketServer.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log(`App running on port ${port}...`);
});

const io = require("socket.io")(socketServer);
const STATIC_CHANNELS = ["global_notifications", "global_chat"];
// const usersMapWithClientIdAndUserId = {};
// const usersMapWithUserIdAndClientId = {};
io.on("connection", (client) => {
  console.log("connection establised");
  client.emit("connection", null);
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "No Such Route Defined",
  });
});
