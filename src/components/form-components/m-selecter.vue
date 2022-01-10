<template>
  <div class="m-selecter">
    <label v-if="inMoreSlot">{{ label }}</label>
    <a-select
      v-model="selectValue"
      :multiple="multiple"
      :max-tag-count="2"
      :placeholder="placeholder"
      :options="newOptions"
      :allow-clear="allowClear"
      @change="change"
    />
  </div>
</template>

<script setup>
  import { ref, inject, computed, onMounted } from 'vue'
  const toolbarVm = inject('toolbarVm')
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    // 绑定值
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    // 选项
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    // 名称
    label: {
      type: String,
      default: '',
      required: true
    },
    // label标识
    labelKey: {
      type: String,
      default: 'label'
    },
    // value标识
    valueKey: {
      type: String,
      default: 'value'
    },
    // 多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否允许清空
    allowClear: {
      type: Boolean,
      default: true
    }
  })
  // 绑定值
  const selectValue = ref('')

  const newOptions = computed(() => {
    const { options, labelKey, valueKey } = props
    let arr = []
    // 数组
    if (Array.isArray(options)) {
      arr = options.map((item) => {
        return {
          label: item[labelKey],
          value: verifyType(item[valueKey])
        }
      })
    } else {
      // 对象
      for (const key in options) {
        arr.push({
          label: options[key],
          value: verifyType(key)
        })
      }
    }
    return arr
  })

  const inMoreSlot = computed(() => toolbarVm.moreSlots.includes(props.label))

  const placeholder = computed(() => `选择${props.label}`)

  onMounted(() => {
    if (props.multiple) {
      selectValue.value = props.modelValue ? props.modelValue.split(',') : []
    } else {
      selectValue.value = verifyType(props.modelValue)
    }
    // 默认值
    const defaultValue = selectValue.value
    // 订阅
    toolbarVm.addField({
      resetField() {
        selectValue.value = defaultValue
        emits('update:modelValue', defaultValue)
      }
    })
  })

  const change = () => {
    emits('update:modelValue', selectValue.value)
    toolbarVm.change()
  }

  // 验证是否是数字，数字需转换成字符串
  const verifyType = (data) => {
    if (typeof data === 'number') {
      return String(data)
    } else {
      return data
    }
  }
</script>

<style lang="scss" scoped>
  .m-selecter {
    // 单选
    ::v-deep(.arco-select-view) {
      width: 160px;
    }
    // 多选
    ::v-deep(.arco-input-tag) {
      width: 290px;
    }
  }
</style>
