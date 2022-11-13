const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.blm4ehx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("FoodInfo");
    const foods = database.collection("FoodItems");
    const orders = database.collection("Orders");

    app.get("/foods", async (req, res) => {
      const query = {};
      const cursor = foods.find(query);
      const result = await cursor.limit(3).toArray();
      res.send(result);
    });
    app.get("/allfoods", async (req, res) => {
      const query = {};
      const cursor = foods.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/allfoods", async (req, res) => {
      const item = req.body;
      const result = await foods.insertOne(item);
      res.send(result);
    });
    app.get("/allfoods/:id", async (req, res) => {
        const id = req.params.id;
      const query = {_id : ObjectId(id)};
      const cursor = foods.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

   


  } finally {
  }
}

run().catch((err) => console.error(err));



app.get("/", (req, res) => {
  res.send("MAd kitchen is running");
});

app.listen(port, () => {
  console.log(`Mad kitchen is running on ${port}`);
});
