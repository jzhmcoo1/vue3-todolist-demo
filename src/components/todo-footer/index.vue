<template>
  <a-layout-footer :style="{ height: '4.375rem' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }"
    >
      <h4>
        当前 {{ todoInject.currentLength.value }} 项 / 总共
        {{ todoInject.realLength.value }} 项
      </h4>
      <a-button-group>
        <a-button
          :type="`${
            showType.all === todoInject.showState.value ? 'text' : 'link'
          }`"
          @click="handleClick(showType.all)"
          >显示全部</a-button
        >
        <a-button
          :type="`${
            showType.done === todoInject.showState.value ? 'text' : 'link'
          }`"
          @click="handleClick(showType.done)"
          >显示已完成</a-button
        >
        <a-button
          :type="`${
            showType.todo === todoInject.showState.value ? 'text' : 'link'
          }`"
          @click="handleClick(showType.todo)"
          >显示未完成</a-button
        >
        <a-button type="link" danger @click="handleDelete">清空已完成</a-button>
      </a-button-group>
    </div>
  </a-layout-footer>
</template>

<script lang="ts" setup>
import { useTodoInject } from '@/context';
import { showType } from '@/typings/TodoItem';
const todoInject = useTodoInject();

const handleClick = (msg: showType) => {
  todoInject.handleShowState(msg);
};
const handleDelete = () => {
  todoInject.deleteDone();
};
console.log(todoInject.showState.value);
</script>

<script lang="ts">
export default {
  name: 'Footer',
};
</script>
