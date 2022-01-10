<template>
  <div class="demo">
    <!-- {{ arcoForm.form }} -->
    <vue-arco-form ref="arcoFormRef" v-model="arcoForm.form" :form-data="arcoForm.formData" />
    <footer>
      <a-button type="info" @click="arcoFormRef.resetFields()">重置</a-button>
      <a-button @click="submit">提交</a-button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'NoCache'
  }
</script>

<script setup>
  import { reactive, ref } from 'vue'
  const hobbyOption = reactive({ 1: '打篮球', 2: '踢足球', 3: '打乒乓球' })
  const arcoForm = reactive({
    form: {
      name: 'Jerry',
      sex: 1,
      article: []
    },
    formData: {
      avatar: {
        type: 'upload',
        label: '头像'
      },
      name: {
        type: 'input',
        label: '用户名',
        span: 8,
        maxlength: 6
      },
      password: {
        type: 'password',
        label: '密码',
        span: 8
      },
      amount: {
        type: 'number',
        label: '工资',
        span: 8,
        maxlength: 6,
        append: '元/月'
      },
      birthday: {
        type: 'date-range',
        label: '出生日期',
        span: 8
      },
      age: {
        type: 'number',
        label: '年龄',
        span: 8
      },
      sex: {
        type: 'radio',
        label: '性别',
        options: { 1: '男', 2: '女' },
        span: 8
      },
      hobby: {
        type: 'checkbox',
        label: '爱好',
        options: hobbyOption,
        span: 8,
        show: (form) => form.sex === 1
      },
      email: {
        type: 'input',
        label: '邮箱',
        span: 8
      },
      education: {
        type: 'select',
        label: '学历',
        options: { 1: '本科', 2: '专科', 3: '高中' },
        multiple: true,
        span: 8
      },
      isOk: {
        type: 'switch',
        label: '是否毕业',
        span: 8
      },
      intro: {
        type: 'textarea',
        label: '自我介绍',
        maxlength: 666,
        span: 16
      }
      // article: {
      //   type: 'editor',
      //   label: '文章',
      //   maxlength: 666
      // }
    }
  })
  setTimeout(() => {
    arcoForm.form.article = [
      {
        type: 'header1',
        children: [{ text: '标题A' }]
      },
      // 一行文字
      {
        type: 'paragraph',
        children: [{ text: 'hello world ~~~ ' }]
      }
    ]
  }, 2000)
  const arcoFormRef = ref(null)
  const submit = () => {
    // hobbyOption[4] = '王者荣耀'
    arcoFormRef.value.validate(() => {
      console.log('验证通过！')
    })
  }
</script>

<style lang="scss" scoped>
  .demo {
    position: relative;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    height: 100%;
    .arco-form {
      overflow: auto;
    }
    footer {
      height: 60px;
      position: absolute;
      bottom: 0;
      left: -10px;
      right: -10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: $border;
      .arco-btn {
        margin: 0 5px;
      }
    }
  }
</style>
