const twoDigitsNumber = (number) => {
  return number.toString().padStart(2,'0');
}

export const formatDate = (date) => {
  if (!date) return;
  const year = date.getFullYear();
  const month = twoDigitsNumber(date.getMonth() + 1);
  const day = twoDigitsNumber(date.getDate());
  return `${year}-${month}-${day}`;
}