const express = require("express");
const checkAuth = require('../middleware/LogginValidation');
const Todo = require("../controllers/todos");

module.exports = () => {
    const router = express.Router();

    router.get('/', checkAuth.isLogin, async (req, res) => {
        try {
            let completedTodos = await Todo.getCompletedTodos(req.user);
            let notCompletedTodos = await Todo.getNotCompletedTodos(req.user);
            res.render("todos", {completedTodos, notCompletedTodos, message: req.flash("message")})
        } catch (error) {
            req.flash('message', error.error.message || error.error)
            res.redirect('back');          
        }
    })
    
    router.post('/newTodo', checkAuth.isLogin, async (req, res) => {
        try {
            let todo = await Todo.createTodo(req.user, req.body);
            res.status(201).json(todo);
        } catch (error) {
            res.status(error.status).json({error, message: error.error.message || error.error})
        }
    })

    router.post("/complete/:todoId", checkAuth.isLogin, async (req, res) => {
        try {
            let todo = await Todo.completeTodo(req.user, req.params.todoId)
            res.status(200).json(todo);
        } catch (error) { 
            res.status(error.status).json({error, message: error.error.message || error.error})

        }
    })
    
    router.post('/delete/:todoId', checkAuth.isLogin, async (req, res) => {
        try {
            let todo = await Todo.deleteTodo(req.params.todoId, req.user);
            res.status(200).json(todo);
        } catch (error) {
            res.status(error.status).json({error, message: error.error.message || error.error})                        
        }
    })
    return router;
}