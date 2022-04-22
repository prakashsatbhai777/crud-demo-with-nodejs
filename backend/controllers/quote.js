var client = require('../db');
const { ObjectId } = require('mongodb');

const getAll = async (req, resp) => {
    try{
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const allQuotes = await quotesCollection.find().toArray();
        // connectionResponse.close();
        resp.send({ status: "success", data: allQuotes });
    }catch(error){
        resp.send({status: "error", data: "Something went wrong."});
    }
}

const getOne = async (req, resp) => {
    const quoteId = req.params.id;
    try{
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const quote = await quotesCollection.findOne({
            _id: new ObjectId(quoteId),
          });
        // connectionResponse.close();
        return resp.send({ status: "success", data: JSON.stringify(quote) });
    }catch(error){
        return resp.send({ status: "error", data: "Something went wrong." });
    }
}

const add = async (req, resp) => {
    if(req.body){
        const data = req.body;
        if(data.text && data.text.trim() !== '' && data.author && data.author.trim() !== ''){
            try{
                const db = client.db();
                const quotesCollection = db.collection("quotes");
                const quote = await quotesCollection.insertOne(data)
                // connectionResponse.close();
                return resp.send({status: "success", data: "Quote added successfully."});
            }catch(error){
                return resp.send({status: "error", data: "Something went wrong."});
            }
        }else{
            return resp.send({status: "error", data: "Invalid input."});
        }
    }else{
        return resp.send({status: "error", data: "Invalid input."});
    }
}

const update = async (req, resp) => {
    if(req.body){
        const data = req.body;
        if(data.id && data.id.trim() !== '' && data.text && data.text.trim() !== '' && data.author && data.author.trim() !== ''){
            var id = { _id: ObjectId(data.id) };
            var newData = { 
                $set: {
                    text: data.text, 
                    author: data.author
                } 
            };

            try{
                const db = client.db();
                const quotesCollection = db.collection("quotes");
                const quote = await quotesCollection.updateOne(id, newData)
                // connectionResponse.close();
                return resp.send({status: "success", data: "Quote updated successfully."});
            }catch(error){
                return resp.send({status: "error", data: "Something went wrong."});
            }
        }else{
            return resp.send({status: "error", data: "Invalid input."});
        }
    }else{
        return resp.send({status: "error", data: "Invalid input."});
    }
}

const deleteQuote = async (req, resp) => {
    const quoteId = req.params.id;
    try{
        const db = client.db();
        const quotesCollection = db.collection("quotes");
        const quote = await quotesCollection.deleteOne({
            _id: new ObjectId(quoteId)
        });
        // connectionResponse.close();
        return resp.send({status: "success", data: JSON.stringify(quote)});
    }catch(error){
        return resp.send({status: "error", data: "Something went wrong."});
    }
}

module.exports = { getAll, getOne, add, update, deleteQuote };