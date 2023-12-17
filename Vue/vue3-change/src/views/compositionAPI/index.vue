<template>
    <h1>2019 GDP Top 5</h1>
    <div class="container">
        <!-- bar1 -->
        <Bar1 :gdp="gdp"></Bar1>
        <!-- bar2 -->
        <Bar2 :gdp="gdp"></Bar2>
    </div>
    <div class="controls">
        <div class="item" v-for="item in gdp" :key="item.country">
            <label>{{ item.country }}</label>
            <input type="number" step="0.001" min="0" v-model="item.value" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Bar1 from './Bar1.vue';
import Bar2 from './Bar2.vue';

export default {
    components: {
        Bar1,
        Bar2
    },
    setup() {
        const gdpRef = ref([]);
        const fetchGDP = async () => {
            const response = await fetch('src/api/gdp.json');

            gdpRef.value = await response.json();
        };

        fetchGDP();

        return {
            gdp: gdpRef
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.controls {
    margin: 1em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.item {
    margin: 1em;
    label {
        margin: 0 1em;
    }

    input {
        height: 26px;
        font-size: 14px;
    }
}

h1 {
    text-align: center;
}

</style>