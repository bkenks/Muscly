import express from "express";

// this connects us to database
import db from "../db/connection.js";

// this is to convert db to ObjectId for the _id
import { ObjectID } from "mongodb";

// this router will handle all requests starting with path /record
const router = express.Router();

// this will get a list of all records
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// this will get a record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectID(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
});

// this will create a new record
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding record");
    }
});

// this will update a record by id.
router.patch("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
          name: req.body.name,
          position: req.body.position,
          level: req.body.level,
        },
      };
  
      let collection = await db.collection("records");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  });
  
  // this will delete a record
  router.delete("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
  
      const collection = db.collection("records");
      let result = await collection.deleteOne(query);
  
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting record");
    }
  });
  
  export default router;