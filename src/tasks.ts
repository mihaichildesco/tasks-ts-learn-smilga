// Select form, input field, and task list from the DOM
const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

// Define Task type with description and completion status
type Task = {
  description: string;
  isCompleted: boolean;
};

// Load tasks from localStorage (or start with an empty array if none are found)
const tasks: Task[] = loadTasks();

// Render all tasks currently loaded
tasks.forEach(renderTask);

// Function to load tasks from localStorage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");

  // If tasks exist in storage, parse and return them, otherwise return an empty array
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Add event listener to handle form submission
taskForm?.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior (page reload)

  // Get the task description from the input field
  const taskDescription = formInput?.value;

  // If the input is not empty, proceed with adding the task
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false, // By default, a new task is not completed
    };

    addTask(task); // Add the new task to the task array
    renderTask(task); // Render the task to the UI
    updateStorage(); // Save the updated task list to localStorage

    formInput.value = ""; // Clear the input field after submission
    return;
  }

  // If the input is empty, show an alert
  alert("Please enter a task");
});

// Function to add a task to the task array
function addTask(task: Task): void {
  tasks.push(task); // Add the new task to the array
  console.log(tasks); // Log the updated task array for debugging
}

// Function to render a task in the task list
function renderTask(task: Task): void {
  // Create a new list item (li) to represent the task
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description; // Set the task's description as the list item text

  // Create a checkbox to represent whether the task is completed
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted; // Set checkbox state based on task completion status

  // Add an event listener to toggle task completion status when checkbox is clicked
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted; // Toggle the task's completion status
    updateStorage(); // Save the updated tasks array to localStorage
  });

  // Append the checkbox to the task element
  taskElement.appendChild(taskCheckbox);

  // Add the task element to the list in the UI
  taskListElement?.appendChild(taskElement);
}

// Function to update localStorage with the current task array
function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert the task array to JSON and save it
}
