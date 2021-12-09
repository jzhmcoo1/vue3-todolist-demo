<template>
  <a-layout-header class="header">
    <h1 style="color: white">{{ headerRef }}</h1>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const headerRef = ref('Todo List Vue3 Demo');
</script>

<script lang="ts">
export default {
  name: 'Header',
};
</script>

<style scoped></style>
