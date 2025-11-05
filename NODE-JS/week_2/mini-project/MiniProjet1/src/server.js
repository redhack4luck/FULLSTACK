const { config } = require('dotenv');
const express=require('express');
const todosRoutes=require('./routes/todos.routes');
const logger=require('./middlewares/logger');
const errorHandler=require('./middlewares/errorHandler');
const app=express();
app.use(logger);
app.use(express.json())
app.use('/api/todos',todosRoutes);
require('dotenv').config();

const PORT=process.env.PORT;
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log("server listing know in the port :",PORT);
})