<template>
  <div class="m-date-selecter">
    <label v-if="inMoreSlot">{{ label }}</label>
    <a-range-picker
      v-if="type == 'range'"
      v-model="state.rangeValue"
      separator="至"
      :format="valueFormat"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      :show-time="showTime"
      @change="change"
    />
    <a-date-picker
      v-else
      v-model="state.dateValue"
      :format="valueFormat"
      :placeholder="placeholder"
      :show-time="showTime"
      :allow-clear="allowClear"
      @change="change"
    />
  </div>
</template>

<script setup>
  import { inject, onMounted, computed, reactive } from 'vue'
  const toolbarVm = inject('toolbarVm')
  const emits = defineEmits(['update:modelValue', 'update:start', 'update:end'])
  const props = defineProps({
    type: {
      type: String,
      default: 'date'
    },
    // 绑定值
    modelValue: {
      type: [String, Number],
      default: ''
    },
    // 开始绑定值
    start: {
      type: [String, Number],
      default: ''
    },
    // 结束绑定值
    end: {
      type: [String, Number],
      default: ''
    },
    // 名称
    label: {
      type: String,
      default: '日期',
      required: true
    },
    // 时间格式
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // 时间范围通过指定符号分隔
    splitKey: {
      type: String,
      default: ''
    },
    // 是否允许清空
    allowClear: {
      type: Boolean,
      default: true
    }
  })
  // 绑定值
  const state = reactive({
    dateValue: '',
    rangeValue: []
  })
  // 默认值
  const defaultValue = reactive({
    dateValue: '',
    rangeValue: []
  })

  const showTime = computed(() => props.format.includes('HH'))
  const valueFormat = computed(() => {
    return props.format.replace(/y/g, 'Y').replace(/d/g, 'D')
  })
  const placeholder = computed(() => {
    if (props.type === 'range') {
      return [`选择开始${props.label}`, `选择结束${props.label}`]
    } else {
      return `选择${props.label}`
    }
  })
  const inMoreSlot = computed(() => toolbarVm.moreSlots.includes(props.label))

  // 初始化
  onMounted(() => {
    // 默认值
    const { type, modelValue, splitKey, start, end } = props
    if (type === 'range') {
      if (splitKey) {
        state.rangeValue = [...modelValue.split(splitKey)]
      } else {
        state.rangeValue = [start, end]
      }
    } else {
      state.dateValue = modelValue
    }

    // 设置默认值
    defaultValue.dateValue = state.value
    defaultValue.rangeValue = state.rangeValue

    // 订阅
    toolbarVm.addField({
      resetField() {
        const { dateValue, rangeValue } = defaultValue
        if (props.type === 'range') {
          if (props.splitKey) {
            state.rangeValue = rangeValue
            emits('update:modelValue', rangeValue.join(splitKey))
          } else {
            emits('update:start', rangeValue[0])
            emits('update:end', rangeValue[1])
          }
          state.rangeValue = rangeValue
        } else {
          state.dateValue = dateValue
          emits('update:modelValue', dateValue)
        }
      }
    })
  })

  // 改变
  const change = (e) => {
    // 时间范围选择
    if (props.type === 'range') {
      if (props.splitKey) {
        e = e ? e.join(props.splitKey) : ''
        emits('update:modelValue', e)
      } else {
        emits('update:start', e ? e[0] : '')
        emits('update:end', e ? e[1] : '')
      }
    } else {
      emits('update:modelValue', e)
    }
    toolbarVm.change()
  }
</script>

<style lang="scss" scoped>
  .m-date-selecter {
    ::v-deep(.arco-picker-input) {
      // 范围选择才需要居中
      input:not(.arco-picker-start-time) {
        text-align: center;
      }
    }
  }
</style>
