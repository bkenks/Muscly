import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverAPI: {
        version: serverAPI.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    // connect the client to the server
    await client.connect();
    // ping to confirm successful connection
    await client.db("admin").command({ ping: 1});
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
    );

} catch (err) {
    console.log(err);
}

let db = client.db("users");

export default db;