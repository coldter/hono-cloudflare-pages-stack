/**
 * @description Capitalize the first letter of a string
 * @param string
 * @returns {string}
 */
export const capitalizeString = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};
