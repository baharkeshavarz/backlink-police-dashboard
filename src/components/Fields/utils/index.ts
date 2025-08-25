export const isAllNumbers = (input: string) => {
  if (!input) {
    return true;
  }

  const regex = /^[0-9\u06F0-\u06F9\u0660-\u0669]+$/;

  return regex.test(input);
};
