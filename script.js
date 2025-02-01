document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if the input is not empty
        if (taskText === '') {
            alert('Please enter a task!'); // Prompt the user to enter a task
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Use classList.add to add the class

        // Add an event listener to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener to the task input for the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add each task to the DOM
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' prevents saving to Local Storage again
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add an event listener to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(li); // Remove the task from the DOM
            updateLocalStorage(); // Update Local Storage
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if 'save' is true
        if (save) {
            updateLocalStorage();
        }

        // Clear the task input field
        taskInput.value = '';
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        // Get all tasks from the DOM
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent);
        });

        // Save tasks to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText); // Add the task and save to Local Storage
        } else {
            alert('Please enter a task!');
        }
    });

    // Add event listener to the task input for the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText); // Add the task and save to Local Storage
            } else {
                alert('Please enter a task!');
            }
        }
    });
});