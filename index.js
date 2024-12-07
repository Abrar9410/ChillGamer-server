require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2zcny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	
    // await client.connect();

    const database = client.db("Chill-Gamer");
    const reviewCollection = database.collection("reviews");
    const gameCollection = database.collection("games");

    // GET requests
    app.get('/reviews', async (req, res) => {
        const cursor = reviewCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    
    app.get('/games', async (req, res) => {
        const cursor = gameCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/reviews/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await reviewCollection.findOne(query);
        res.send(result);
    })
    
    app.get('/games/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await gameCollection.findOne(query);
        res.send(result);
    })

    // POST requests
    app.post('/reviews', async (req, res) => {
        const newReview = req.body;
        const result = await reviewCollection.insertOne(newReview);
        res.send(result);
    })
    
    app.post('/games', async (req, res) => {
        const newGame = req.body;
        const result = await gameCollection.insertOne(newGame);
        res.send(result);
    })

    // PATCH requests
    app.patch('/reviews/:id', async (req, res) => {
        const id = req.params.id;
        const updatedReview = req.body;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
            $set: {
                title: updatedReview.title,
                coverImg: updatedReview.coverImg,
                description: updatedReview.description,
                genre: updatedReview.genre,
                publishedYear: updatedReview.publishedYear,
                rating: updatedReview.rating,
                userName: updatedReview.userName,
                userEmail: updatedReview.userEmail
            }
        }
        const result = await reviewCollection.updateOne(filter, updatedDoc);
        res.send(result);
    })
    
    app.patch('/games/:id', async (req, res) => {
        const id = req.params.id;
        const updatedGame = req.body;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
            $set: {
                title: updatedGame.title,
                coverImg: updatedGame.coverImg,
                reviews: updatedGame.reviews
            }
        }
        const result = await gameCollection.updateOne(filter, updatedDoc);
        res.send(result);
    })

    // Delete Requests
    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Get
app.get('/', (req, res) => {
    res.send('Chill Gamer server is running');
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})