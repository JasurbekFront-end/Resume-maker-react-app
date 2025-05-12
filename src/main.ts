import { Todo } from './services';

Todo.List().then(todos => {
  console.log('todos = ', todos);

  const todo = todos[0];

  Todo.Single(todo.id).then(todo => {
    console.log('todo = ', todo);
  });
});
