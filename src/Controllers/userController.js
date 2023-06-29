import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};


export const register = async (req, res) => {
    const { user_id, username, email, role, password, date_of_birth } = req.body;//destructuring from the form
    const hashedPassword = bcrypt.hashSync(password, 10);//salt=10, hashSync=await
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE username = @username OR email = @email');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({ error: 'User already exists' });
        } else {
            await pool.request()
                .input('user_id', sql.VarChar, user_id)
                .input('username', sql.VarChar, username)
                .input('email', sql.VarChar, email)
                .input('role', sql.VarChar, role)
                .input('password', sql.VarChar, hashedPassword)//TABLE VALUES
                .input('date_of_birth', sql.VarChar, date_of_birth)
                .query('INSERT INTO Users (user_id, username,  email, role, password, date_of_birth) VALUES (@user_id, @username,  @email, @role, @password, @date_of_birth)');
            res.status(200).send({ message: 'User created successfully' });
            // res.send("created")
           
        }

    } catch (error) {
        // res.status(500).json({ error });
        console.log(error);
        // res.send(error)
    } finally {
        sql.close();
    }

};

export const login = async (req, res) => {
    const { username, password } = req.body;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .query('SELECT * FROM Users WHERE username = @username');
    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Authentication failed. Wrong credentials.' });
        
    } else {
        if (!bcrypt.compareSync(password, user.password)) {//password-table field
            res.status(402).json({ error: 'Authentication failed. Wrong credentials.' }); 
        } else {
            const token = `JWT ${jwt.sign({ username: user.username, email: user.email }, config.jwt_secret)}`;
            res.status(200).json({ email: user.email, username: user.username, id: user.user_id, token: token });
        }
    }

};