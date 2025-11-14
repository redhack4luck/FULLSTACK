const Todo=require('../models/Todo');
exports.findTodos=async(f,o)=>{const{page=1,limit=10}=o;const skip=(page-1)*limit;const total=await Todo.countDocuments(f);const todos=await Todo.find(f).sort({createdAt:-1}).skip(skip).limit(limit);return{todos,total};};
exports.createTodo=(d)=>Todo.create(d);
exports.findTodoById=(id)=>Todo.findById(id);
exports.updateTodo=async(todo,up)=>{Object.assign(todo,up);return todo.save();};
exports.deleteTodo=(todo)=>todo.remove();
