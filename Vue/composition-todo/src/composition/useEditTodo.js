import {ref, watchEffect} from 'vue'
import {remove} from '@/util/storageTodo'

const useEditTodo = (todoListRef) => {
    const currentEditTodoRef = ref(null);
    const allSelectedRef = ref(false);
    let originTodoTitle = '';

    watchEffect(() => {
        if (!todoListRef.value.length) return;

       allSelectedRef.value = todoListRef.value.every(({completed}) => completed);
    });

    const allSelect = (selected) => {
        for (const todo of todoListRef.value) {
            todo.completed = selected;
        }
    };

    const editTodo = (todo) => {
        currentEditTodoRef.value = todo;
        originTodoTitle = todo.title;
    };

    const doneTodoEdit = (todo) => {
        if (!currentEditTodoRef.value) return;
        currentEditTodoRef.value = null;

        if(todo.title) return;

        remove(todoListRef.value, todo);
    };

    const restoreTodo = (todo) => {
        todo.title = originTodoTitle;
        doneTodoEdit();
    };

    return {
        currentEditTodoRef,
        allSelectedRef,
        editTodo,
        doneTodoEdit,
        restoreTodo,
        allSelect
    }
};

export default useEditTodo;