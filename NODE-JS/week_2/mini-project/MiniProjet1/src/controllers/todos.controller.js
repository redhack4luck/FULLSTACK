const todoServices = require('../services/todos.service'); // kanjibo les fonctions li kay3amlo les opérations 3la todos
const sendJson = require('../utils/sendJson'); // had l-fonction katb3t réponse b format JSON w status code mzyan

// HNA KNCREEYIW GA3 LES CONTROLLERS DIALNA

const getAllTodos = (req, res) => {
   try {
      const data = todoServices.getAll(req); // kanjibo jami3 todos mn service
      if (data) {
         sendJson(res, data, 200); // ila l7aja mzyana, nb3to data b 200
      } else {
         sendJson(res, 'Failed to get data', 400); // ila ma kaynach data, nb3to erreur
      }
   } catch (e) {
      sendJson(res, e.message, 500); // catch ila t3t erreur
   }
};

const getOneTodos = (req, res) => {
   try {
      const id=parseInt(req.params.id) // kanjibo id mn params
      const data = todoServices.getOne(id); // kan3ayto 3la fonction li katjib todo b id
      if (data) {
         sendJson(res, data, 200); // nb3to todo li tl9ina
      } else {
         sendJson(res, `todos with id ${id} not found`, 400); // ila ma kaynach had id
      }
   } catch (e) {
      sendJson(res, e.message, 500); // erreur interne
   }
};

const createOneTodos=(req,res)=>{
   try {
      const data = todoServices.createOne(req); // kancreew todo jdida b data dyal req
      if (data) {
         sendJson(res, data, 201); // 201 = créé
      } else {
         sendJson(res, 'Failed to create todos', 400); // création mafchlt
      }
   } catch (e) {
      sendJson(res, e.message, 500); // erreur serveur
   }
}

const deletOneTodos=(req,res)=>{
     try{
        id=parseInt(req.params.id); // kanjibo id mn params
        data=todoServices.deletOne(id); // kan7aydo todo mn service
        if (data) {
         sendJson(res, data, 204); // 204 = supprimé
      } else {
         sendJson(res, 'Failed to delet todos', 400); // ma tms7atch
      }
     }catch(e){
        sendJson(res, e.message, 500); // erreur serveur
     }
}

const updateOneTodosPartiellemnt=(req,res)=>{
     try{
        id=parseInt(req.params.id); // kanjibo id
        data=todoServices.updateOnePartiellement(req,id); // kanbdlo ghi chi partie mn todo
        if (data) {
         sendJson(res, data, 200); // success
      } else {
         sendJson(res, 'Failed to update todos', 400); // ma tbdltch
      }
     }catch(e){
        sendJson(res, e.message, 500); // erreur
     }
}

const toggleCompletedTodo = (req, res) => {
  try {
    const id=parseInt(req.params.id); // kanjibo id
    const updatedTodo = todoServices.toggleCompleted(id); // kanbdlo valeur dyal completed (true/false)

    if (!updatedTodo) {
      return sendJson(res, `Todo with id ${req.params.id} not found`, 404); // ila ma kaynach todo
    }

    sendJson(res, updatedTodo, 200); // kolchi mzyan
  } catch (e) {
    sendJson(res, e.message, 500); // erreur interne
  }
};

// ENFIN KEXPORTEW LES FONCTIONS BACH N9ADRO NKHADMO BIHOM 3LA BARRA
module.exports = {
    getAllTodos, 
    getOneTodos,
    createOneTodos,
    deletOneTodos,
    updateOneTodosPartiellemnt,
    toggleCompletedTodo
};