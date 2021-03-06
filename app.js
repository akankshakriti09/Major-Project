const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/index");
// db.sequelize.sync({ force: true });

const auth = require("./routes/auth.js")
app.use("/auth", auth);



app.use("/", (req, res) => {
  res.status(200).json({
    message: "Test server working",
  });
});

const port = process.env.PORT || 3600;
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
