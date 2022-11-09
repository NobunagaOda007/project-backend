//import functions from Movie model
import{
    getMovies,
    getMovieById,
    getTopRatedMovies,
    getMoviesByGenre,
    insertMovie,
    updateMovieById,
    deleteMovieById,
    insertUser,
    getEmails,
    getShowByMovieId,
    getSeatsByShowId,
    getShowByShowId,
    insertticket,
    getCustomerByEmail,
    getReservations,
    deleteReservationById,
    deleteticketByseat,
    updateSeatByIdNo,
} from "../models/movieModel.js";


//show all emails
export const showMEmails=(req,res) =>{
    const data=req.body.email;
    getEmails([data.email],(err,results) =>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });

    };

//insert user -> we are calling insert ticket in index.js instead
export const createTicket = (req,res) => {
    const data=req.body;
    insertticket(data,(err,results) => {
        if (err) {
            res.send(err);
        }else{
            res.json(results);
        }
    });
} ;

//insert user -> we are calling insert user in index.js instead
export const createUser = (req,res) => {
    const data=req.body;
    insertUser(data,(err,results) => {
        if (err) {
            res.send(err);
        }else{
            res.json(results);
        }
    });
} ;
//get all movies
export const showMovies=(req,res) =>{
    getMovies((err,results) =>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });

    };

    //show all shows with that movie id
export const showByMovieId=(req,res) => {
    getShowByMovieId(req.params.id,(err,results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};


//show all seats for show
export const showSeatsById=(req,res) =>{
    getSeatsByShowId(req.params.id,(err,results) =>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });

};

    //get single show
    export const showShowById=(req,res) => {
        getShowByShowId(req.params.id,(err,results) => {
            if(err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    };

        //get all reservations
        export const showReservations=(req,res) => {
            getReservations(req.params.id,(err,results) => {
                if(err){
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        };

    //get single movie
    export const showMovieById=(req,res) => {
        getMovieById(req.params.id,(err,results) => {
            if(err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    };

    //get single user
    export const showCustomerByEmail=(req,res) => {
        getCustomerByEmail(req.params.email,(err,results) => {
            if(err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    };

    //get top rated movies
    export const showTopRatedMovies=(req,res) =>{
        getTopRatedMovies((err,results) => {
            if(err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    };

    //get movies by genre
    export const showMoviesByGenre =(req,res) =>{
        getMoviesByGenre(req.params.genre,(err,results) => {
            if(err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    };

    //create new movie
    export const createMovie = (req,res) => {
        const data=req.body;
        insertMovie(data,(err,results) => {
            if (err) {
                res.send(err);
            }else{
                res.json(results);
            }
        });
    } ;

    //delete movie
    export const deleteMovie = (req,res) =>{
        const id = req.params.id;
        deleteMovieById(id, (err,results) => {
            if (err) {
                res.send(err);
            }else{
                res.json(results);
            }
        });
    };

        //delete reservations
        export const deleteReservation = (req,res) =>{
            const id = req.params.id;
            deleteReservationById(id, (err,results) => {
                if (err) {
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        };

            //delete ticket
            export const deleteTicket = (req,res) =>{
                const id = req.params.seat;
                deleteticketByseat(id, (err,results) => {
                    if (err) {
                        res.send(err);
                    }else{
                        res.json(results);
                    }
                });
            };

    //update movie
    export const updateMovie = (req,res) =>{
        const data = req.body;
        const id = req.params.id;
        updateMovieById(data,id,(err,results) => {
                if (err) {
                    res.send(err);
                }else{
                    res.json(results);
                } 
        })};

            //update seat to 0
    export const updateSeat = (req,res) =>{
        const id = req.params.seat;
        updateSeatByIdNo(id,(err,results) => {
                if (err) {
                    res.send(err);
                }else{
                    res.json(results);
                } 
        });
    };