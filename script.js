
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");

const totalElement = document.querySelector("#total");
const pendingElement = document.querySelector("#pending");
const completedElement = document.querySelector("#completed");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];

try {
    tasks = JSON.parse(
        localStorage.getItem("taskflow-tasks")
    ) || [];
} catch {
    tasks = [];
}

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem(
        "taskflow-tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks() {
    taskList.replaceChildren();

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            `Concluir tarefa: ${task.text}`
        );

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    totalElement.textContent = tasks.length;

    pendingElement.textContent = tasks.filter(
        task => !task.completed
    ).length;

    completedElement.textContent = tasks.filter(
        task => task.completed
    ).length;

    emptyMessage.hidden = filteredTasks.length > 0;

    filterButtons.forEach(button => {
        const active = button.dataset.filter === currentFilter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        id: crypto.randomUUID(),
        text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

renderTasks();
