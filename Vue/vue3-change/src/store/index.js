import { createStore } from 'vuex';
import userLogin from '@/store/modules/userLogin'


const store = createStore({
  modules: {
    userLogin
  }
});

store.dispatch('userLogin/whoAmI').then(r => r);

export default store;