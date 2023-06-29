require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const route = require("./routes/empRoutes");

app.use("/emp", route);

const port = 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
