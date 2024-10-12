export interface Task {
  task: any;
  id: string | string[]
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  dueDate: string;
}
