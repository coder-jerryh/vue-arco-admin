<template>
  <div class="m-page">
    <a-pagination
      :total="modelValue.total"
      show-total
      show-jumper
      show-page-size
      size="small"
      @change="pageChange"
      @page-size-change="pageSizeChange"
    />
    <a-back-top v-if="modelValue.total > 20" target-container=".arco-layout-content" :visible-height="0" />
  </div>
</template>

<script setup>
  import { watch } from 'vue'

  const emits = defineEmits(['update:modelValue', 'change'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {
        return {}
      }
    }
  })

  const pageChange = (page) => {
    emits('update:modelValue', { ...props.modelValue, page })
    emits('change')
  }

  const pageSizeChange = (pageSize) => {
    emits('update:modelValue', { ...props.modelValue, pageSize })
    emits('change')
  }

  // 第n页若无数据，则页码n-1，并再调一次接口
  watch(
    () => props.modelValue,
    () => {
      const pages = props.modelValue
      const maxPage = Math.ceil(pages.totalNum / pages.size)
      if (pages.page > 1 && pages.page > maxPage) {
        emits('update:modelValue', { ...pages, page: pages.page - 1 })
        emits('change')
      }
    }
  )
</script>

<style lang="scss" scoped>
  .m-page {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    position: sticky;
    bottom: 0;
    background: #fff;
    .arco-pagination {
      display: flex;
      align-items: center;
      ::v-deep(.arco-pagination-total) {
        height: auto;
      }
    }
    .arco-back-top {
      position: static;
      ::v-deep(.arco-back-top-btn) {
        width: 28px;
        height: 28px;
        border-radius: 2px;
        margin-left: 8px;
        color: rgb(var(--primary-6));
        background: var(--color-primary-light-1);
      }
    }
  }
</style>
