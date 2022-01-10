<template>
  <div class="m-toolbar">
    <!-- 外层 -->
    <slot />
    <!-- 内层 -->
    <a-popover v-if="moreSlots.length" class="toolbar-popover" position="br" trigger="click">
      <a-button class="filter-btn" :class="{ isFiltered }" icon="icon-filter" :outline="!isFiltered"> 筛选 </a-button>
      <template #content>
        <h1 class="title">更多筛选</h1>
        <slot name="more" />
        <a-button class="reset" icon="icon-refresh" :icon-spin="iconSpin" outline @click="reset">重置</a-button>
      </template>
    </a-popover>
    <a-button v-else class="outReset" outline icon="icon-refresh" :icon-spin="iconSpin" @click="reset"> 重置 </a-button>
  </div>
</template>

<script setup>
  import { ref, provide, useSlots, reactive, watch } from 'vue'
  const emits = defineEmits(['change', 'update:modelValue'])

  // 监听是否筛选
  const slots = useSlots()
  const moreSlots = reactive(slots.more ? slots.more().map((item) => item.props.label) : [])
  const isFiltered = ref(false)
  watch(
    () => slots.more && slots.more(),
    (val) => {
      isFiltered.value = val.some((item) => {
        const modelValue = item.props.modelValue
        return typeof modelValue !== 'undefined' && modelValue !== ''
      })
    }
  )

  // 声明provide
  const fields = []
  provide('toolbarVm', {
    moreSlots,
    change() {
      emits('change')
    },
    addField(itemInfo) {
      fields.push(itemInfo)
    }
  })

  // 重置
  const iconSpin = ref(false)
  const reset = () => {
    iconSpin.value = true
    fields.forEach((field) => field.resetField())
    emits('change')
    const timer = setTimeout(() => {
      iconSpin.value = false
      clearTimeout(timer)
    }, 1000)
  }
</script>

<style lang="scss">
  label {
    font-size: 14px;
    color: #444;
    margin-bottom: 6px;
    display: inline-block;
  }
  .m-toolbar {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .rightAuto {
      margin-right: auto;
    }
    .leftAuto {
      margin-left: auto;
    }
    > * + * {
      margin-left: 8px;
    }
    > .arco-btn {
      padding: 0 10px;
    }
  }
  .filter-btn {
    justify-content: center;
    position: relative;
    &.isFiltered {
      &::after {
        content: '';
        position: absolute;
        right: 1px;
        top: 1px;
        transform: translate(50%, -50%);
        transform-origin: 100% 0%;
        width: 8px;
        height: 8px;
        background-color: rgb(var(--danger-6));
        border-radius: var(--border-radius-circle);
        box-shadow: 0 0 0 1px var(--color-bg-2);
      }
    }
  }
  .toolbar-popover {
    .arco-trigger-content {
      padding: 12px;
      width: 250px;
      max-height: 80vh;
      overflow: auto;
      .arco-popover-content {
        .title {
          color: #1d2129;
          font-size: 15px;
          font-weight: bold;
          border-bottom: $border;
          padding-bottom: 12px;
          margin-top: 0;
          line-height: 1;
        }
        > div {
          & + * {
            margin-top: 10px;
          }
          > div,
          > span {
            width: 100% !important;
          }
        }
        .reset {
          width: 100%;
          margin-top: 20px;
          position: relative;
          &::before {
            top: -10px;
            position: absolute;
            border-top: $border;
            content: '';
            width: 100%;
          }
        }
      }
    }
  }
</style>
