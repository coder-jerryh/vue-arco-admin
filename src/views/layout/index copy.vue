<template>
  <a-layout class="layout-demo" :class="theme">
    <a-layout class="layout-left">
      <div class="title">
        <img src="../../assets/images/elogo.png" alt="" />
      </div>
      <a-menu
        :theme="theme"
        :style="{ width: '220px', height: '100%' }"
        :selected-keys="[currentPath]"
        @menu-item-click="changeMenu"
      >
        <template v-for="item in MENU" :key="item.path">
          <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
            <template #title><component :is="item.icon" />{{ item.menuName }}</template>
            <template v-for="childMenu in item.children" :key="childMenu.path">
              <a-menu-item>
                {{ childMenu.menuName }}
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path"> <component :is="item.icon" />{{ item.menuName }} </a-menu-item>
        </template>
        <!-- <a-sub-menu key="2">
          <template #title><icon-bulb /> Navigation 3</template>
          <a-menu-item-group title="Menu Group 1">
            <a-menu-item key="2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_1">Menu 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="Menu Group 2">
            <a-menu-item key="2_2">Menu 3</a-menu-item>
            <a-menu-item key="2_3">Menu 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu> -->
      </a-menu>
    </a-layout>
    <a-layout class="layout-right">
      <a-layout-header :theme="theme">
        <h1>E联智校管理系统</h1>
        <a-dropdown trigger="hover">
          <div class="avatar">
            <img src="https://himg.bdimg.com/sys/portraitn/item/public.1.aad81ae4.OK7fJ14XyuTYKcEhMVO-8w" />
            <h2>Jerry Hu</h2>
          </div>
          <template #content>
            <a-doption>退出登录</a-doption>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content><router-view /></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const MENU = reactive(JSON.parse(sessionStorage.menuRouteList || '[]'))
  const route = useRoute()
  const router = useRouter()
  const theme = ref('dark')
  let currentPath = ref(route.path)

  const changeMenu = (e) => {
    if (e === currentPath.value) return
    currentPath.value = e
    router.push(e)
  }
  console.log(currentPath)
</script>

<style lang="scss" scoped>
  .layout-demo {
    flex-direction: row;
    height: 100vh;
    user-select: none;
    .layout-left {
      display: flex;
      flex-direction: column;
      background: var(--color-menu-dark-bg);
      flex: 0;
      .title {
        display: flex;
        align-items: center;
        padding: 0 20px;
        box-shadow: -10px 0 5px rgb(31, 31, 31);
        position: relative;
        z-index: 1;
        height: 54px;
        img {
          width: 160px;
        }
        h1 {
          color: #eee;
          font-size: 22px;
          margin: 0 0 0 8px;
        }
      }
      .arco-menu {
        flex: 1;
      }
    }
    .layout-right {
      background: #f4f6f8;
      ::v-deep(.arco-layout-header) {
        border-bottom: 1px solid #e5e6ea;
        height: 54px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        background: #fff;
        h1 {
          margin: 0;
          font-size: 18px;
          flex: 1;
        }
        .avatar {
          cursor: pointer;
          display: flex;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 6px;
          }
          h2 {
            font-size: 14px;
          }
        }
      }
      .arco-layout-content {
        background: #fff;
        margin: 10px;
        border-radius: 4px;
        padding: 10px;
      }
    }
    .arco-menu {
      .arco-icon {
        margin-right: 10px;
        width: 1.2em;
        height: 1.2em;
        position: relative;
        top: 1px;
      }
    }
    ::v-deep(.arco-menu-dark .arco-menu-collapse-button) {
      color: #fff;
    }
    &.dark {
      --color-menu-dark-bg: #272a35;
      --color-header-dark-bg: #272a35;
      --color-menu-dark-hover: rgba(255, 255, 255, 0.2);
      --primary-6: 113, 151, 248;
      --color-white: #7197f8;
    }
  }
</style>
