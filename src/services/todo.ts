import type { Todo } from '../types';
import { delay } from '../utils';

export async function List() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos: Todo[] = await response.json();
  await delay(3000);
  return todos;
}

export async function Single(todoId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  const todo: Todo = await response.json();
  await delay(3000);

  return todo;
}
