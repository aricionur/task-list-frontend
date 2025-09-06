export enum Status {
  Todo = "Todo",
  InProgress = "In Progress",
  Done = "Done",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
}

export type CreateTask = Omit<Task, "id">;

export type UpdateTask = Partial<CreateTask>;
