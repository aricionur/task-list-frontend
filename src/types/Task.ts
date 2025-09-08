export enum Status {
  Todo = "Todo",
  InProgress = "In Progress",
  Done = "Done",
}

export interface Task {
  id: number;
  title: string;
  status: Status;
  description?: string;
  dueDate?: Date;
}

export type CreateTask = Omit<Task, "id">;

export type UpdateTask = Partial<Task>;
