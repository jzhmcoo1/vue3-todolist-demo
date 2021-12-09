import { useTodoProvide, useTodoInject } from './useTodo';

export { useTodoInject };

export default function useProvide() {
  useTodoProvide();
}
