//import connection
import db from "../config/database.js";


//grab password
export const getPassByEmail=(email,result)=>{
    db.query("SELECT * FROM customer WHERE email = ? LIMIT 1",
    [email],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results[0]);
        }
    });
};

//get movies by genre
export const getMoviesByGenre=(genre,result) =>{
    db.query(' SELECT * FROM movie WHERE genre LIKE ?  ',
    ["%" + genre + "%" ],(err,results) =>{
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//get single user
export const getCustomerByEmail=(email,result)=>{
    db.query("SELECT Customer_id FROM customer WHERE email = ? ",
    [email],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results[0]);
        }
    });
};


//get all emails that match
export const getEmails=(data,result)=>{
    db.query("SELECT email FROM customer WHERE email = ? ", [data],(err,results)=>{
        if(err){
            console.log(err);
            result(err,null)
        } else if(results.length === 0){
            result(null,results);
        } else{
            
        }
    });
};

//add user
export const insertUser=(data,result) =>{
    db.query("INSERT INTO customer (`name`,`email`,`phone`,`password`,`IsUser`) values (? , ? , ? , ? , ?)",[data.name , data.email, data.phone, data.password, 1],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//add ticket
export const insertticket=(data,result) =>{
    db.query("INSERT INTO tickets (`price`,`Show_id`,`seat_number`,`Theatre_id`) values (? , ? , ? , ? )",[data.price , data.Show_id, data.seat, data.theatre],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};



//add reservation
export const addreservation=(info,result) =>{
    db.query("INSERT INTO reservations (`customer_id`,`ticket_id`) values (? , ?  )",[info.Customer_id,info.Ticket_id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};



// get all movies
export const getMovies=(result)=>{
    db.query("SELECT * FROM movie ", (err,results)=>{
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//get show data with show id
export const getShowByShowId=(id,result)=>{
    db.query("SELECT Show_id,start_time,end_time, YEAR(show_date) as year,MONTH(show_date) as month,DAY(show_date) as day, movie_id FROM `show` WHERE Show_id = ?; ",
    [id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results[0]);
        }
    });
};


//get show with movie id
export const getShowByMovieId=(id,result)=>{
    db.query("SELECT Show_id,start_time,end_time, YEAR(show_date) as year,MONTH(show_date) as month,DAY(show_date) as day FROM `show` WHERE movie_id = ?; ",
    [id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//grab seats for show
export const getSeatsByShowId=(id,result)=>{
    db.query("SELECT * FROM seats WHERE show_id = ? ",
    [id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};


//get single movie
export const getMovieById=(id,result)=>{
    db.query("SELECT * FROM movie WHERE Movie_id = ?",
    [id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results[0]);
        }
    });
};

//get all reservations
export const getReservations=(id,result)=>{
    let myquery= "SELECT reservations.Reservations_id, theatre.name as theatre,theatre.location,tickets.price,seats.name,show.start_time,show.end_time,MONTH(show.show_date) as month,DAY(show.show_date) as day,movie.title,seat_number FROM theatre JOIN tickets ON theatre.Theatre_id = tickets.Theatre_id JOIN reservations ON tickets.Ticket_id = reservations.ticket_id JOIN `show` ON show.Show_id = tickets.Show_id JOIN movie ON show.movie_id = movie.Movie_id JOIN seats ON seats.show_id = Show.Show_id WHERE reservations.customer_id = ? AND seats.Seat_id = seat_number;";
    db.query(myquery,
    [id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//get top movies by rating
export const getTopRatedMovies=(result) =>{
    db.query("SELECT * FROM movie ORDER BY rating DESC LIMIT 8", (err,results) =>{
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};



//insert movie to database
export const insertMovie=(data,result) =>{
    db.query("INSERT INTO movie SET ?",[data],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//update movie from database
export const updateMovieById = (data,id,result) => {
    db.query("UPDATE movie SET image = ?,title = ?, description =?,rating = ?,length = ?,genre = ?, year = ?, country = ? WHERE Movie_id = ?",[data.image, data.title,data.description,data.rating,data.length,data.genre,data.year,data.country,id], (err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
}

//update seat to occupied from database
export const updateSeatById = (data,result) => {
    db.query("UPDATE seats SET occupied = '1' WHERE Seat_id = ? ",[data.Seat_id], (err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
}

//update seat to not occupied from database
export const updateSeatByIdNo = (id,result) => {
    db.query("UPDATE seats SET occupied = '0' WHERE Seat_id = ? ",[id], (err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
}

//delete movie from database
export const deleteMovieById = (id,result) => {
    db.query("DELETE FROM movie WHERE Movie_id = ?",[id],(err,results) =>{
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//delete reservation from database
export const deleteReservationById = (id,result) => {
    db.query("DELETE FROM reservations WHERE Reservations_id = ?",[id],(err,results) =>{
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};

//delete ticket from database
export const deleteticketByseat = (id,result) => {
    db.query("DELETE FROM tickets WHERE seat_number = ?",[id],(err,results) =>{
        if(err){
            console.log(err);
            result(err,null)
        } else{
            result(null,results);
        }
    });
};