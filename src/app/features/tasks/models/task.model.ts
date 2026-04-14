export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  categoryId: string | null;
  userId: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  categoryId: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  categoryId?: string | null;
  completed?: boolean;
  version: number;
}

export interface ToggleTaskPayload {
  version: number;
}

export interface ListTasksParams {
  limit?: number;
  cursor?: string;
  categoryId?: string;
  completed?: boolean;
  search?: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending';
