var express = require('express');
var router = express.Router();
var { uri } = require('../controllers/databaseConnection');
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

async function getCustomers() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    var db0 = client.db("shoppingsite");
    var customersCollection =  db0.collection('customers');

    const customers = await customersCollection.find().toArray();

    return customers;
  } finally {
    // STEP F: Ensures that the client will close when you finish/error
    await client.close();
  }
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const customers = await getCustomers();
  res.render('users', {customers});
});

module.exports = router;
