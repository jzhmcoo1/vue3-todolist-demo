<template>
  <a-card>
    <template #title>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }"
      >
        <a-input-search
          type="text"
          placeholder="What do you want to do?"
          size="large"
          v-model:value="todo.content"
          allowClear
          @pressEnter="handleAddTodoItem"
          @search="handleAddTodoItem"
        >
          <template #prefix>
            <div style="margin-right: 0.25rem">
              <a-checkbox v-model:checked="todoInject.allDone.value" />
            </div>
          </template>
          <template #enterButton>
            <a-button type="primary">添加</a-button>
          </template>
        </a-input-search>
      </div>
    </template>
    <a-list item-layout="horizontal" :data-source="todoInject.todoList.value">
      <template #renderItem="{ item }">
        <a-list-item
          :key="item.id"
          @mouseover="item.hover = true"
          @mouseleave="item.hover = false"
        >
          <a-list-item-meta :description="format(item)">
            <template #title>
              <p :style="{ fontSize: '1rem' }">{{ item.content }}</p>
            </template>
            <template #avatar>
              <a-checkbox v-model:checked="item.done" />
            </template>
          </a-list-item-meta>
          <template #actions>
            <transition name="slide-fade">
              <a-button
                @click="deleteItem(item)"
                type="link"
                danger
                v-show="item.hover"
                >删除</a-button
              >
            </transition>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { nanoid } from 'nanoid';
import { useTodoInject } from '@/context';
import TodoItem from '@/typings/TodoItem';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message } from 'ant-design-vue';
dayjs.extend(relativeTime);

const todoInject = useTodoInject();
const todo = reactive({
  content: '',
});

const format = (item: TodoItem) => {
  return item.date.fromNow();
};

const deleteItem = (item: TodoItem) => {
  todoInject.deleteItemById(item.id);
};

const handleAddTodoItem = (content: string) => {
  if (content.length === 0) {
    message.warn('输入内容不能为空');
    return;
  }
  const _todo: TodoItem = {
    id: nanoid(),
    content,
    done: false,
    date: dayjs(),
    hover: false,
  };
  todoInject.addTodoItem(_todo);
  todo.content = '';
};

console.log(todoInject.allDone);
</script>

<script lang="ts">
export default {
  name: 'todolist',
};
</script>

<style>
.ant-list-item-meta {
  align-items: center;
}

.ant-list-item {
  transition: all 0.25s ease;
}

.slide-fade-enter-active {
  transition: all 0.25s ease;
}
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>
