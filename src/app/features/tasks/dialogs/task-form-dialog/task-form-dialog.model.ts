import { Task } from '../../models/task.model';
import { Category } from '../../../categories/models/category.model';

export interface TaskFormDialogData {
  task?: Task;
  categories: Category[];
  titleKey: string;
  titleLabelKey: string;
  titleRequiredKey: string;
  descriptionLabelKey: string;
  categoryLabelKey: string;
  noCategoryKey: string;
  confirmKey: string;
  cancelKey: string;
  statusLabelKey?: string;
  completedLabelKey?: string;
  pendingLabelKey?: string;
}

export interface TaskFormDialogResult {
  confirmed: boolean;
  title?: string;
  description?: string;
  categoryId?: string | null;
  completed?: boolean;
}
