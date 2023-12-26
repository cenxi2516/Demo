import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import 'nprogress/nprogress.css'
import Icon from './components/Icon/Icon.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import all icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

const app = createApp(App)

app.use(router);
app.component('view-icon', Icon);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
