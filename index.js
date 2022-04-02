const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
// app.get('/',async(req,res)=>{
//     res.send('hello');
// })
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.clkdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db("mydb");
      const mechanicCollection = database.collection("mechanics");
      // create a document to insert
      const doc = {
        title: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      }
    //   const result = await haiku.insertOne(doc);
     // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})