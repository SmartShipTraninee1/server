const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const Pool = require("./db"); //==> DataBase Connection File
const { json } = require("express");


// <==== middleware =====>
app.use(express.json()); //=====> to get req.body json
app.use(cors()); // =========> for


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/uploadcsv", async (req, res) => {
  try {
    const { FILEDATA, FILENAME,shipId } = req.body;

    const newData = await Pool.query(
      'INSERT INTO "CSVDATA" ("FILEDATA", "FILENAME") VALUES ($1,$2)',
      [FILEDATA, FILENAME]
    );
    res.json({ SUCCESS: "File uploaded successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

// get all file

app.get("/downloadcsv", async (req, res) => {
  try {
    const getDatas = await Pool.query('SELECT * FROM "CSVDATA"');
    console.log(getDatas);
    res.json(getDatas.rows);

  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

//get one file

app.get("/downloadcsv/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getData = await Pool.query(
      'SELECT * FROM "CSVDATA" WHERE "FILEID" = $1',
      [id]
    );
    res.json(getData.rows);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});


//delete file

app.delete("/deletecsv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteData = await Pool.query(
      'DELETE  FROM "CSVDATA" WHERE "FILEID" = $1',
      [id]
    );
    res.json({ SUCCESS: "field edited successfully" });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
