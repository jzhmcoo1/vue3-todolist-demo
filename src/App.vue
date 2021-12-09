<template>
  <a-layout>
    <Header />
    <todo-list class="layout" />
    <Footer />
  </a-layout>
</template>

<script lang="ts" setup>
import Header from '@/components/todo-header/index.vue';
import todoList from '@/components/todolist/index.vue';
import Footer from '@/components/todo-footer/index.vue';
import useProvide from './context';

useProvide(); // 使用全局Provide
</script>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style>
.layout {
  min-height: calc(100vh - 4rem - 4.375rem);
}
</style>
