import express from "express";

import cors from "cors";

import Router from "./routes/routes.js";

import session, { Cookie, Session } from "express-session";

import bcrypt from "bcrypt";
import { addreservation, getEmails, getPassByEmail, insertticket, insertUser } from "./models/movieModel.js";

import db from "./config/database.js";

import cookieParser from 'cookie-parser';

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", 1);

const store = new session.MemoryStore();



const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'some secret',
    cookie: { maxAge: 100*100*60*60*12,
            secure: true,
            httpOnly:false,
        sameSite: "none"},
    //    domain:'https://master--vermillion-zabaione-03d5a9.netlify.app'},
    saveUninitialized: false,
    resave: true,
    store,
}));

app.use((req,res,next) =>{
    console.log(store);
    console.log(`${req.method} - ${req.url}`);
    next();
});

app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:5000',
        'https://master--vermillion-zabaione-03d5a9.netlify.app',
        'http://localhost:5173',
    ],
    
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

app.use(Router);

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', "https://master--vermillion-zabaione-03d5a9.netlify.app");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.post('/register',async (req,res) => {

    
        const hashedPassword = await bcrypt.hash(req.body.password,10);
       const proceed = {
        name: req.body.name,
        email:req.body.u_email,
        phone:req.body.phone,
        password:hashedPassword,
        isUser:req.body.isUser,
    }
        
    let sqlquery = "SELECT email FROM customer WHERE email = ? lIMIT 1 ";
    db.query(sqlquery,proceed.email,function(error,results){
        if(error){
            console.log(error);
            return
        }
        if(results.length){
            res.redirect(401,"http://localhost:5173/register");
        }
        else{ try{
            insertUser(proceed,(err,results) => {
                if (err) {
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
            
            }catch(err){
              console.log(err);
          
             }} 
    })
    
   
    
})

app.post('/login',async (req,res) => {
    
    console.log(req.sessionID);
    const email= req.body.u_email;
    const password=req.body.password;
   // const email = 'john@gmail.com';
   // const password = 'Gnjavator1!';

    if(email && password){
        console.log("happens");
        let sqlquery = "SELECT password FROM customer WHERE email = ? LIMIT 1 ";
   db.query(sqlquery, email, async function (error, results) {
            if (error) {
                console.log(error);
                return;
            }
            if (!results.length) {
                console.log("Invalid email/password");
                res.redirect(401, "http://localhost:5173/login");
                return;
            } else {
                const isValid = await bcrypt.compare(password, results[0].password);

                if (isValid) {
                    console.log("password and email is correct");
                    req.session.authenticated = true;
            /*for testing purposes*/ const id = req.session.id;
                    req.session.user = {
                        email,
                        authenticated: true,
                /*for testing purposes*/ id
                    };
                    req.session.save();
                    console.log(req.session.user);
                    return res.send(200);
                    // res.sendStatus(200);
                }
                else {
                    console.log("password is invalid");
                    res.redirect(403, "http://localhost:5173/login");
                    res.end();
                    return;
                }
            }
        });
 
    }
 else{
 }
});

app.get('/email',async(req,res) =>{
    return res.json(req.session.user.email);
});

app.get('/loggingout',async (req,res) => {
    
    if(req.session.user){
    req.session.destroy();
    req.session = null;
    return res.sendStatus(200);
    
    }
    return res.sendStatus(200);

});

app.get('/logstatus', async (req,res) =>{

    if(req.session.user){
        console.log(req.session.user.id, "There is somethinnn");
        return res.json("logged");
       
    }else
     console.log("not logged in");
     return res.json("not inside");

});

app.get('/specificuser', async (req,res) =>{
    try{
        let sqlqueryy="SELECT Customer_id FROM customer WHERE email = ?";
        db.query(sqlqueryy,req.session.user.email,async function(error,results){
            if(error){
                console.log(err);
            }
            else{
               return res.json(results[0]);
            }
        })
        }catch(err){
            console.log(err);
        }
})

app.post('/reserve',async (req,res) => {

    if(req.session.user){
    req.session.user.seat = req.body.seat;
    req.session.user.Show_id = req.body.Show_id;
    const data= {seat:req.body.seat,Show_id:req.body.Show_id,price:'10',theatre:'1'}
   var done= false;
  var twoqueriesdone=false;
    try{ insertticket(data,async function(err,results) {
        if (err) {
            res.send(err);
        }else{
            res.json(results);
            done = true;
            if(done){
                try{
                    let sqlquery="SELECT Ticket_id FROM tickets WHERE seat_number = ?";
                const info = db.query(sqlquery,req.body.seat,async function(error,results){
                        if(error){
                            console.log(err);
                        }
                        else{
                            req.session.user.Ticket_id = results[0].Ticket_id;
                            console.log(req.session.user,req.session.user.Customer_id, "THIS IS USERRRRR");
                        }
                    })
                }catch(err){
                    console.log(err);
                }
                try{
                    let sqlqueryy="SELECT Customer_id FROM customer WHERE email = ?";
                    db.query(sqlqueryy,req.session.user.email,async function(error,results){
                        if(error){
                            console.log(err);
                        }
                        else{
                            req.session.user.Customer_id = results[0].Customer_id;
                            twoqueriesdone = true;
                        }    console.log(req.session.user,req.session.user.Customer_id, "THIS IS USERRRRR at customer");
                        if(twoqueriesdone){
                            try{
                                let mysqluery = "INSERT INTO reservations (`customer_id`,`ticket_id`) values (? , ?  )";
                                console.log(req.session.user,req.session.user.Customer_id, "THIS IS USERRRRR before reservations");
                                db.query(mysqluery,[req.session.user.Customer_id,req.session.user.Ticket_id],async function(error,results) {
                                    if(error){
                                        console.log(error);
                                    } else{
                                    }
                                });
                            
                            }catch(err){
                                console.log(err);
                            }
                        }
                    })
                }catch(err){
                    console.log(err);
                }
                       
}
        }
    });
}catch(err){
    console.log(err);
};
    try{
        db.query("UPDATE seats SET occupied = '1' WHERE Seat_id = ? ",[req.session.user.seat], (err,results) => {
            if(err){
                console.log(err);
            } else{
            }
        });
    }catch(err){
        console.log(err);
    }
}
})

//handle production

// if(process.env.NODE_ENV === 'production'){
    //static folder
//    app.use(express.static(path.resolve('dist/')));

    //handle SPA
 //   app.get(/.*/,(req,res) => res.sendFile(path.resolve('dist/index.html')));
// }  C:\Users\LEO\Movie-project\dist\index.html

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(` Server is running at https:localhost:${port} ` ));
