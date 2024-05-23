const express = require('express');
const app = express();
const port = 3001;



const bodyParser = require("body-parser");


// Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
app.use(bodyParser.json()) // ส่งด้วย Data JSON

const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'movies_db',
  port: 3306 
});

//  GET students

app.get('/movies', async (req,res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from movies')
    console.log(rows);
   // res.send(rows)
    res.json(rows);
})
app.delete('/movies/:id', async (req,res)=>{
  console.log(req.params,'req.params');
  const connection = await dbConn
  await connection.query('Delete from movies where id = ' +req.params.id)
  res.status(204).send("Deleted id " + req.params.id + " successful" )
})
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
