const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const server = express();
const PORT = 3030;

server.use(express.json());
server.use("/user", userRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
