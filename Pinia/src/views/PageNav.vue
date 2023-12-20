<template>
    <div class="linkContainer">
        <router-link :to="{name: 'counter'}" exact-active-class="active" exact>计数器</router-link>
        <router-link :to="{name: 'todoList'}" exact-active-class="active" exact>待办事项</router-link>
    </div>
</template>

<script>
export default {
    name: 'PageNav',
}
</script>

<style scoped>
.linkContainer {
    text-align: center;
}

a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
    margin: 0 40px;
}

a:hover {
    color: #535bf2;
}

a.active {
    color: #f40;
}
</style>