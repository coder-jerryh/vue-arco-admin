<template>
  <a-form ref="arcoFormRef" :model="form" :disabled="disabled" layout="vertical">
    <section v-for="(item, formKey) in formData" :key="formKey" :style="{ width: width(item) }">
      <a-form-item
        v-if="!item.show || item.show(form)"
        :help="item.help"
        :field="formKey"
        :label="item.label"
        :rules="rules(item)"
      >
        <!-- 输入框、文本框 -->
        <component
          :is="inputFormType[item.type]"
          v-if="['input', 'number', 'textarea', 'password'].includes(item.type)"
          v-model="form[formKey]"
          :placeholder="`请输入${item.label}`"
          :max-length="item.maxlength"
          :disabled="item.disabled"
          :show-word-limit="item.type == 'textarea'"
          allow-clear
        >
          <template v-if="item.prepend" #prepend> {{ item.prepend }} </template>
          <template v-if="item.append" #append> {{ item.append }} </template>
        </component>
        <!-- 下拉框、单选框、多选框 -->
        <component
          :is="optionFormType[item.type]"
          v-if="['select', 'radio', 'checkbox'].includes(item.type)"
          v-model="form[formKey]"
          :placeholder="`请输入${item.label}`"
          :multiple="item.multiple"
          :disabled="item.disabled"
          allow-search
          allow-clear
        >
          <component
            :is="optionFormType[`${item.type}Option`]"
            v-for="(opt, val) in item.options"
            :key="val"
            :value="Number(opt[item.valueKey] || opt.value || val)"
          >
            {{ opt[item.labelKey] || opt.label || opt }}
          </component>
        </component>
        <!-- 时间日期选择 -->
        <component
          :is="dateFormType[item.type]"
          v-if="['date', 'date-range', 'time', 'time-range'].includes(item.type)"
          v-model="form[formKey]"
          :type="item.type"
          separator="至"
          :show-time="showTime(item.format)"
          :format="format(item.format)"
          :disabled="item.disabled"
          allow-clear
        />
        <!-- 上传框 -->
        <m-upload v-if="item.type === 'upload'" v-model="form[formKey]" :disabled="item.disabled" />
        <!-- switch开关 -->
        <label v-if="item.type === 'switch'" class="switch">
          <a-switch v-model="form[formKey]" :disabled="item.disabled" />
          <span v-if="item.checkedLabel">{{ form[formKey] ? item.checkedLabel : item.uncheckedLabel }}</span>
        </label>
        <!-- editor -->
        <m-editor v-if="item.type === 'editor'" v-model="form[formKey]" :disabled="item.disabled" />
      </a-form-item>
    </section>
  </a-form>
</template>

<script setup>
  import { reactive, ref, watch, toRefs } from 'vue'
  import mUpload from '../form-components/m-upload.vue'
  import mEditor from '../form-components/m-editor.vue'
  const emits = defineEmits(['update:modelValue'])
  // 输入框类型
  const inputFormType = {
    input: 'a-input',
    number: 'a-input-number',
    textarea: 'a-textarea',
    password: 'a-input-password'
  }

  // 日期表单类型
  const dateFormType = {
    date: 'a-date-picker',
    'date-range': 'a-range-picker',
    time: 'a-time-picker',
    'time-range': 'a-time-picker'
  }

  // 带选项类型
  const optionFormType = {
    select: 'a-select',
    selectOption: 'a-option',
    radio: 'a-radio-group',
    radioOption: 'a-radio',
    checkbox: 'a-checkbox-group',
    checkboxOption: 'a-checkbox'
  }
  // props
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {
        return {}
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  const state = reactive({
    form: {},
    isReset: true
  })
  const { form, isReset } = toRefs(state)

  // 监听数据回显
  if (isReset) {
    watch(
      () => props.modelValue,
      () => {
        state.form = props.modelValue
        state.isReset = false
      },
      {
        immediate: true,
        deep: true
      }
    )
  }
  watch(
    () => state.form,
    () => {
      emits('update:modelValue', state.form)
    },
    {
      deep: true
    }
  )

  // 验证规则
  const rules = (item) => {
    const rules = [{ required: item.required !== false, message: `${item.label}是必填项` }]
    if (item.rules) {
      rules.push(...item.rules)
    }
    return rules
  }

  // 表单项宽度
  const width = (item) => ((item.span || 24) / 24) * 100 + '%'
  // 时间展示
  const showTime = (format) => format && format.includes('hh')
  // 格式化
  const format = (format) => format && format.replace(/(\w*)y(\w*)M(\w*)h/g, '$1Y$2D$3H')

  // 将方法、变量暴露给父组件使用
  const arcoFormRef = ref(null)
  defineExpose({
    // 提交验证
    validate(cb) {
      arcoFormRef.value.validate((error) => {
        if (!error) cb()
      })
    },
    // 重置表单
    resetFields() {
      state.isReset = true
      arcoFormRef.value.resetFields()
      emits('update:modelValue', state.form)
    }
  })
</script>

<style lang="scss" scoped>
  .arco-form {
    flex-wrap: wrap;
    flex-direction: row;
    padding: 2px !important;
    section {
      padding: 0 10px;
      &:empty {
        display: none;
      }
      /** @表单form **/
      ::v-deep(.arco-form-item) {
        .arco-form-item-label-col {
          margin-bottom: 0 !important;
        }
        .arco-form-item-wrapper-col {
          min-height: inherit;
          // 日期时间选择器
          .arco-picker {
            width: 100%;
            &.arco-picker-range {
              input {
                text-align: center;
              }
            }
          }
          // 多选框
          .arco-checkbox-group {
            margin-top: -6px;
            .arco-checkbox {
              margin-top: 6px;
            }
          }
          .switch {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-bottom: 0;
            // 开关
            .arco-switch {
              min-height: 24px;
              & + span {
                margin-left: 8px;
                color: #303133;
              }
              &.arco-switch-checked + span {
                color: rgb(var(--primary-6));
              }
            }
          }
        }
      }
    }
  }
</style>
