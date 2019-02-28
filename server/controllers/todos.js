const Todo = require("../models/todos");

const createTodo = async (user, data) => {
    try {
        if(!user) throw ("User not sent");
        if(!data) throw ("Data not sent");
        if(!data.text) throw ("text can not be empty");
        let newTodo = new Todo({
            user: user._id,
            text: data.text
        })

        newTodo = await newTodo.save()
        return newTodo
    } catch (error) {
            throw ({status: 400, error})
    }
}

const getCompletedTodos = async (user) => {
    try {
        if(!user) throw ("User not sent");
        let todos = await Todo.find({user: user._id, completed: true}).sort({createdAt: -1})
        return todos        
    } catch (error) {
        throw ({status: 400, error})
    }
}

const getNotCompletedTodos = async (user) => {
    try {
        if(!user) throw ("User not sent");
        let todos = await Todo.find({user: user._id, completed: false}).sort({createdAt: -1})
        return todos        
    } catch (error) {
        throw ({status: 400, error})
    }
}

const completeTodo = async (user, todoId) => {
    try {
        if(!user) throw ("User not sent");
        if(!todoId) throw ("Todo not sent");
        let todo = await Todo.findOneAndUpdate({user: user._id, _id: todoId}, {$set: {completed: true}}, {new: true})
        if(todo == null){
            throw ({status: 404, message: "Todo not found"})
        }
        return todo
    } catch (error) {
        throw ({status: error.status || 400, error})
    }
}
const deleteTodo = async (todoId, user) => {
    try {
        if(!todoId) throw("Data not sent");
        let todo = await Todo.findOneAndDelete({user: user._id, _id: todoId})
        if(todo == null){
            throw ({status: 404, message: "Todo not found"})
        }
        return todo
    } catch (error) {
        throw ({status: error.status || 400, error})
    }
} 

module.exports = {createTodo, getCompletedTodos, getNotCompletedTodos, deleteTodo, completeTodo}