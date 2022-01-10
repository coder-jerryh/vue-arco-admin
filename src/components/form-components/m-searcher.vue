<template>
  <div class="m-searcher">
    <label v-if="inMoreSlot">{{ label }}</label>
    <!-- 带选项 -->
    <a-select v-if="hasOptions" v-model="selectValue" :options="newOptions" />
    <a-input-search
      v-model="searchValue"
      :placeholder="placeholder"
      search-button
      allow-clear
      @input="input"
      @press-enter="search"
      @search="search"
      @clear="clear('')"
    />
  </div>
</template>

<script setup>
  import { ref, inject, computed, watch, reactive, onMounted } from 'vue'
  const toolbarVm = inject('toolbarVm')
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: [String, Object],
      default: ''
    },
    // 带选项
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    label: {
      type: String,
      default: '关键字',
      required: true
    }
  })
  // 绑定值
  const selectValue = ref('')
  const searchValue = ref('')
  const newOptions = reactive([])
  // 是否搜索过
  const isSearched = ref(false)
  // 是否有搜素选项
  const hasOptions = computed(() => Object.values(props.options).length)
  // 是否在插槽里
  const inMoreSlot = computed(() => toolbarVm.moreSlots.includes(props.label))
  // 占位文字
  const placeholder = computed(() => `输入${props.label}搜索`)

  watch(
    () => props.options,
    () => {
      // 设置默认选项
      selectValue.value = Object.keys(props.options)[0]
      for (const key in props.options) {
        newOptions.push({ label: props.options[key], value: key })
      }
    },
    {
      immediate: true // 立即执行
    }
  )

  onMounted(() => {
    // 默认值
    searchValue.value = props.modelValue
    const defaultValue = searchValue.value
    // 订阅
    toolbarVm.addField({
      resetField() {
        searchValue.value = defaultValue
        emits('update:modelValue', defaultValue)
      }
    })
  })

  const input = (e) => {
    clear(e)
  }

  const search = () => {
    if (hasOptions.value) {
      const a = reactive({ ...props.modelValue, [selectValue.value]: searchValue.value })
      emits('update:modelValue', a)
      console.log(reactive(a))
    } else {
      emits('update:modelValue', searchValue.value)
    }
    isSearched.value = true
    toolbarVm.change()
  }

  const clear = (e) => {
    // 搜索过且晴空时，需要重新请求接口
    if (isSearched.value && !e) {
      search()
      isSearched.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .m-searcher {
    ::v-deep(.arco-select-view) {
      width: 100px;
      border-radius: 2px 0 0 2px;
    }
    ::v-deep(.arco-input-wrapper) {
      width: 150px;
    }
  }
</style>
