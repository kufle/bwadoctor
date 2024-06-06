export const getChatTime = (date: Date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes}`;
};

export const getDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
