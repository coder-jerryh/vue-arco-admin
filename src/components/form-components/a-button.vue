<template>
  <m-button class="a-button" :status="status" :type="btnType" :loading="loading" :disabled="disabled" :shape="shape">
    <!-- 前图标 -->
    <component :is="icon" v-if="icon" :spin="iconSpin" />
    <!-- 文字 -->
    <span><slot /></span>
    <!-- 后图标 -->
    <component :is="appendIcon" v-if="appendIcon" />
  </m-button>
</template>

<script setup>
  import { Button as mButton } from '@arco-design/web-vue' // arcoUI
  import { computed, watch, ref } from 'vue'
  const props = defineProps({
    icon: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    // 按钮类型
    type: {
      type: String,
      default: 'primary'
      // primary|warning|success|danger|info
    },
    color: {
      type: String,
      default: 'primary'
      // primary|warning|success|danger|info
    },
    outline: Boolean,
    loading: Boolean,
    disabled: Boolean,
    // 形状
    round: Boolean,
    circle: Boolean,
    iconSpin: Boolean
  })

  // 形状
  const shape = computed(() => {
    if (props.round) {
      return 'round'
    } else if (props.circle) {
      return 'circle'
    } else {
      return 'square'
    }
  })

  const btnType = ref('primary')
  const status = ref('normal')
  watch(
    () => {
      return {
        type: props.type,
        outline: props.outline,
        color: props.color
      }
    },
    () => {
      btnType.value = props.outline ? 'outline' : 'primary'
      status.value = props.type
      switch (props.type) {
        case 'text':
          btnType.value = 'text'
          status.value = props.color
          return
        case 'primary':
          status.value = 'normal'
          return
        case 'info':
          btnType.value = 'secondary'
          status.value = 'normal'
      }
    },
    {
      immediate: true,
      deep: true
    }
  )
</script>

<style lang="scss" scoped>
  .a-button {
    display: flex;
    align-items: center;
    justify-content: center;
    span + svg {
      margin-left: 2px;
    }
    svg + span {
      margin-left: 2px;
    }
  }
</style>
