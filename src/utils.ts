export const truncateString = (
  str: string,
  maxLength: number
) => str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
