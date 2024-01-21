export const truncateString = (
  str: string,
  max_length: number
) => str.length > max_length ? str.slice(0, max_length) + '...' : str;
