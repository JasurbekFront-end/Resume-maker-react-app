import { Todo } from './services';

async function init() {
  const todos = await Todo.List();
  console.log('todos = ', todos);

  const todoResponse = await Todo.Single(todos[0].id);
  const todoData = await todoResponse.json();
  console.log('todo = ', todo);
}

init();
