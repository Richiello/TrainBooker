export const formatDate = (date: Date) => date && date.toISOString().split('T')[0];

export const validateDate = (date: string | null) => {
  if (date) {
    const regex = /^\d{4}\-\d{2}\-\d{2}$/;
    return date.match(regex);
  }
  return false;
};