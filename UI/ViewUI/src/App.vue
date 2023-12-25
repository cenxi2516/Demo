<template>
    <h1 class="title">ViewUI组件展示</h1>
    <nav class="nav">
        <router-link active-class="active" :to="{ name: 'home' }">Icon</router-link>
        <router-link active-class="active" :to="{ name: 'button' }">Button</router-link>
        <router-link active-class="active" :to="{ name: 'card' }">Card</router-link>
        <router-link active-class="active" :to="{ name: 'dialog' }">Dialog</router-link>
        <router-link active-class="active" :to="{ name: 'pager' }">Pager</router-link>
        <router-link active-class="active" :to="{ name: 'collapse' }">Collapse</router-link>
        <router-link active-class="active" :to="{ name: 'tooltip' }">Tooltip</router-link>
        <router-link active-class="active" :to="{ name: 'dropdown' }">Dropdown</router-link>
    </nav>
    <div class="display-area">
        <router-view></router-view>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
h1.title {
    text-align: center;
    font-weight: 200;
}

.nav {
    display: flex;
    height: 50px;
    justify-content: space-evenly;
    align-items: center;
}

.display-area {
    margin-top: 2em;
}

.active {
    border-bottom: 3px solid hsla(160, 100%, 37%, 1);
}
</style>
