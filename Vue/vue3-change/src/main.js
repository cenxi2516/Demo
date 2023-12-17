import { createApp } from 'vue'
import App from './App.vue'
import './util/reactivity'

const app = createApp(App);
app.mount('#app');
