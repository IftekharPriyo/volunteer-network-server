const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
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

  // to upload bulk data

//   app.post('/addTasks',(req, res)=>{
//       const tasks = req.body;
//       taskCollection.insertMany(tasks)
//       .then(result =>{
//           console.log(result.insertedCount);
//           res.send(result.insertedCount);
//       })

//   })

// admins api to add events
app.post('/addToCollection',(req, res) => {
    const task = req.body
    console.log(task)
    taskCollection.insertOne(task)
    .then(result=>{
        console.log(result);
    })
})

// to render all the tasks
  app.get('/taskLists',(req, res)=>{
      taskCollection.find({})
      .toArray((err, documents)=>{
          res.send(documents);
      })
  })

// to add task in personal profile
  app.post('/addTask',(req,res) => {
    const singleTask = req.body
    taskLists.insertOne(singleTask)
    .then(result=>{
        console.log('task added');
    })
})

//to display one's assigned tasks
app.get('/onesTasks',(req,res) => {
    taskLists.find({email:req.query.email})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})

// to delete one's tasks
app.delete('/delete/:id',(req,res)=>{
    taskLists.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
        
    })
})

// to see all the assigned tasks in individual profile
app.get('/allTasks',(req,res) => {
    taskLists.find({})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})

});


app.listen(port);