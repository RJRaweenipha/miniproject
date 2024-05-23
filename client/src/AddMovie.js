import React, { useState } from 'react';
import axios from 'axios';
import './AddMovie.css';

function AddMovie() {
  const [movie, setMovie] = useState({
    name: '',
    image: '',
    detail: '',
    rating: '',
    date_create: ''
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(movie);
    try {
      const response = await axios.post('http://localhost:3001/api/movies', movie); // Use axios for HTTP POST request
      console.log("Test save:", response.data);
    } catch (error) {
      console.error('There was an error adding the movie!', error);
    }
  };

  return (
    <div>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={movie.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={movie.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="detail"
          placeholder="Detail"
          value={movie.detail}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={movie.rating}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_create"
          value={movie.date_create}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;