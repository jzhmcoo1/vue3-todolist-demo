import {
  computed,
  ComputedRef,
  inject,
  provide,
  reactive,
  Ref,
  WritableComputedRef,
  watchEffect,
} from 'vue';
import TodoItem, { showType } from '@/typings/TodoItem';
import storage from '@/utils/storage';
import dayjs from 'dayjs';

const initTodoList: () => TodoItem[] = () => {
  return [
    {
      id: '001',
      content: '吃饭',
      done: false,
      date: dayjs().toJSON(),
      hover: false,
    },
    {
      id: '002',
      content: '睡觉',
      done: false,
      date: dayjs().toJSON(),
      hover: false,
    },
    {
      id: '003',
      content: '打代码',
      done: false,
      date: dayjs().toJSON(),
      hover: false,
    },
  ];
};

interface TodoProvider {
  todoList: ComputedRef<Ref<TodoItem[]>>;
  addTodoItem: (todoItem: TodoItem) => void;
  deleteItemById: (id: string) => void;
  allDone: WritableComputedRef<boolean>;
  deleteDone: () => void;
  handleShowState: (msg: showType) => void;
  currentLength: ComputedRef<number>;
  realLength: ComputedRef<number>;
}

const TodoSymbol = Symbol('todo symbol');

export function useTodoProvide() {
  const todoState = reactive({
    todoList: storage.has() ? storage.fetch() : initTodoList(),
    showState: showType.all,
  });

  const addTodoItem = (todoItem: TodoItem) => {
    todoState.todoList.unshift(todoItem);
  };

  const deleteItemById = (id: string) => {
    const index = todoState.todoList.findIndex((item) => item.id === id);
    if (index !== -1) {
      todoState.todoList.splice(index, 1);
    }
  };

  const checkedAll = () => {
    todoState.todoList.forEach((item) => {
      item.done = true;
    });
  };

  const cancelAll = () => {
    todoState.todoList.forEach((item) => {
      item.done = false;
    });
  };

  const computedTodoList = computed(() => {
    if (todoState.showState === showType.all) {
      return todoState.todoList;
    } else if (todoState.showState === showType.done) {
      return todoState.todoList.filter((item) => item.done === true);
    } else {
      return todoState.todoList.filter((item) => item.done === false);
    }
  });

  const realLength = computed(() => todoState.todoList.length);
  const currentLength = computed(() => computedTodoList.value.length);

  const handleShowState = (msg: showType) => {
    todoState.showState = msg;
  };

  const allDone = computed<boolean>({
    get() {
      return (
        todoState.todoList.length !== 0 &&
        todoState.todoList.every((item) => item.done === true)
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
    todoState.todoList = todoState.todoList.filter((item) => !item.done);
  };

  watchEffect(() => {
    storage.save(todoState.todoList);
  });

  provide(TodoSymbol, {
    todoList: computedTodoList,
    addTodoItem,
    deleteItemById,
    allDone,
    deleteDone,
    handleShowState,
    realLength,
    currentLength,
  });
}

export function useTodoInject() {
  const todoContext = inject<TodoProvider>(TodoSymbol);
  if (!todoContext) {
    throw new Error('useTodoInject must be used after useTodoProvider');
  }
  return todoContext;
}
