import { Category } from '../../models/category.model';

export interface CategoryFormDialogData {
  category?: Category;
  titleKey: string;
  nameLabelKey: string;
  nameRequiredKey: string;
  colorLabelKey: string;
  confirmKey: string;
  cancelKey: string;
}

export interface CategoryFormDialogResult {
  confirmed: boolean;
  name?: string;
  color?: string;
}
