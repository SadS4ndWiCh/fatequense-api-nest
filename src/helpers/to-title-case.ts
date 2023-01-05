export const toTitleCase = (text: string) => {
  return text.toLowerCase().replace(/\b\S/g, (char) => char.toUpperCase());
};
