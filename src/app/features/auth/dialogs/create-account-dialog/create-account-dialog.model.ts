export interface CreateAccountDialogData {
  email: string;
  titleKey: string;
  messageKey: string;
  nameLabelKey: string;
  namePlaceholderKey: string;
  nameRequiredKey: string;
  confirmKey: string;
  cancelKey: string;
}

export interface CreateAccountDialogResult {
  confirmed: boolean;
  name?: string;
}
