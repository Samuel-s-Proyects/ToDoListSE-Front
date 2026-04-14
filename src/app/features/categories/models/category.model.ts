export interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  color: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  color?: string;
}
