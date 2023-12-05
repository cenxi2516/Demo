import { ref } from "vue";
import generateId from '@/util/generateId'

const useAddTodo = (todoListRef) => {
    const newTodoRef = ref('');

    const addTodo = () => {
        if(!newTodoRef.value) return;

        todoListRef.value.push({
            id: generateId(),
            title: newTodoRef.value,
            completed: false
        });

        newTodoRef.value = '';
    };

    return {
        newTodoRef,
        addTodo
    };
};

export default useAddTodo;