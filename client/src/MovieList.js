import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon } from '@mui/icons-material';
import './MovieList.css';

function MovieList() {
  const [moviesData, setMoviesData] = useState([]);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/movies')
      .then(response => response.json())
      .then(data => {
        setMoviesData(data[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOpen = (movie) => {
    setOpen(true);
    setMovieToDelete(movie);
  };

  const handleClose = () => {
    setOpen(false);
    setMovieToDelete(null);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const deleteMovie = () => {
    if (movieToDelete) {
      fetch(`/movies/${movieToDelete.id}`, {
        method: 'DELETE',
      })
      .then(response => {
        console.log("response", response);
          setMoviesData(moviesData.filter(movie => movie.id !== movieToDelete.id));
          handleClose();
        })
        .catch(error => {
          console.error('Error deleting movie:', error);
          handleClose();
        });
    }
  };

  return (
    <div>
      <div className="MovieList">
        <div className='title'>
          <img style={{ width: '50px', height: '50px', marginRight: '15px' }} src="tv.png" alt='' />
          <h1>Movie List</h1>
        </div>
        <div className='title'>
          <Link to="/add-movie" className="add-movie-button">Add Movie</Link>
        </div>
      </div>
      <div className="movie-container">
        {moviesData.map(movie => (
          <div className="movie-card" key={movie.id}>
            <div className="movie-card-header">
              <h2>{movie.name}</h2>
              <IconButton onClick={() => handleOpen(movie)} color="error">
                <DeleteIcon />
              </IconButton>
            </div>
            <img src={movie.image} alt={movie.title} />
            <p style={{ fontSize: 'larger' }}>รายละเอียด</p>
            <div style={{ height: '80px' }}>
              <p>{movie.detail}</p>
            </div>
            <p>คะแนน :{movie.rating}</p>
          </div>
        ))}
      </div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ยันยืนการลบข้อมูล
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            คุณต้องการลบเรื่อง "{movieToDelete?.name}" ใช่ไหม?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="contained" color="error" onClick={deleteMovie} sx={{ mr: 2 }}>
              ลบ
            </Button>
            <Button variant="contained" onClick={handleClose}>
              ยกเลิก
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default MovieList;
