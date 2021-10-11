import express from "express";
import db from './models/index'
import fs from 'fs'
import cors from "cors"
import indexRouter from "./routes/index.js"

const app = express();
const PORT = process.env.PORT || 9900

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors())

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("seed db ")
    try {
      const filename = 'dictionary.txt'

      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log("Wait a while data being inserted in database.")
        const splitted = data.split('\n').filter(k => k);
        const mappedData = splitted.map(d => ({ name: d }))
        db.Name.bulkCreate(mappedData)
          .then(() => {
            console.log({ message: "Done" })
          })
      });

    }
    catch (e) {
      console.log("Error in seed data")
    }
  })

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});