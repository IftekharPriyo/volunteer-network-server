const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2lhwg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const taskCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_ONE}`);
  const taskLists = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_TWO}`)
//   app.post('/addTasks',(req, res)=>{
//       const tasks = req.body;
//       taskCollection.insertMany(tasks)
//       .then(result =>{
//           console.log(result.insertedCount);
//           res.send(result.insertedCount);
//       })

//   })

  app.get('/taskLists',(req, res)=>{
      taskCollection.find({})
      .toArray((err, documents)=>{
          res.send(documents);
      })
  })

  app.post('/addTask',(req,res) => {
    const singleTask = req.body
    taskLists.insertOne(singleTask)
    .then(result=>{
        console.log('task added');
    })
})

});


app.listen(port);