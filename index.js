const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM movies');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add
app.post('/api/movies', async (req, res) => {
  const { name, detail, rating, image, date_create } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO movies (name, detail, rating, image, date_create) VALUES (?, ?, ?, ?, ?)',
      [name, detail, rating, image, date_create]
    );
    res.status(201).send({ id: result.insertId });
  } catch (err) {
    console.error('Error inserting movie:', err);
    res.status(500).send('Internal Server Error');
  }
});
// Get a specific movie by ID
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT * FROM movies WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a movie by ID
app.put('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, detail, rating, image } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE movies SET name = ?, detail = ?, rating = ?, image = ? WHERE id = ?',
      [name, detail, rating, image, id]
    );
    if (result.affectedRows > 0) {
      res.send({ message: 'Movie updated successfully' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a movie by ID
app.delete('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query('DELETE FROM movies WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.send({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// const express = require('express');
// const app = express();
// const port = 3001;



// const bodyParser = require("body-parser");


// // Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
// app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
// app.use(bodyParser.json()) // ส่งด้วย Data JSON

// const mysql = require("mysql2/promise");
// const dbConn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'movies_db',
//   port: 3306 
// });

// //  GET students

// app.get('/movies', async (req,res) => {
//     const connection = await dbConn
//     const rows = await connection.query('SELECT * from movies')
//     console.log(rows);
//    // res.send(rows)
//     res.json(rows);
// })
// app.delete('/movies/:id', async (req,res)=>{
//   console.log(req.params,'req.params');
//   const connection = await dbConn
//   await connection.query('Delete from movies where id = ' +req.params.id)
//   res.status(204).send("Deleted id " + req.params.id + " successful" )
// })
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from the server!' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
