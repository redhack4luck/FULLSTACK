const fs = require('fs'); // module fs bach nqraw w nktbou f fichiers
const path = require('path'); // module path bach nst3mlo paths dyal system

// had chemin howa fin kayn fichier todos.json
const todosFile = path.join(__dirname, '../data/todos.json');

// *************** LOAD TODOS ***************
function loadTodos() {
  // ila fichier ma kaynach, rja3 array khawi
  if (!fs.existsSync(todosFile)) return [];
  // qra fichier JSON w hwl data mn string l object
  const data = fs.readFileSync(todosFile, 'utf-8');
  return JSON.parse(data);
}

// *************** GET ALL TODOS ***************
function getAll(req) {
    let todos = loadTodos(); // njibo jami3 todos
    // kanjibo query params mn req
    const { status, priority, q, page = 1, limit = 10, sort = 'asc' } = req.query;

    // filter b7sb status
    if (status && status !== 'all') {
        if (status === 'completed') {
            todos = todos.filter(todo => todo.completed === true); // ghir li mkmline
        } else if (status === 'active') {
            todos = todos.filter(todo => todo.completed === false); // ghir li mazal
        }
    }

    // filter b7sb priority
    if (priority) {
        todos = todos.filter(todo => todo.priority === priority);
    }

    // filter b7sb text li f title (search)
    if (q) {
        todos = todos.filter(todo => todo.title.toLowerCase().includes(q.toLowerCase()));
    }

    // sort (tartib) b date
    todos.sort((a, b) => {
        if (sort === 'desc') {
            return new Date(b.createdAt) - new Date(a.createdAt); // men jdida l9dima
        }
        return new Date(a.createdAt) - new Date(b.createdAt); // men 9dima l jdida
    });

    // pagination
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const startIndex = (pageNumber - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;

    // njibo ghir la page li bghina
    const paginatedTodos = todos.slice(startIndex, endIndex);

    // nrd data b forma dyal pagination
    return {
        total: todos.length,
        page: pageNumber,
        limit: pageLimit,
        data: paginatedTodos
    };
}

// *************** GET ONE TODO ***************
function getOne(id){
   const todos = loadTodos(); // njibo todos kamlin
   const data = todos.find(l => l.id === id); // nqlbo 3la li 3ndo had id
   return data; // nrj3o
}

// *************** CREATE ONE TODO ***************
function createOne(req) {
  const todosList = loadTodos(); // njibo todos li kaynin daba

  // njibo id dyal a5er todo bach nzido 3lih 1
  const idOfLastElement = todosList.length > 0 ? todosList[todosList.length - 1].id : 0;

  // nsaybo todo jdida
  const newTodo = {
    id: idOfLastElement + 1,
    title: req.body.title,
    completed: false,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    createdAt: new Date().toISOString(), // l waqt dyal création
    updatedAt: "" // mazal ma tbdlatch
  };

  // nzidoha l liste
  todosList.push(newTodo);

  // nktbo data jdida f fichier JSON
  fs.writeFileSync(todosFile, JSON.stringify(todosList, null, 2));

  return todosList; // nrj3o list kamla
}

// *************** DELETE ONE TODO ***************
function deletOne(id) {
  const todos = loadTodos(); // njibo data
  const updatedTodos = todos.filter(todo => todo.id !== id); // n7ydo todo li 3ndo had id
  fs.writeFileSync(todosFile, JSON.stringify(updatedTodos, null, 2)); // nktbo fichier jdida

  return updatedTodos; // nrj3o la liste jdida
}

// *************** UPDATE ONE TODO PARTIELLEMENT ***************
function updateOnePartiellement(req, id) {
  const todos = loadTodos(); // njibo todos
  const index = todos.findIndex(todo => todo.id === id); // nqlbo 3la index dyal todo
  if (index === -1) return null; // ila ma kaynach
  const targetedTodo = todos[index]; // n9dro todo li bghina nbdlo

  // nbdlo ghi chi champs li jat f body
  if (req.body.title) targetedTodo.title = req.body.title;
  if (req.body.dueDate) targetedTodo.dueDate = req.body.dueDate;
  if (req.body.priority) targetedTodo.priority = req.body.priority;
  if (req.body.completed !== undefined) targetedTodo.completed = req.body.completed;
  targetedTodo.updatedAt = new Date().toISOString(); // nbdlo l waqt dyal update
  todos[index] = targetedTodo; // n3awdo nsddo f array
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2)); // nktbo fichier

  return targetedTodo; // nrj3o todo li tbdlt
}

// *************** TOGGLE COMPLETED ***************
function toggleCompleted(id){
   const todos = loadTodos(); // njibo todos
   const indexOftargetedTodos = todos.findIndex(l => l.id === id); // nqlbo 3la todo b id
   if (indexOftargetedTodos === -1) return null; // ila ma kaynach
   const targetedTodo = todos[indexOftargetedTodos];
   targetedTodo.completed = !targetedTodo.completed; // nbdlo men true l false ola l3aks
   targetedTodo.updatedAt = new Date().toISOString(); // l waqt dyal update
   todos[indexOftargetedTodos] = targetedTodo; // n3awdo nsddo
   fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2)); // nktbo fichier
   return targetedTodo; // nrj3o todo li tbdlt
}

// *************** EXPORT ***************
module.exports = {
  getAll, // bach n9dro n3ayto 3lihom f controller
  getOne,
  createOne,
  deletOne,
  updateOnePartiellement,
  toggleCompleted
};