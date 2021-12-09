import {
  computed,
  ComputedRef,
  inject,
  provide,
  Ref,
  ref,
  WritableComputedRef,
} from 'vue';
import TodoItem, { showType } from '@/typings/TodoItem';
import dayjs from 'dayjs';

const initTodoList: () => TodoItem[] = () => {
  return [
    { id: '001', content: '吃饭', done: false, date: dayjs(), hover: false },
    { id: '002', content: '睡觉', done: false, date: dayjs(), hover: false },
    { id: '003', content: '打代码', done: false, date: dayjs(), hover: false },
  ];
};

interface TodoProvider {
  todoList: ComputedRef<Ref<TodoItem[]>>;
  addTodoItem: (todoItem: TodoItem) => void;
  deleteItemById: (id: string) => void;
  allDone: WritableComputedRef<boolean>;
  deleteDone: () => void;
  handleShowState: (msg: showType) => void;
}

const TodoSymbol = Symbol('todo symbol');

export function useTodoProvide() {
  const todoList = ref<TodoItem[]>(initTodoList());
  const showState = ref<showType>(showType.all);

  const addTodoItem = (todoItem: TodoItem) => {
    todoList.value.unshift(todoItem);
  };

  const deleteItemById = (id: string) => {
    const index = todoList.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      todoList.value.splice(index, 1);
    }
  };

  const checkedAll = () => {
    todoList.value.forEach((item) => {
      item.done = true;
    });
  };

  const cancelAll = () => {
    todoList.value.forEach((item) => {
      item.done = false;
    });
  };

  const computedTodoList = computed(() => {
    if (showState.value === showType.all) {
      return todoList;
    } else if (showState.value === showType.done) {
      return todoList.value.filter((item) => item.done);
    } else {
      return todoList.value.filter((item) => !item.done);
    }
  });

  const handleShowState = (msg: showType) => {
    showState.value = msg;
    console.log(showState);
  };

  const allDone = computed<boolean>({
    get() {
      return (
        todoList.value.length !== 0 &&
        todoList.value.every((item) => item.done === true)
      );
    },
    set(newValue) {
      if (newValue) {
        checkedAll();
      } else {
        cancelAll();
      }
    },
  });

  const deleteDone = () => {
    todoList.value = todoList.value.filter((item) => !item.done);
  };

  provide(TodoSymbol, {
    todoList: computedTodoList,
    addTodoItem,
    deleteItemById,
    allDone,
    deleteDone,
    handleShowState,
  });
}

export function useTodoInject() {
  const todoContext = inject<TodoProvider>(TodoSymbol);
  if (!todoContext) {
    throw new Error('useTodoInject must be used after useTodoProvider');
  }
  return todoContext;
}
