import sql from 'mssql';
import config from '../db/config.js'

//controllers: stores different logic

//NB:REPLACE DESCRIPTION WITH USERS TABLE FIELD AFTER ID

//get all todos
export const getTodos = async (req, res) => {
    // res.send('my todos');
    try {
        //create a connection to db --fetch data
        let pool = await sql.connect(config.sql) //for sql library to connect it requires sqlconfig>>obj
        //create a var for results which  awaits the connect(pool), and request a query in DB
        const result = await pool.request().query("SELECT * FROM Users")
        //fomart data before sending back --.json
        // res.send(result);
        // res.send(result.rowsAffected);
        // res.status(200).json(result.recordset.length);//give a stus code of 200 & format the data to json--getting the length
        // res.send(result.rowsAffected);
        !result.recordset[0] ? res.status(404).json({ message : 'user not found' }) : //check if exist and display a mssg(fixed show blank)
        res.status(200).json(result.recordset);
        // res.send(result.recordset);//for a specific --confirm from the general output
        
    } catch (error) {
        res.status(201).json({ error: 'an error occurs while retrieving users'})
        
    } finally { 
        //close the connection
        sql.close();
    }
}

//create a todo--advanced concept: should check whether the data to be inserted is already there
export const createTodo = async (req, res) => {
    try {
        //extract the data coming from the frontend--destructure
        
        const { user_id, username, email, role, password, date_of_birth } = req.body; //get the description from the req_body coz the id keeps incrementing
        //create a connection
        let pool = await sql.connect(config.sql);
        //insert 
        await pool.request() //inserting into
        //prepare the inserts from(to 
            // .input('user_id', sql.VarChar, user_id)
            .input('user_id', sql.VarChar, user_id) 
            .input('username', sql.VarChar, username) //grab the desc value from the req_body, check if is of type varchar and carry it
            .input('email', sql.VarChar, email)
            .input('role', sql.VarChar, role)
            .input('password', sql.VarChar, password)
            .input('date_of_birth', sql.Date, date_of_birth)
            .query("INSERT INTO Users (user_id, username, email, role, password, date_of_birth) VALUES (@user_id, @username, @email, @role, @password, @date_of_birth)");//insert the value grabbed here(match using @)
        res.status(200).json({ message: 'user added successfully'});
    } catch (error) {
        res.status(500).json({ error});
        console.log(error)
        
    } finally {
        sql.close();

    }
    //create a middle ware in main js file--rerun the query in sql to confirm insertion
    // res.send('create a todo');
} 


//get a todo
export const getTodo = async (req, res) => {
    // res.send('get a todos');
    try {
        //use req_params to get sth and destructure it to get specific thing
        const { user_id } = req.params;//param can be the user_id, id is specific in params.id
        let pool = await sql.connect(config.sql);
        const result = await pool.request()//get the todo
            .input('user_id', sql.Int, user_id)//check validation(datatypes supported from the mssql documentation --NB: ID type string>> INT, VarChar
            .query("SELECT * FROM Users WHERE user_id = @user_id");
        !result.recordsets ? res.status(404).json({ message : 'user not found' }) :
        res.status(200).json(result.recordsets);//access a single object in arr

    } catch (error) {
        res.status(500).json({ error: 'An error occured while retrieving a user'});
        
        
    } finally {
        sql.close()
    }
}

//update a todo
export const updateTodo = async (req, res) => {
    // res.send('update todos');
    try {
        const { user_id } = req.params;
        const { username } = req.body;
        // const { email } = req.body;
        // const { role } = req.body;
        // const { password } = req.body;
        // const { date_of_birth } = req.body;

        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('username', sql.VarChar, username)
            // .input('useremail', sql.VarChar, email)
            // .input('role', sql.VarChar, role)
            // .input('password', sql.VarChar, password)
            // .input('date_of_birth', sql.VarChar, date_of_birth)
            .query("UPDATE Users SET username = @username WHERE user_id = @user_id");
        res.status(200).send({ message: 'User updated successfully'});
    } catch (error) {
        res.status(500).json({ error: 'An error occured while updating a user'});
        
    } finally {
        sql.close();
    }
}

//delete a todo
export const deleteTodo = async (req, res) => {
    // res.send('delete a todo');
    try {
        const { user_id } = req.params;
        await sql.connect(config.sql);
        await sql.query(`DELETE FROM Users WHERE user_id = ${user_id}`)
        res.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
        res.status(400).json({ error});
        console.log(error);
        
    } finally {
        sql.close();
    }
}

