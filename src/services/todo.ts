import type { Todo } from '../types';

export async function List() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');

  return response.json();
}

export function Single(todoId: number) {
  return new Promise<Todo>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/todos/${todoId}`);
    xhr.send();
    xhr.onload = () => {
      const todo: Todo = JSON.parse(xhr?.responseText);
      resolve(todo);
    };

    xhr.onerror = () => {
      reject(new Error('Network Error'));
    };
  });
}
