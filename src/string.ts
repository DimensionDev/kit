export function format(input: string, values: Record<string, string>) {
  return input.replace(/\$\{([^}]+)\}/g, (match, p1) => values[p1] ?? match);
}
