import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, readonly } from 'vue'
import { useCounterStore } from '@/store/useCounterStore.js'

export const TodoList_Key = 'todoList';
export const useTodoListStore = defineStore(TodoList_Key, () => {
    const todoLists = reactive({
        items: [
            {
                text: '学习 Pinia',
                isCompleted: true,
            },
            {
                text: '打羽毛球',
                isCompleted: false,
            },
            {
                text: '玩游戏',
                isCompleted: true,
            },
        ],
        counter: 100,
    });
    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);

    const addTodoItem = (text) => {
        todoLists.items.push({
            text,
            isCompleted: false,
        })
    }

    const removeTodoItem = (index) => {
        todoLists.items.splice(index, 1)
    }

    const completedTodoItem = (index) => {
        const todoItem = todoLists.items[index];
        todoItem.isCompleted = !todoItem.isCompleted;
    };

    const completedCount = computed(() => todoLists.items.filter(({ isCompleted }) => isCompleted).length);

    const doubleCount = computed(() => todoLists.counter * 2);
    const increment = () => todoLists.counter++;
    const otherCount = computed(() => todoLists.counter + count.value);

    return {
        todoLists: readonly(todoLists),
        completedCount,
        doubleCount,
        otherCount,
        increment,
        addTodoItem,
        removeTodoItem,
        completedTodoItem,
    }
}, {
    a: 'bbbb',
});