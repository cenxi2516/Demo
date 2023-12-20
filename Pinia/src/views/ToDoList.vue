<template>
<div class="container">
    <div class="input-container">
        <p class="numInput">自己仓库的Getter数据：{{ doubleCount }}</p>
        <button class="btn" @click="increment">+1</button>
    </div>
    <div class="input-container">
        <p class="numInput">其他仓库的Getter数据：{{ otherCount }}</p>
    </div>
    <div class="input-container">
        <p class="numInput">已经完成：{{ completedCount }}项</p>
    </div>
    <div class="input-container">
        <button class="btn" @click="handleReset">重置</button>
    </div>
    <!-- 添加新的待办事项 -->
    <div class="input-container">
        <input type="text" class="numInput" v-model.trim="newItemText" />
        <button class="btn" @click="handleAddTodoItem">添加</button>
    </div>
    <!-- 待办事项列表 -->
    <div class="list">
        <div class="item" v-for="(item, i) in todoLists.items" :key="i">
            <!-- 内容 -->
            <div :class="{del: item.isCompleted}" @click="handleCompletedTodoItem(i)">
                {{ item.text }}
            </div>
            <!-- 删除 -->
            <div class="close" @click="handleRemoveTodoItem(i)">X</div>
        </div>
    </div>
</div>
</template>


<script setup>

import { useTodoListStore } from '@/store/useTodoListStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const todoListStore = useTodoListStore();
const {
    todoLists,
    completedCount,
    doubleCount,
    otherCount,
} = storeToRefs(todoListStore);
const {
    increment,
    addTodoItem,
    removeTodoItem,
    completedTodoItem,
} = todoListStore;

const newItemText = ref('');

const handleAddTodoItem = () => {
    if(!newItemText.value) return;

    addTodoItem?.(newItemText.value);
    newItemText.value = '';
};

const handleRemoveTodoItem = (index) => removeTodoItem?.(index);

const handleCompletedTodoItem = (index) => completedTodoItem?.(index);

const handleReset = () => {
    todoListStore.$reset();
}

</script>

<style scoped>
.container {
    width: 300px;
    margin: 20px auto;
}

.input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.numInput {
    width: 75%;
    height: 30px;
}

.btn {
    width: 20%;
    cursor: pointer;
}

.list {
    margin-top: 20px;
}

.item {
    /* outline: 1px solid; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    font-size: 20px;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.close {
    width: 20px;
    height: 20px;
    /* border: 1px solid; */
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    background-color: rgb(243, 83, 83);
    color: #fff;
    font-weight: 400;
    cursor: pointer;
}

.del {
    text-decoration: line-through;
}
</style>