// KN3AYTO 3LA EXPRESS O KNSAWBO WHD ROUTER
const express = require('express');
const router = express.Router();
// KNJIBO CONTROLLERS DIALNA
const todosController=require('../controllers/todos.controller');
// HNA KNJIBO WHD MIDDLEWARE SPECIAL (MACHI GENERAL)
const todosMiddlewares=require('../middlewares/validateReq');
// HNA KNSAWBO ROUTES DIALNA (CHEMIN + CONTROLLER LI RAYTKALF B ROUTE)
router.get('/',todosController.getAllTodos);
router.get('/:id',todosController.getOneTodos)
router.post('/',todosMiddlewares,todosController.createOneTodos);
router.delete('/:id',todosController.deletOneTodos);
router.patch('/:id',todosController.updateOneTodosPartiellemnt);
router.patch('/:id/toggle',todosController.toggleCompletedTodo);
// FLAKHR KAN EXPORTEW router KAML BACH NKHADMO BIH F server.js
module.exports=router;