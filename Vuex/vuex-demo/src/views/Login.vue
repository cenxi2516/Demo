<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-item">
            <label>账号：</label>
            <input type="text" v-model="formData.loginId" />
        </div>
        <div class="form-item">
            <label>密码：</label>
            <input type="password" autocomplete="off" v-model="formData.loginPwd" />
        </div>
        <div class="form-item">
            <label></label>
            <button :disabled="loading">
                {{ loading ? 'loading...' : '登录' }}
            </button>
        </div>
    </form>
</template>
<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
            formData: {
                loginId: '',
                loginPwd: '',
            },
        };
    },
    computed: {
        ...mapState('loginUser', {
            loading: state => state.isLoading
        })
    },
    methods: {
        async handleSubmit() {
            if(Object.entries(this.formData).some(([,value]) => !value)) {
                alert('账号或密码不能为空');
                return;
            }

            const resp = await this.$store.dispatch('loginUser/login', this.formData);
            if(resp) {
                const targetPath = this.$route.query.target;
                console.log(targetPath);
                this.formData = Object.fromEntries(Object.entries(this.formData).map(([key]) => [key, '']));
                if (targetPath) {
                    await this.$router.push(targetPath);
                } else {
                    await this.$router.push({name: 'user'});
                }
            } else {
                alert('账号或密码错误，请重新登录!');
            }
        },
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
