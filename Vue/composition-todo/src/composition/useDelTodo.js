import {remove} from '@/util/storageTodo'

const useDelTodo = (todoListRef) => {

    const deleteTodo = (todo) => remove(todoListRef.value, todo);

    const deleteCompletedTodo = (completedTodos) => {
        for (const todo of completedTodos) {
            deleteTodo(todo)
        }
    };

    return {
        deleteTodo,
        deleteCompletedTodo
    };
};

export default useDelTodo;