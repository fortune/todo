let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById('new-todo');
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: nextId++, text, completed: false });
  input.value = '';
  save();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  save();
  render();
}

function setFilter(f) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === f);
  });
  render();
}

function render() {
  const list = document.getElementById('todo-list');
  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = `
      <li class="empty-state">
        <div class="icon">✓</div>
        <div>${filter === 'completed' ? '完了済みのタスクはありません' : 'タスクはありません'}</div>
      </li>
    `;
  } else {
    list.innerHTML = filtered.map(todo => `
      <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <div class="checkbox" onclick="toggleTodo(${todo.id})"></div>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="btn-delete" onclick="deleteTodo(${todo.id})" title="削除">✕</button>
      </li>
    `).join('');
  }

  const remaining = todos.filter(t => !t.completed).length;
  document.getElementById('remaining-count').textContent = `${remaining} 件残り`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.getElementById('new-todo').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

render();
