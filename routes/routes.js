import express from "express";

//import functions from controlleer
import {
    showMovies,
    showMovieById,
    showTopRatedMovies,
    showMoviesByGenre,
    createMovie,
    deleteMovie,
    updateMovie,
    createUser,
    showByMovieId,
    showSeatsById,
    showShowById,
    showCustomerByEmail,
    showReservations,
    deleteReservation,
    deleteTicket,
    updateSeat,
} from "../controllers/movies.js";

//initialise express router
const router = express.Router();

//get all movies
router.get("/movies", showMovies);

//get top rated movies
router.get("/movies/topRated", showTopRatedMovies);

//get single movie
router.get("/movies/:id",showMovieById);

//get single user
router.get("/movies/users/:email",showCustomerByEmail);


//get movies by genre
router.get("/movies/genres/:genre",showMoviesByGenre);

//get specific show
router.get("/movies/show/:id",showShowById);

router.get("/movies/allresevations/:id",showReservations);

//get shows for movie
router.get("/movies/shows/:id",showByMovieId);

//get seats for show
router.get("/movies/reservations/:id",showSeatsById);

//create new movie
router.post('/movies', createMovie);


//delete movie
router.delete('/movies/:id', deleteMovie);
//delete reservation
router.delete('/movies/reserved/:id',deleteReservation);

router.delete('/movies/reserved/ticket/:seat',deleteTicket);

//update movie
router.put('/movies/:id', updateMovie);

//update seat to not occupied
router.put('/movies/seat/:seat', updateSeat);

//export default router
export default router;