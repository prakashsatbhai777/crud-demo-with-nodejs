const { MongoClient, ObjectId } = require('mongodb');

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    console.log("App is Working");
    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://localhost:5000
    
    // If you see App is working means
    // backend working properly
});

app.get("/getallquotes", async (req, resp) => {
    try{
        const uri = "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Quote?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const connectionResponse = await client.connect();
        connectionResponse ? console.log('Connected...') : console.log('Not Connected...');
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const allQuotes = await quotesCollection.find().toArray();
        connectionResponse.close();
        // client.close();
        resp.send({ status: "success", data: allQuotes });
        // resp.send({status: "success", data: JSON.stringify(allQuotes)});
    }catch(error){
        resp.send({status: "error", data: "Something went wrong."});
    }
});

app.get("/getsinglequote/:id", async (req, resp) => {
    const quoteId = req.params.id;
    try{
        const uri = "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Quote?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const connectionResponse = await client.connect();
        connectionResponse ? console.log('Connected...') : console.log('Not Connected...');
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const quote = await quotesCollection.findOne({
            _id: new ObjectId(quoteId),
          });
        connectionResponse.close();
        // client.close();
        resp.send({status: "success", data: JSON.stringify(quote)});
    }catch(error){
        resp.send({status: "error", data: "Something went wrong."});
    }
});

app.post("/addQuote", async (req, resp) => {
    const data = req.body;
    try{
        const uri = "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Quote?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const connectionResponse = await client.connect();
        connectionResponse ? console.log('Connected...') : console.log('Not Connected...');
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const quote = await quotesCollection.insertOne(data)
        connectionResponse.close();
        // client.close();
        resp.send({status: "success", data: "Quote added successfully."});
    }catch(error){
        resp.send({status: "error", data: "Something went wrong."});
    }
});

app.get("/deletequote/:id", async (req, resp) => {
    const quoteId = req.params.id;
    try{
        const uri = "mongodb+srv://prakash:Prakash777@cluster0.onlm4.mongodb.net/Quote?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const connectionResponse = await client.connect();
        connectionResponse ? console.log('Connected...') : console.log('Not Connected...');
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const quote = await quotesCollection.deleteOne({
            _id: new ObjectId(quoteId)
        });
        connectionResponse.close();
        // client.close();
        resp.send({status: "success", data: JSON.stringify(quote)});
    }catch(error){
        resp.send({status: "error", data: "Something went wrong."});
    }
});

app.listen(5000);
