import { redirectBtn, wrapperElm } from './elements';
import { Todo } from './services';

function renderLoading(element: HTMLElement) {
  element.innerHTML = `
  <div id="loadingSpinner" class="flex items-center justify-center p-8">
    <div class="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
    <span class="ml-3 text-gray-600">Loading todos...</span>
  </div>`;
}

async function renderTodo(todoId: number) {
  renderLoading(document.body);

  const todo = await Todo.Single(todoId);

  document.body.innerHTML = `
  <div class="p-8">
    <h1 class="text-2xl font-bold">${todo.title}</h1>
    <p class="mt-4 text-gray-600">${todo.completed ? 'Completed' : 'Not Started'}</p>
  </div>
  `;
}

async function renderTodos() {
  renderLoading(wrapperElm);
  const todos = await Todo.List();
  wrapperElm.innerHTML = `        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">User ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white" id="todoTableBody">
           ${todos.reduce((a: string, todo) => {
             return `${a}<tr class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">${todo.id}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">${todo.userId}</td>
              <td class="px-6 py-4 text-sm text-gray-900" onclick="window.history.pushState(null, '', '/todos/${todo.id}');window.dispatchEvent(new Event('change-pathname'));">${todo.title}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${todo.completed ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}">
                ${todo.completed ? 'Completed' : 'Not Started'}</span>
              </td>
            </tr>`;
           }, '')}
          </tbody>
        </table>`;
}

window.addEventListener('change-pathname', () => {
  const pathname = window.location.pathname;

  const todoId = pathname.split('/').pop() as unknown as number;

  renderTodo(todoId);
});

// Initial render
renderTodos();
