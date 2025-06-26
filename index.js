const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let todos = [];
let currentId = 1;

app.get('/api/todos', (req, res) => {
  res.json({
    status: "success",
    message: "Todos retrieved successfully",
    data: todos
  });
});

app.post('/api/todos', (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTodo = {
    id: currentId++,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.json({
    status: "success",
    message: "Todo created successfully",
    data: newTodo
  });
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  res.json({
    status: "success",
    message: "Todo retrieved successfully",
    data: todo
  });
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  const { title, description, completed, dueDate } = req.body;
  todo.title = title;
  todo.description = description;
  todo.completed = completed;
  todo.dueDate = dueDate;
  res.json({
    status: "success",
    message: "Todo updated successfully",
    data: todo
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  todos.splice(index, 1);
  res.json({
    status: "success",
    message: "Todo deleted successfully",
    data: null
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
