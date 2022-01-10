<template>
  <m-modal v-model="visible" title="图片预览" click-mask-close @close="close">
    <a-carousel :default-current="current" animation-name="fade">
      <a-carousel-item v-for="url in list" :key="url">
        <img :src="url" />
        <a-spin />
      </a-carousel-item>
    </a-carousel>
  </m-modal>
</template>

<script setup>
  import { nextTick, ref } from 'vue'
  defineProps({
    list: {
      type: Array,
      default() {
        return []
      }
    },
    current: {
      type: Number,
      default: 1
    },
    close: {
      type: Function,
      default() {
        return {}
      }
    }
  })
  const visible = ref(false)
  nextTick(() => {
    visible.value = true
  })
</script>

<style lang="scss" scoped>
  .arco-carousel {
    border-radius: 4px;
    overflow: hidden;
    min-width: 600px;
    height: 60vh;
    > div > div {
      display: flex;
      justify-content: center;
      background: #f0f1f3;
      ::v-deep(img) {
        width: 100%;
        object-fit: scale-down;
        position: relative;
        z-index: 1;
      }
      ::v-deep(.arco-spin) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .arco-icon {
          width: 1.4em;
          height: 1.4em;
        }
      }
    }
    ::v-deep(.arco-carousel-arrow-right),
    ::v-deep(.arco-carousel-arrow-left) {
      background: rgba(0, 0, 0, 0.5);
      zoom: 1.2;
    }
    ::v-deep(.arco-carousel-indicator-wrapper-bottom) {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.3) 100%);
      .arco-carousel-indicator-dot .arco-carousel-indicator-item {
        width: 8px;
        height: 8px;
      }
    }
  }
</style>
