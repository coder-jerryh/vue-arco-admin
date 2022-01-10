<template>
  <a-upload
    v-model:file-list="state.value"
    list-type="picture-card"
    action="https://dev.sanduanlun.cn:8000/upload_file"
    @preview="preview"
  />
</template>

<script setup>
  import { reactive } from 'vue'
  defineProps({
    modelValue: {
      type: [String, Array],
      default: ''
    },
    disabled: Boolean
  })

  const state = reactive({
    value: []
  })

  const preview = () => {
    PreviewImage(state.value.map((item) => item.url))
  }
</script>

<style lang="scss" scoped>
  ::v-deep(.arco-upload-list-picture) {
    background: rgb(242, 243, 245);
  }
</style>
