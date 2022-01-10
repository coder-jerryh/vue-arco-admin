<template>
  <m-modal v-model="visible" :current="state.current" title="添加用户" width="50%" height="80vh" @close="close">
    <template #item1>
      <m-toolbar @change="getData">
        <a-button icon="icon-plus" class="rightAuto" @click="addData"> 添加 </a-button>
        <m-date-selecter v-model="pages.date" label="创建日期" />
        <m-selecter v-model="pages.type" label="审核状态" :options="state.options" />
        <m-searcher v-model="pages.name" label="姓名" />
        <template #more>
          <m-selecter v-model="pages.activityType" label="活动类型" :options="state.options" />
        </template>
      </m-toolbar>
      <a-table :columns="state.columns" :data="state.data" :loading="state.loading" :pagination="false" />
      <footer>
        <m-page v-model="pages" @change="getData" />
      </footer>
    </template>
    <template #item2>
      <vue-arco-form ref="arcoFormRef" v-model="arcoForm.form" :form-data="arcoForm.formData" />
      {{ arcoForm.form }}
      <footer>
        <a-button type="info" @click="cancelForm">取消</a-button>
        <a-button @click="arcoFormRef.resetFields()">重置</a-button>
        <a-button @click="submit">提交</a-button>
      </footer>
    </template>
  </m-modal>
</template>

<script setup>
  import { reactive, ref, toRefs } from 'vue'

  const hobbyOption = reactive({ 1: '打篮球', 2: '踢足球', 3: '打乒乓球' })
  const arcoForm = reactive({
    form: {
      name: 'Jerry',
      sex: 1
    },
    formData: {
      avatar: {
        type: 'upload',
        label: '头像'
      },
      name: {
        type: 'input',
        label: '用户名',
        span: 12,
        maxlength: 6
      },
      password: {
        type: 'password',
        label: '密码',
        span: 12
      },
      amount: {
        type: 'input',
        label: '工资',
        span: 12,
        maxlength: 6,
        append: '元/月'
      },
      birthday: {
        type: 'date-range',
        label: '出生日期',
        span: 12
      },
      age: {
        type: 'number',
        label: '年龄',
        span: 12
      },
      sex: {
        type: 'radio',
        label: '性别',
        options: { 1: '男', 2: '女' },
        span: 12
      },
      hobby: {
        type: 'checkbox',
        label: '爱好',
        options: hobbyOption,
        span: 12,
        show: (form) => form.sex === 1
      },
      email: {
        type: 'input',
        label: '邮箱',
        span: 12
      },
      education: {
        type: 'select',
        label: '学历',
        options: { 1: '本科', 2: '专科', 3: '高中' },
        multiple: true,
        span: 12
      },
      isOk: {
        type: 'switch',
        label: '是否毕业',
        span: 12
      },
      intro: {
        type: 'textarea',
        label: '自我介绍',
        maxlength: 666
      }
    }
  })
  const visible = ref(false)
  const state = reactive({
    pages: {},
    form: {
      name: '李四',
      email: ' jerry_h@qq.com'
    },
    current: 1,
    options: {
      1: '待审核',
      2: '已通过',
      3: '已拒绝'
    },
    options2: {
      1: '顺序',
      2: '倒序'
    },
    columns: [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Salary',
        dataIndex: 'salary'
      },
      {
        title: 'Address',
        dataIndex: 'address'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      }
    ],
    data: [],
    loading: true
  })
  const { pages } = toRefs(state)
  const open = () => {
    state.pages = {
      page: 1,
      pageSize: 10,
      total: 0,
      listType: 1
    }
    visible.value = true
    getData()
  }
  const getData = () => {
    state.loading = true
    setTimeout(() => {
      state.data = [
        {
          key: '1',
          name: 'Jane Doe',
          salary: 23000,
          address: '32 Park Road, London',
          email: 'jane.doe@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com'
        }
      ]
      state.loading = false
      state.pages.total = 50
    }, 1000)
  }

  const addData = () => {
    state.current = 2
  }
  const arcoFormRef = ref(null)
  const submit = () => {
    // hobbyOption[4] = '王者荣耀'
    arcoFormRef.value.validate(() => {
      console.log('验证通过！')
    })
  }
  const cancelForm = () => {
    state.current = 1
    arcoFormRef.value.resetFields()
  }
  const close = () => {
    state.current = 1
    state.data = []
  }

  // 将方法、变量暴露给父组件使用，父组见才可通过ref API拿到子组件暴露的数据
  defineExpose({
    open
  })
</script>

<style lang="scss" scoped></style>
