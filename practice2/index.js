const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const server = express();
const PORT = 8080;

server.use(express.json());
server.use("/user", userRouter);

server.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log(`server is running on port ${PORT}, and DB is connected.`);
  } catch (error) {
    console.log(`server is getting error${error}.`);
  }
});
