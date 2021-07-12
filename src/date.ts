export function isInvalidDate(input: string | number | Date) {
  return Number.isNaN(new Date(input).getTime());
}
