const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = taskText;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = taskText;
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'task-actions';
  
  const statusBtn = document.createElement('button');
  statusBtn.className = 'btn btn-status btn-ongoing';
  statusBtn.textContent = 'Ongoing';
  statusBtn.addEventListener('click', toggleStatus);

  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', editTask);
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-save';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', saveTask);
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', deleteTask);
  
  actionsDiv.appendChild(statusBtn);
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(saveBtn);
  actionsDiv.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(editInput);
  li.appendChild(actionsDiv);
  taskList.appendChild(li);
  taskInput.value = '';
}

function toggleStatus(event) {
  const btn = event.target;
  const li = btn.closest('li');
  if (btn.textContent === 'Ongoing') {
    btn.textContent = 'Completed';
    btn.classList.remove('btn-ongoing');
    btn.classList.add('btn-completed');
    li.classList.add('completed-task');
  } else {
    btn.textContent = 'Ongoing';
    btn.classList.remove('btn-completed');
    btn.classList.add('btn-ongoing');
    li.classList.remove('completed-task');
  }
}

function editTask(event) {
  const li = event.target.closest('li');
  li.classList.add('editing');
  const editInput = li.querySelector('.edit-input');
  editInput.focus();
}

function saveTask(event) {
  const li = event.target.closest('li');
  const editInput = li.querySelector('.edit-input');
  const span = li.querySelector('.task-text');
  const newText = editInput.value.trim();
  if (newText !== '') {
    span.textContent = newText;
    li.classList.remove('editing');
  } else {
    alert('Task cannot be empty.');
  }
}

function deleteTask(event) {
  const li = event.target.closest('li');
  if (confirm('Are you sure you want to delete this task?')) {
    li.parentNode.removeChild(li);
  }
}