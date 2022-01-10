<template>
  <transition>
    <div class="m-editor">
      <div id="toolbar-container"></div>
      <div id="editor-container"></div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'MyEditor'
  }
</script>

<script setup>
  import '@wangeditor/editor/dist/css/style.css'
  import { createEditor, createToolbar } from '@wangeditor/editor'
  import { onMounted } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Array],
      default() {
        return []
      }
    }
  })

  const editorConfig = {}
  onMounted(() => {
    editorConfig.placeholder = '请输入内容'

    // 创建编辑器
    const editor = createEditor({
      selector: '#editor-container',
      config: editorConfig,
      content: props.modelValue,
      mode: 'simple'
    })
    const toolbar = createToolbar({
      editor,
      selector: '#toolbar-container',
      mode: 'simple'
    })
  })
  editorConfig.onChange = (editor) => {
    // 当编辑器选区、内容变化时，即触发
    console.log('content', editor.children)
    console.log('html', editor.getHtml())
  }
</script>

<style lang="scss" scoped>
  .m-editor {
    width: 100%;
    border: $border;
    border-radius: 4px;
    overflow: hidden;
    ::v-deep(#editor-container) {
      height: 600px;
      .w-e-text-container {
        background: #f2f3f5;
      }
    }
  }
</style>
