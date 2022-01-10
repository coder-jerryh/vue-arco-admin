<template>
  <div v-if="modelValue" class="m-modal">
    <transition name="fade-mask" @click="clickMask">
      <div v-if="visible" class="m-modal-mask"> </div>
    </transition>
    <transition name="zoom">
      <div v-if="visible" class="m-modal-content">
        <!-- 头部 -->
        <header>
          <h1>{{ title }}</h1>
          <icon-close @click="close" />
        </header>
        <!-- 内容 -->
        <main>
          <!-- 动态插槽 -->
          <transition v-for="i in itemSlotCount" :key="i" name="slide">
            <div v-show="!current || current === i" :class="`m-modal-item-${i}`">
              <slot :name="!current ? 'default' : `item${i}`" />
              <!-- 占位高度 -->
              <i class="placeholder"></i>
            </div>
          </transition>
        </main>
      </div>
    </transition>
  </div>
</template>

<script setup>
  const emits = defineEmits(['update:modelValue', 'close'])
  import { nextTick, watch, ref, useSlots } from 'vue'
  const props = defineProps({
    // 值
    modelValue: {
      type: Boolean,
      default: false
    },
    // 多面板下标
    current: {
      type: Number,
      default: 0
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 宽度
    width: {
      type: String,
      default: 'auto'
    },
    // 高度
    height: {
      type: String,
      default: '100%'
    },
    // 点击蒙版关闭弹窗
    clickMaskClose: {
      type: Boolean,
      default: false
    }
  })

  // 显隐
  const visible = ref(false)
  const slots = useSlots()
  // 插槽数量
  const itemSlotCount = ref(1)
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        const slotList = Object.values({ ...slots })
        itemSlotCount.value = slotList.length
        nextTick(() => {
          visible.value = props.modelValue
        })
      }
    }
  )
  // 关闭
  const close = () => {
    visible.value = false
    emits('close')
    const timer = setTimeout(() => {
      emits('update:modelValue', false)
      clearTimeout(timer)
    }, 300)
  }

  // 点击蒙版
  const clickMask = () => {
    props.clickMaskClose && close()
  }
</script>

<style lang="scss" scoped>
  // 弹窗样式
  .m-modal {
    .m-modal-mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      width: 100%;
      height: 100%;
      background-color: var(--color-mask-bg);
    }
    .m-modal-content {
      width: v-bind('width');
      transition: all ease 0.25s;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      z-index: 52;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      background-color: var(--color-bg-3);
      border-radius: var(--border-radius-medium);
      header {
        border-bottom: 1px solid var(--color-neutral-3);
        padding: 10px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
          color: #292929;
          margin: 0;
          font-size: 16px;
        }
        svg {
          width: 2em;
          height: 2em;
          cursor: pointer;
          color: #6e6e6e;
          border-radius: 4px;
          padding: 4px;
          transition: all ease 0.2s;
          &:hover {
            color: rgb(var(--danger-6));
            background: var(--color-danger-light-1);
          }
          &:active {
            background: var(--color-danger-light-2);
          }
        }
      }
      main {
        max-height: 80vh;
        overflow: auto;
        padding: 12px;
        height: v-bind(height);
        > div {
          ::v-deep(.arco-form) {
            padding: 5px 10px;
          }
        }
        .placeholder {
          display: none;
        }
        ::v-deep(footer) {
          background: #fff;
          border-radius: 0 0 var(--border-radius-medium) var(--border-radius-medium);
          padding: 0 12px;
          height: 55px;
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid var(--color-neutral-3);
          bottom: 0;
          transition: opacity 0.2s;
          > * + * {
            margin-left: 10px;
          }
          .m-page {
            margin-left: auto;
            padding: 0;
            position: static;
            .arco-back-top {
              display: none;
            }
          }
          & + .placeholder {
            display: inline-block;
            width: 100%;
            height: 54px;
          }
        }
        // 动画中
        .slide-enter-active {
          ::v-deep(footer) {
            opacity: 0;
          }
        }
      }
    }
  }
</style>
