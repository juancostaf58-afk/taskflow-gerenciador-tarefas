
/* Formulário de tarefas */
#task-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#task-form input,
#task-form select {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font: inherit;
}

#task-form label {
    font-weight: 600;
}

/* Informações de cada tarefa */
.task-details {
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
}

.task-text {
    overflow-wrap: anywhere;
}

.task-metadata {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.85rem;
}

.priority {
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 600;
}

.priority-low {
    background: #e0f2fe;
    color: #075985;
}

.priority-medium {
    background: #fef3c7;
    color: #92400e;
}

.priority-high {
    background: #fee2e2;
    color: #991b1b;
}

.task-deadline {
    padding: 4px 0;
}

.task-deadline.overdue {
    color: #b91c1c;
    font-weight: 700;
}

/* Organização dos itens */
.task-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.task-item.done .task-text {
    text-decoration: line-through;
    opacity: 0.65;
}

@media (max-width: 480px) {
    .task-item {
        flex-wrap: wrap;
    }

    .task-details {
        flex-basis: calc(100% - 40px);
    }

    .delete-button {
        margin-left: auto;
    }
}
