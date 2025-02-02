const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send(`hello server`);
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
