import sql from "mssql";
import config from "../db/config.js";

// // Get all tasks
export const getTasks = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("select * from Tasks");
    res.status(200).json(result.recordset);
    // console.dir(result);
  } catch (error) {
    res
      .status(201)
      .json({ error: "an error occurred while creating the task" });
  } finally {
    sql.close(); // Close the SQL connection
  }
};

// // Get a single task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("task_id", sql.Int, id)
      .query("select * from Tasks where task_id = @task_id");
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    sql.close();
  }
};

// // Create a new task
export const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    let pool = await sql.connect(config.sql);
    let insertTask = await pool
      .request()
      .input("description", sql.VarChar, description) 
      // Insert the description into the SQL query
      .input("status", sql.VarChar, "status")
      .query("insert into Tasks (description, status) values (@description, @status)"); // Execute the SQL query
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the task" });
  } finally {
    sql.close(); // Close the SQL connection
  }
};
// // Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("task_id", sql.Int, id)
      .input("description", sql.VarChar, description)
      .query("UPDATE Tasks SET description = @description WHERE task_id = @task_id");
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the task" });
  } finally {
    sql.close();
  }
};
// // Delete a task
// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input('id', id) // Assuming the parameter name in the query is @id
      .query('DELETE FROM Tasks WHERE task_id = @id');
   
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete the task" });
  } finally {
    sql.close();
  }
};

