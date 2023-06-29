import express from 'express';
import config from './src/db/config.js';
import routes from './src/routes/routes.js';
import cors from 'cors'
// import todoRoutes from './routes/todoRouters.js'
// import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';//auth of all languages- has methods and encryption algorithim
//have headers (contain alg and token type)-used to send authentication to and frothat contains the metadata info about the JSON web token-

const app = express ();

//middleware --accepts data from frontend and pass it to backend
app.use(express.json());//-accepts data from frontend & format it
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//jwt middleware-indusrty standard method  for representing claims securely between two parties.
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// app.use(bodyParser);//sending data via req_body -- either JSON, Form-encode in localhost


//todo expects express as app
routes(app);//custom function 

app.get('/', (req, res) => {
    res.send('hello welcome to my task management system')
    
})

//server should  listen to our configs >> obj
app.listen(config.port || 5000, () => {
    console.log("server is running on");
})