import dayjs from 'dayjs';
export default interface TodoItem {
  id: string;
  content: string;
  done: boolean;
  date: string;
  hover: false;
}

export enum showType {
  done,
  todo,
  all,
}
