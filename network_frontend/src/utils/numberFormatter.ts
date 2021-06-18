
/**
 * Formats the number to format like 1k (1000)
 * @param num Number that sould be formated
 * @returns a Number or formated String
 */
export const numberFormatter = (num: number) => {
  return Math.abs(num) > 999 ? Math.sign(num)*Number(((Math.abs(num)/1000).toFixed(1))) + 'k' : Math.sign(num)*Math.abs(num)
}