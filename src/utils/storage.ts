import TodoItem from '@/typings/TodoItem';
export default {
  fetch(): TodoItem[] {
    return JSON.parse(localStorage.getItem('vue3-todo-list') || '[]');
  },
  save(todos: TodoItem[]) {
    localStorage.setItem('vue3-todo-list', JSON.stringify(todos));
  },
  has() {
    const res = localStorage.getItem('vue3-todo-list');
    if (res === null) {
      return false;
    }
    return true;
  },
};
