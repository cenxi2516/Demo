<template>
  <form @submit.prevent="handleLogin">
    <div class="form-item">
      <label>账号：</label>
      <input type="text" v-model="loginId" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label></label>
      <button :disabled="loading">{{ loading ? 'loading...' : '登录' }}</button>
    </div>
  </form>
</template>
<script>

import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/provide/userLogin'

export default {
    setup() {
        const loginId = ref('');
        const loginPwd = ref('');
        const {
            state,
            login,
        } = useStore();
        const { loading } = toRefs(state);

        const router = useRouter();

        const handleLogin = async () => {
            const user = await login(loginId.value, loginPwd.value)

            if(user) {
                await router.push({
                    name: 'home',
                })
            } else {
                alert('账号或密码错误');
            }
        }


        return {
            loginId,
            loginPwd,
            loading,
            handleLogin,
        };
    },
};
</script>
<style scoped>
.form-item {
    margin: 1em auto;
    width: 300px;
    display: flex;
    align-items: center;
}

.form-item input {
    height: 26px;
    font-size: 14px;
    flex: 1 1 auto;
}

.form-item label {
    width: 70px;
}

.form-item button {
    flex: 1 1 auto;
    background: #50936c;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    height: 35px;
    font-size: 16px;
}
</style>
