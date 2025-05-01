const STORAGE_KEY = 'todos';

const todoService = {
  getAllTodos() {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  },

  addTodo(todo) {
    const todos = this.getAllTodos();
    const id = Date.now().toString();
    const newTodo = { ...todo, id };
    todos.push(newTodo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return id;
  },

  toggleTodo(id) {
    const todos = this.getAllTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  },

  deleteTodo(id) {
    const todos = this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTodos));
  }
};

export default todoService;