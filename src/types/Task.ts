export enum Status {
  Todo = "Todo",
  InProgress = "In Progress",
  Done = "Done",
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: Status;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
  status: Status;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: Status;
}
