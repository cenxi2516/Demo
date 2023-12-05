<script>
import {ref, watchEffect} from 'vue';
import * as todoAPI from './util/storageTodo';
import useAddTodo from './composition/useAddTodo';
import useFilterTodoList from '@/composition/useFilterTodoList'
import useEditTodo from '@/composition/useEditTodo'
import useDelTodo from '@/composition/useDelTodo'

export default {
    setup() {
        const todoListRef = ref(todoAPI.fetch());

        watchEffect(() => {
            // todoListRef.value变化，自动保存
            todoAPI.save(todoListRef.value);
        });

        return {
            todoListRef,
            ...useAddTodo(todoListRef),
            ...useFilterTodoList(todoListRef),
            ...useEditTodo(todoListRef),
            ...useDelTodo(todoListRef)
        };
    }
}
</script>

<template>
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" v-model.trim="newTodoRef" @keyup.enter="addTodo" autofocus autocomplete="off"
                   placeholder="What needs to be done?" />
        </header>
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allSelectedRef"
                   @input="allSelect($event.target.checked)" />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <li class="todo" :class="{
                    completed: todo.completed,
                    editing: todo === currentEditTodoRef
                }" v-for="todo in currentTodoListRef" :key="todo.id">
                    <div class="view" @dblclick="editTodo(todo)">
                        <input class="toggle" type="checkbox" v-model="todo.completed" />
                        <label>{{ todo.title }}</label>
                        <button class="destroy" @click="deleteTodo(todo)"></button>
                    </div>
                    <input class="edit" type="text" v-model="todo.title" @keyup.enter="doneTodoEdit(todo)"
                           @keyup.esc="restoreTodo(todo)" />
                </li>
            </ul>
        </section>
        <footer class="footer" v-if="todoListRef.length > 0">
            <span class="todo-count">
                <strong>{{ remianTodoRef.length }}</strong>
                <span>item{{ remianTodoRef.length === 1 ? '' : 's' }} left</span>
            </span>
            <ul class="filters">
                <li><a href="#/all" :class="{selected: hashRef === 'all'}">All</a></li>
                <li><a href="#/active" :class="{selected: hashRef === 'active'}">Active</a></li>
                <li><a href="#/completed" :class="{selected: hashRef === 'completed'}">Completed</a></li>
            </ul>
            <button class="clear-completed" v-show="completedTodoRef.length"
                    @click="deleteCompletedTodo(completedTodoRef)">
                Clear completed
            </button>
        </footer>
    </section>
</template>
