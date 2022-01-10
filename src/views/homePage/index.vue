<template>
  <m-toolbar @change="getData">
    <a-button icon="icon-plus" class="rightAuto" @click="addData">添加</a-button>
    <m-radio v-model="pages.listType" label="排序方式" :options="state.options2" />
    <m-date-selecter v-model:start="pages.startTime" v-model:end="pages.endTime" type="range" label="创建日期" />
    <m-selecter v-model="pages.type" label="审核状态" :options="state.options" />
    <m-searcher v-model="pages.name" label="姓名" />
    <template #more>
      <m-selecter v-model="pages.activityType" label="活动类型" :options="state.options" />
    </template>
  </m-toolbar>
  <a-table :columns="state.columns" :data="state.data" :loading="state.loading" :pagination="false" />
  <m-page v-model="pages" @change="getData" />
  <form-popup ref="formRef" />
</template>

<script setup>
  import formPopup from './form.vue'
  import { onMounted, reactive, ref } from 'vue'

  const pages = reactive({
    page: 1,
    pageSize: 10,
    total: 0,
    listType: 1,
    name: '李四',
    startTime: '2021-02-18',
    endTime: '2021-10-18'
  })
  const formRef = ref(null)
  const state = reactive({
    visible: false,
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

  onMounted(() => {
    getData()
  })

  const getData = () => {
    console.log(pages)
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
          key: '3',
          name: 'Kevin Sandra',
          salary: 22000,
          address: '31 Park Road, London',
          email: 'kevin.sandra@example.com'
        },
        {
          key: '4',
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com'
        }
      ]
      state.loading = false
      pages.total = 50
    }, 1000)
  }

  const addData = () => {
    formRef.value.open()
  }
</script>

<style lang="scss" scoped></style>
