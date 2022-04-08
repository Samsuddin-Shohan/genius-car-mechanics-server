const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const res = require("express/lib/response");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

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
    const database = client.db("car_mechanics");
    const serviceCollection = database.collection("services");
    // create a document to insert
    app.get("/", async (req, res) => {
      res.send("hello");
    });
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const services = await cursor.toArray();
      // console.log(services);
      res.send(services);
    });
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.json(service);
    });
    app.post("/services", async (req, res) => {
      const service = req.body;

      const result = await serviceCollection.insertOne(service);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.json(result);
    });
    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
