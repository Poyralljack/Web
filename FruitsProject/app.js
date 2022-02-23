const {MongoClient} = require("mongodb");
 
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";
 
const client = new MongoClient(uri, {useUnifiedTopology: true});
 
async function run() {
    try {
        await client.connect();
        console.log("Connected Successfully to server");
 
        // if it does not exist, a new one will be created
        const database = client.db('fruitsDB');
        const fruitsCollection = database.collection('fruits');
 
        // insert 3 fruits documents
        const fruitDocs = [
          { "_id": 1, "name": "Apple", score: 8, review: "Great fruit"},
          { "_id": 2, "name": "Orange", score: 6, review: "Kinda sour"},
          { "_id": 3, "name": "Banana", score: 9, review: "Great stuff!"}
         ];
 
         const insertManyresult = await fruitsCollection.insertMany(fruitDocs);
         let ids = insertManyresult.insertedIds;
         console.log(`${insertManyresult.insertedCount} documents were inserted.`);
 
        const cursor = fruitsCollection.find({});
 
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
 
        await cursor.forEach((fruit) => {
            console.log(fruit);
        });
 
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
 
run().catch(console.dir);