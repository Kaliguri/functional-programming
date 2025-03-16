let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const showAllBtn = document.getElementById('showAllBtn');
const showCompletedBtn = document.getElementById('showCompletedBtn');
const showPendingBtn = document.getElementById('showPendingBtn');
const taskList = document.getElementById('taskList');

function createTask(taskText) {
    return [...tasks, { text: taskText, completed: false }];
}

function removeTask(index) {
    return tasks.filter((_, i) => i !== index);
}

function switchTaskStatus(index) {
    return tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
}

function getFilteredTasks(status) {
    if (status === 'completed') {
        return tasks.filter(task => task.completed);
    } else if (status === 'pending') {
        return tasks.filter(task => !task.completed);
    }
    return tasks;
}

function displayTasks(tasksToDisplay) {
    taskList.innerHTML = '';
    tasksToDisplay.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = 'Завершено';
        completeButton.onclick = () => toggleCompletion(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Удалить задачу';
        deleteButton.onclick = () => deleteTask(index);

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);
    });
}

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks = createTask(taskText);
        taskInput.value = '';
        displayTasks(tasks);
    }
});

const toggleCompletion = (index) => {
    tasks = switchTaskStatus(index);
    displayTasks(tasks);
};

const deleteTask = (index) => {
    tasks = removeTask(index);
    displayTasks(tasks);
};

showAllBtn.addEventListener('click', () => {
    displayTasks(tasks);
});

showCompletedBtn.addEventListener('click', () => {
    displayTasks(getFilteredTasks('completed'));
});

showPendingBtn.addEventListener('click', () => {
    displayTasks(getFilteredTasks('pending'));
});

displayTasks(tasks);
