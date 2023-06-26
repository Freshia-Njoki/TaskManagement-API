import dotenv from 'dotenv';
import assert from 'assert'; // assert is a nodejs module that validates if a condition is true or false

dotenv.config();//to get the process

//getting(by destructuring) configs from .env
//process.env - service that's always running in node
const { PORT, HOST, HOST_URL, SQL_SERVER, SQL_PWD, SQL_USER, SQL_DB, JWT_SECRET } = process.env;

//handle sql encrypted --for security reasons
const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

//assert - nodejs module,if port/host is empty log port is required
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

//create a configuration & export it
const config = {
    port : PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DB,
        user: SQL_USER,
        password: SQL_PWD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    },
    jwt_secret: JWT_SECRET,
};

export default config;