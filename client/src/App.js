import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import './App.css';

function App() {
  return (
    <Router>
      <div className="background-image">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
