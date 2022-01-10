<template>
  <section class="login">
    <h1>Vue3 Arco Admin</h1>
    <form>
      <a-input v-model="state.form.username" size="large" placeholder="请输入账号">
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
      <a-input v-model="state.form.password" size="large" placeholder="请输入密码" type="password">
        <template #prefix>
          <icon-lock />
        </template>
      </a-input>
      <a-button class="submit" type="primary" size="large" :loading="state.loading" @click="submit"> 登录 </a-button>
    </form>
  </section>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { MENU } from '../const/menu'
  import { setupRoute } from '../router/index'
  import { loginApi } from '../api/index'
  const router = useRouter()
  const state = reactive({
    form: {
      imageCode: '123'
    }
  })

  const submit = () => {
    if (!state.form.username) {
      return Toast('warning', '请输入账号')
    }
    if (!state.form.password) {
      return Toast('warning', '请输入密码')
    }
    state.loading = true
    loginApi(state.form)
      .then(() => {
        sessionStorage.menuRouteList = JSON.stringify(MENU)
        setupRoute(MENU)
        router.replace('/homePage')
      })
      .catch(() => {
        state.loading = false
      })
  }
</script>

<style lang="scss" scoped>
  .login {
    background-color: #fff;
    background-image: url('../src/assets/images/bg.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
    width: 100%;
    height: 100%;
    @extend .xy-center;
    h1 {
      font-size: 36px;
      font-weight: bold;
      margin-top: -200px;
      color: #28313b;
      margin-bottom: 50px;
    }
    form {
      width: 400px;
      .arco-input-wrapper {
        height: 42px;
        margin-bottom: 20px;
      }
      .submit {
        height: 42px !important;
        margin-top: 10px;
        width: 100%;
        height: 40px;
      }
    }
  }
</style>
