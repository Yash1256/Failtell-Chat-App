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
    taskSchedule();
  });

app.use("/v1/chat/", chatRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "No Such Route Defined",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log(`Listening on port ${port} 🚀`);
});
