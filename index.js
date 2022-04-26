const express = require('express');
const bodyParser = require('body-parser');
//solve cors issue
const cors = require("cors");
const { removeAllListeners } = require('nodemon');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
const port = 5000;
const Pool = require('pg').Pool;

  //Enter here your Postres database details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432
});
  
  //Database connection and also please create postgres database first
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    // client.query('SELECT NOW()', (err, result) => {
    //     release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
// })
  
app.get('/users', (req, res, next) => {
    
    pool.query('Select * from services')
        .then(testData => {
            // console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/doctors', (req, res, next) => {
   
    pool.query('Select * from doctors')
        .then(testData => {
            // console.log(testData);
            res.send(testData.rows);
        })
})


app.post('/book', (req, res) => {debugger;
    const { name,number, email,doctorname,date,time} = req.body

    pool.query('INSERT INTO BookAppointment (name,number, email,doctorname,date,time) VALUES ($1, $2, $3, $4, $5, $6)', [name,number, email,doctorname,date,time], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${res.insertId}`)
    })
    
  })


app.listen(port, () => {
  console.log(` app is running on port ${port}.`);
});