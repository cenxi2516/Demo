const TODO_KEY = 'todo';

export const fetch = () => {
    const data = localStorage.getItem(TODO_KEY);

    return data ? JSON.parse(data) : [];
};


export const save = (todoLists) => localStorage.setItem(TODO_KEY, JSON.stringify(todoLists));


export const filter = (todoLists, status = 'all') => {
    switch (status) {
        case 'active':
            return todoLists.filter(({completed}) => !completed);
        case 'completed':
            return todoLists.filter(({completed}) => completed);
        default:
            return todoLists;
    }
};

export const remove = (todoLists, todo) => {
    const index = todoLists.indexOf(todo);
    if (index <= -1) return;

    todoLists.splice(index, 1);
};
