const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://react-news-app:TgMzrEeiXZufQKBj@cluster0.0fn8ke9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



const newsCollection = client.db('news').collection('news-data');


app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/news", async(req, res) => {
    const result = await newsCollection.find().toArray();
    res.send(result);
})


app.listen(port, () => {
    console.log(`This server is running on port ${port}`)
})