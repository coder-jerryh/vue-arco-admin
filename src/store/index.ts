import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  // 控制页面刷新
  refreshFlag: Boolean
  // 完整的学校信息
  fullSchoolInfo: Object
  // 学校信息
  schoolInfo: Object
  // 控制树折叠
  treeSwitch: Boolean
  // 请求数
  cancelTokenArr: any[]
  // 最近使用菜单
  cacheRecentlyMenus: any[]
  page: Object
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  // state() {
  //   return {
  //     count: 0
  //   }
  // },
  // mutations: {
  //   increment(state) {
  //     state.count++
  //   }
  // }
  state() {
    return {
      // 控制页面刷新
      refreshFlag: false,
      // 完整的学校信息
      fullSchoolInfo: {},
      // 学校信息
      schoolInfo: {
        attributeStr: undefined,
        schoolNum: '',
        corpId: '',
        periodId: ''
      },
      // 控制树折叠
      treeSwitch: true,
      // 请求数
      cancelTokenArr: [],
      // 最近使用菜单
      cacheRecentlyMenus: [],
      page: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40]
      }
    }
  },
  getters: {
    getSchoolInfo: (state) => state.schoolInfo
  },
  mutations: {
    // 树控件折叠
    clickTreeSwicth(state, treeSwitch) {
      if (typeof treeSwitch !== 'boolean') {
        treeSwitch = !state.treeSwitch
      }
      state.treeSwitch = treeSwitch
    },
    // 存学校信息
    saveSchoolInfo(state, info) {
      // 学习树类型不一样时，不需要调用refreshFlag
      // attribute为0表示全部学校
      if (info.id || info.attributeStr === '全部学校') {
        state.refreshFlag = !state.refreshFlag
      }
      state.schoolInfo = { ...info }
    },
    // 存所有学校信息
    saveFullSchoolInfo(state, fullInfo) {
      if (fullInfo === 'clear') {
        state.fullSchoolInfo = {}
      } else {
        state.fullSchoolInfo = { ...state.fullSchoolInfo, ...fullInfo }
      }
    },
    // 触发刷新
    changeRefreshFlag(state) {
      state.refreshFlag = !state.refreshFlag
    },
    pushToken(state, payload) {
      state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken({ cancelTokenArr }) {
      cancelTokenArr.forEach((item) => {
        item()
      })
      cancelTokenArr = []
    },
    saveMenu(state, path) {
      let cacheRecentlyMenus = JSON.parse(localStorage.cacheRecentlyMenus || '[]')
      if (path && path !== '/homePage') {
        cacheRecentlyMenus.unshift(path)
      }
      cacheRecentlyMenus = [...new Set(cacheRecentlyMenus)].slice(0, 8)
      state.cacheRecentlyMenus = cacheRecentlyMenus
      localStorage.cacheRecentlyMenus = JSON.stringify(cacheRecentlyMenus)
    }
  },
  actions: {}
})
