const app = require('./app')
const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
require('dotenv').config();

mongoose
  .connect(process.env.DB_HOST)
  .then(
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });