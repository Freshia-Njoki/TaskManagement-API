import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../Controllers/todoController.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../Controllers/taskController.js";
import {
  login,
  register,
  loginRequired,
} from "../Controllers/userController.js";

const routes = (app) => {
  //todo routes
  app
    .route("/todos")
    .get(loginRequired, getTodos)
    .post(loginRequired, createTodo);

  app
    .route("/todo/:id")
    .put(loginRequired, updateTodo)
    .get(loginRequired, getTodo)
    .delete(loginRequired, deleteTodo);

  app.route("/tasks").get(loginRequired, getTasks).post(loginRequired, createTask);

  app.route("/task/:id").put(updateTask).get(getTask).delete(deleteTask);

  // auth routes
  app.route("/auth/register").post(register);

  app.route("/auth/login").post(login);
};
export default routes;
