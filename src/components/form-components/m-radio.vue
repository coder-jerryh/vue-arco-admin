<template>
  <div class="m-radio">
    <label v-if="inMoreSlot">{{ label }}</label>
    <a-radio-group v-model="value" @change="change">
      <a-radio v-for="item in newOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script setup>
  import { ref, inject, computed, onMounted } from 'vue'
  const toolbarVm = inject('toolbarVm')
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    // 绑定值
    modelValue: {
      type: [String, Number],
      default: ''
    },
    // 选项
    options: {
      type: Object,
      default() {
        return {}
      }
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
    // 名称
    label: {
      type: String,
      default: '',
      required: true
    }
  })
  // 绑定值
  const value = ref('')

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

  onMounted(() => {
    // 默认值
    value.value = verifyType(props.modelValue)
    const defaultValue = value.value
    // 订阅
    toolbarVm.addField({
      resetField() {
        value.value = defaultValue
        emits('update:modelValue', defaultValue)
      }
    })
  })

  const change = () => {
    emits('update:modelValue', value.value)
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

<style lang="scss" scoped></style>
