<template>
  <a-layout class="layout-demo" :class="theme">
    <!-- 顶部 -->
    <a-layout-header :theme="theme">
      <div class="title">
        <!-- <img src="../../assets/images/elogo.png" alt="" /> -->
        <icon-lark-color :style="{ fontSize: '18px' }" />
        <h1>Vue Arco Admin</h1>
      </div>
      <div class="header-right">
        <!-- 面包屑 -->
        <a-breadcrumb>
          <a-breadcrumb-item v-for="name in currentFullName" :key="name">
            {{ name }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 搜索框 -->
        <a-cascader
          v-model="searchMenuState.menuValue"
          :options="searchMenuState.options"
          :style="{ width: '200px' }"
          :format-label="formatMenu"
          placeholder="输入菜单名搜索"
          allow-search
          path-mode
          @change="menuChange"
        />
        <!-- 用户头像 -->
        <a-dropdown trigger="hover">
          <div class="avatar">
            <img :src="avatar" />
            <h2>Jerry Hu</h2>
          </div>
          <template #content>
            <a-doption @click="loginOut">退出登录</a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <!-- 菜单和内容 -->
    <a-layout class="layout-content">
      <a-menu
        :theme="theme"
        :style="{ width: '220px', height: '100%' }"
        :selected-keys="[currentPath]"
        @menu-item-click="changeMenu"
      >
        <template v-for="item in MENU" :key="item.path">
          <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
            <template #title><component :is="item.icon" />{{ item.menuName }}</template>
            <a-menu-item v-for="childMenu in item.children" :key="childMenu.path">
              {{ childMenu.menuName }}
            </a-menu-item>
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
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <!-- <transition :name="route.meta.transitionName"> -->
          <keep-alive :exclude="['NoCache']">
            <component :is="Component" />
          </keep-alive>
          <!-- </transition> -->
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import { computed, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const MENU = reactive(JSON.parse(sessionStorage.menuRouteList || '[]'))
  const theme = ref('dark')
  const avatar = ref('https://himg.bdimg.com/sys/portraitn/item/public.1.aad81ae4.OK7fJ14XyuTYKcEhMVO-8w')

  /** @菜单搜素 **/
  const searchMenuState = reactive({
    menuValue: '',
    options: JSON.parse(
      JSON.stringify(MENU)
        .replace(/menuName/g, 'label')
        .replace(/path/g, 'value')
    )
  })
  const formatMenu = (options) => {
    const labels = options.map((option) => option.label)
    return labels.pop()
  }
  const menuChange = () => {
    router.push(searchMenuState.menuValue.pop())
    searchMenuState.menuValue = ''
  }

  /** @退出登录 **/
  const loginOut = () => {
    router.push('/login')
  }

  /** @面包屑 **/
  let currentPath = ref(route.path)
  // 切换菜单
  const changeMenu = (e) => {
    if (e === currentPath.value) return
    currentPath.value = e
    router.push(e)
  }
  const currentFullName = computed(() => route.meta.fullName.split(','))
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: nunito_for_arco;
    src: url(https://unpkg.byted-static.com/arco-design/web-react/2.15.0/dist/asset/style/fonts/nunito_for_arco-regular-webfont.woff);
  }
  .layout-demo {
    height: 100vh;
    user-select: none;
    .arco-layout-header {
      height: 50px;
      line-height: 50px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      background: #fff;
      .title {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 15px;
        width: 220px;
        background: var(--color-header-dark-bg);
        box-shadow: -10px 0 5px rgb(31, 31, 31);
        position: relative;
        z-index: 1;
        img {
          width: 150px;
        }
        h1 {
          font-family: nunito_for_arco;
          color: #eee;
          font-size: 20px;
          margin: 0 0 0 8px;
        }
      }
      .header-right {
        flex: 1;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e6ea;
        height: 100%;
        .arco-breadcrumb {
          margin-right: auto;
          padding: 0 10px;
        }
        ::v-deep(.arco-select-view-single) {
          margin: 0 10px 0 auto;
          height: 32px;
          padding-right: 10px;
        }
        .avatar {
          height: 32px;
          border-left: $border;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0 10px;
          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            margin-right: 6px;
          }
          h2 {
            color: #1d2129;
            font-size: 14px;
          }
        }
      }
    }
    .layout-content {
      flex-direction: row;
      background: #f2f3f5;
      .arco-menu {
        padding-top: 10px;
        .arco-icon {
          margin-right: 10px;
          width: 1.2em;
          height: 1.2em;
          position: relative;
          top: 1px;
        }
      }
      .arco-layout-content {
        position: relative;
        overflow: auto;
        margin: 10px;
        height: calc(100vh - 70px);
        border-radius: 2px;
        padding: 10px 10px 0;
        background: #fff;
      }
      ::v-deep(.arco-menu-dark .arco-menu-collapse-button) {
        color: #fff;
      }
    }
    &.dark {
      --color-menu-dark-bg: #272a35;
      --color-header-dark-bg: #272a35;
      --color-menu-dark-hover: rgba(255, 255, 255, 0.15);
      --primary-6: 73, 140, 242;
      .layout-content .arco-menu {
        background: var(--color-menu-dark-bg);
      }
    }
  }
</style>
